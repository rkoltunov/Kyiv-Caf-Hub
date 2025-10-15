import { NavLink } from "react-router-dom";
import { useState } from "react";

type NavItemProps = {
  to: string;
  icon: string;
  activeIcon: string;
  hoverIcon: string;
  alt: string;
  noScale?: boolean; // 🔹 возможность отключить hover-анимацию
};

export const NavItem = ({
  to,
  icon,
  activeIcon,
  hoverIcon,
  alt,
  noScale = false,
}: NavItemProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={({ isActive }) =>
        [
          "block transition-all duration-150 ease-out", 
          !noScale && "hover:scale-105", // 🔹 масштаб при наведении
          isActive && "opacity-100",
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      {({ isActive }) => (
        <img
          src={isActive ? activeIcon : isHover ? hoverIcon : icon}
          alt={alt}
          className="h-8 md:h-10 select-none pointer-events-none"
          draggable={false}
        />
      )}
    </NavLink>
  );
};