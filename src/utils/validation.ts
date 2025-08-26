/**
 * Validation utility functions
 */

export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

export const validateRequired = (value: string | number | boolean): boolean => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value);
  return value !== null && value !== undefined;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export const validatePattern = (value: string, pattern: string): boolean => {
  const regex = new RegExp(pattern);
  return regex.test(value);
};

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'url' | 'password' | 'minLength' | 'maxLength' | 'range' | 'pattern';
  value?: any;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateField = (value: any, rules: ValidationRule[]): ValidationResult => {
  const errors: string[] = [];

  for (const rule of rules) {
    let isValid = true;

    switch (rule.type) {
      case 'required':
        isValid = validateRequired(value);
        break;
      case 'email':
        isValid = isEmail(value);
        break;
      case 'phone':
        isValid = isPhoneNumber(value);
        break;
      case 'url':
        isValid = isUrl(value);
        break;
      case 'password':
        isValid = isStrongPassword(value);
        break;
      case 'minLength':
        isValid = validateMinLength(value, rule.value);
        break;
      case 'maxLength':
        isValid = validateMaxLength(value, rule.value);
        break;
      case 'range':
        isValid = validateRange(value, rule.value.min, rule.value.max);
        break;
      case 'pattern':
        isValid = validatePattern(value, rule.value);
        break;
    }

    if (!isValid) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};