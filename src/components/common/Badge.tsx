import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'info', className }) => {
  const variants = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
