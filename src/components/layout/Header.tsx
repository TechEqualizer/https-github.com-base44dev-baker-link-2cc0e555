import React from 'react';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface HeaderProps {
  title?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  onMenuClick?: () => void;
  showMenu?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Application',
  user,
  onMenuClick,
  showMenu = false,
  className,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {onMenuClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="p-2 lg:hidden"
              >
                {showMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}
            
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-neutral-900">
                {title}
              </h1>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium">
                    {user.name}
                  </span>
                </Button>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </button>
                    <hr className="my-1 border-neutral-200" />
                    <button className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50">
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};