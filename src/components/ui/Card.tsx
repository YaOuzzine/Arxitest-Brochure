'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
  hover?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, glow = false, children, ...props }, ref) => {
    const baseClasses = 'rounded-xl border border-border transition-all duration-300';
    
    const variants = {
      default: 'bg-slate-800/40 backdrop-blur-md shadow-lg border-slate-700/30 hover:bg-slate-800/60 hover:border-slate-600/40',
      elevated: 'bg-slate-800/60 backdrop-blur-lg shadow-xl hover:shadow-2xl border-slate-700/40 hover:bg-slate-700/70 hover:border-slate-600/50',
      glass: 'bg-slate-900/30 backdrop-blur-xl border-slate-700/25 shadow-2xl hover:bg-slate-800/40 hover:border-slate-600/35',
      gradient: 'animated-gradient'
    };

    const hoverEffects = hover ? 'hover:-translate-y-1 hover:shadow-2xl' : '';
    const glowEffect = glow ? 'pulse-glow' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          hoverEffects,
          glowEffect,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-foreground-muted', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };