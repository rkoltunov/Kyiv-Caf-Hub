import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

type ButtonNavProps = {
  to: string;
  label: string;
  className?: string;
};

export const ButtonNav: FC<ButtonNavProps> = ({ to, label, className = "" }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        inline-flex items-center justify-center
        px-5 py-2 rounded-[24px]
        border border-[#21262B]
        bg-[#F7F7F7]
        font-heading font-bold text-[16px] uppercase tracking-wide
        text-[#21262B]
        transition-all duration-200 ease-in-out
        ${isActive ? "shadow-none bg-white" : "shadow-[-3px_3px_0_#21262B]"}
        hover:shadow-[-1.5px_1.5px_0_#21262B]
        hover:bg-white
        ${className}
      `}
    >
      {label}
    </Link>
  );
};