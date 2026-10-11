import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'orange' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono-tech tracking-[0.14em] uppercase rounded-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4800] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f5f1] disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98] font-medium';

  const sizeStyles = {
    sm: 'text-[11px] px-3.5 py-1.5 gap-2',
    md: 'text-xs px-5 py-2.5 gap-2.5',
    lg: 'text-xs sm:text-sm px-7 py-3.5 gap-3',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#111215] text-[#faf9f6] hover:bg-[#ff4800] hover:text-white border border-[#111215] hover:border-[#ff4800] shadow-sm',
    orange:
      'bg-[#ff4800] text-white hover:bg-[#e03f00] border border-[#ff4800] shadow-[0_3px_12px_rgba(255,72,0,0.2)]',
    outline:
      'bg-[#faf9f6] text-[#111215] border border-[#d5d0c5] hover:border-[#ff4800] hover:text-[#ff4800] hover:bg-white',
    ghost:
      'bg-transparent text-[#4b4f57] hover:text-[#111215] hover:bg-[#ebe8df] border border-transparent',
  }[variant];

  return (
    <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>
      )}
    </button>
  );
};
