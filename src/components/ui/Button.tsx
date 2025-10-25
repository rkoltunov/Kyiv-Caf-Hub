import type { FC } from "react";

type ButtonIconProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export const ButtonIcon: FC<ButtonIconProps> = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        px-[20px] py-3 rounded-[24px]
        border border-[#21262B]
        bg-[#F7F7F7]
        shadow-[-3px_3px_0_#21262B]
        font-heading font-medium text-[16px]
        text-[#21262B]
        transition-all duration-200 ease-in-out
        hover:shadow-none
        ${className}
      `}
    >
      {label}
    </button>
  );
};