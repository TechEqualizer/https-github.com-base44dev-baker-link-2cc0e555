import React from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  items?: SidebarItem[];
  className?: string;
}

const defaultItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    href: '/',
    active: true,
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users className="h-5 w-5" />,
    href: '/users',
    badge: '12',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/analytics',
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText className="h-5 w-5" />,
    href: '/documents',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <Mail className="h-5 w-5" />,
    href: '/messages',
    badge: '3',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: <Calendar className="h-5 w-5" />,
    href: '/calendar',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/settings',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onToggle,
  items = defaultItems,
  className,
}) => {
  return (
    <aside className={cn(
      'flex flex-col bg-white border-r border-neutral-200 transition-all duration-300',
      isOpen ? 'w-64' : 'w-16',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        {isOpen && (
          <h2 className="text-lg font-semibold text-neutral-900">
            Navigation
          </h2>
        )}
        
        {onToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none',
              item.active
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-700',
              !isOpen && 'justify-center'
            )}
          >
            <span className="flex-shrink-0">
              {item.icon}
            </span>
            
            {isOpen && (
              <>
                <span className="ml-3 flex-1">
                  {item.label}
                </span>
                
                {item.badge && (
                  <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <div className={cn(
          'flex items-center text-xs text-neutral-500',
          !isOpen && 'justify-center'
        )}>
          {isOpen ? (
            <span>© 2025 Your App</span>
          ) : (
            <span>©</span>
          )}
        </div>
      </div>
    </aside>
  );
};