import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padded?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  onClick,
  padded = true 
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl card-shadow overflow-hidden transition-all duration-300',
        onClick && 'cursor-pointer active:scale-[0.98]',
        padded && 'p-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
