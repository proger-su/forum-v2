import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'default';
  children: React.ReactNode;
}

const variants = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800',
};

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}