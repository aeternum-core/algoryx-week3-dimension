import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'olive' | 'graphite' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'orange',
  size = 'sm',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    orange: 'bg-[#ff4800]/10 border-[#ff4800]/30 text-[#d43c00]',
    olive: 'bg-[#4e6150]/10 border-[#4e6150]/30 text-[#3b4d3e]',
    graphite: 'bg-[#111215] border-[#111215] text-[#f6f5f1]',
    outline: 'bg-white/60 border-[#d5d0c5] text-[#383b42]',
  }[variant];

  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5 tracking-[0.18em]',
    md: 'text-xs px-3 py-1 tracking-[0.16em]',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 uppercase font-mono-tech border rounded-sm font-medium ${variantStyles} ${sizeStyles} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'orange'
              ? 'bg-[#ff4800] animate-pulse'
              : variant === 'olive'
              ? 'bg-[#4e6150]'
              : 'bg-[#ff4800]'
          }`}
        />
      )}
      {children}
    </span>
  );
};
