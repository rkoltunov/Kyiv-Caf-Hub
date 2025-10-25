import type { FC } from "react";

type TagProps = {
  label: string;
  onClick?: () => void;
};

export const Tag: FC<TagProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-[6px] rounded-[8px]
      border border-[#21262B]
      bg-[#F7F7F7]
      shadow-[2px_2px_0_#21262B]
      text-[#21262B]
      transition-all
      hover:shadow-none
      active:translate-x-[1px] active:translate-y-[1px]
    "
  >
    {label}
  </button>
);