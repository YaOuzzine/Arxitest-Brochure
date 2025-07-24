'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    icon,
    iconPosition = 'left',
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-primary/30 hover:border-primary/50',
      secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-secondary/30 hover:border-secondary/50',
      outline: 'border-2 border-primary/70 text-primary hover:bg-primary/30 hover:border-primary hover:text-white backdrop-blur-sm bg-slate-800/20',
      ghost: 'text-foreground hover:bg-slate-700/30 backdrop-blur-sm border border-transparent hover:border-slate-600/30',
      gradient: 'animated-gradient text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 pulse-glow backdrop-blur-sm border border-transparent'
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm gap-2',
      md: 'h-10 px-4 text-base gap-2',
      lg: 'h-12 px-6 text-lg gap-3',
      xl: 'h-14 px-8 text-xl gap-3'
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          isLoading && 'cursor-not-allowed',
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };