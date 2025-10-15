import type { FC, ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};

export const Button: FC<Props> = ({ variant = 'primary', children, ...props }) => {
  const baseClass = "px-4 py-2 rounded transition-colors duration-300";
  const variants: Record<'primary'|'secondary', string> = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
    secondary: "bg-gray-400 text-gray-800 hover:bg-gray-500 active:bg-gray-600",
  };

  return (
    <button className={`${baseClass} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};