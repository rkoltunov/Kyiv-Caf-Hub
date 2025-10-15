import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/Button";
import { NavItem } from "../ui/NavItem";

import HomeIcon from "../../assets/home/nav/homedefault.svg";
import HomeActiveIcon from "../../assets/home/nav/homea.svg";
import HomeHoverIcon from "../../assets/home/nav/homehover.svg";

import CatalogIcon from "../../assets/home/nav/catalogdefault.svg";
import CatalogActiveIcon from "../../assets/home/nav/cataloga.svg";
import CatalogHoverIcon from "../../assets/home/nav/catalogHover.svg";

import BlogIcon from "../../assets/home/nav/blogdefault.svg";
import BlogActiveIcon from "../../assets/home/nav/bloga.svg";
import BlogHoverIcon from "../../assets/home/nav/blogHover.svg";

import AboutIcon from "../../assets/home/nav/aboutdefault.svg";
import AboutActiveIcon from "../../assets/home/nav/abouta.svg";
import AboutHoverIcon from "../../assets/home/nav/aboutHover.svg";

export const Header = () => {
  const [isAdmin] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("ENG");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#C6B0E7]"
      style={{ borderRadius: "0 0 30px 30px" }}
    >
      <div className="flex items-center justify-between h-[88px] md:h-[88px] px-10">
        {/* ── Logo ── */}
        <NavLink to="/" className="flex items-center h-full">
          <img
            src="/logo/Logo.svg"
            alt="Kyiv Café Hub Logo"
            className="h-10"
            style={{ mixBlendMode: "multiply" }}
          />
        </NavLink>

        {/* ── Desktop navigation ── */}
        <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
          <NavItem
            to="/"
            icon={HomeIcon}
            activeIcon={HomeActiveIcon}
            hoverIcon={HomeHoverIcon}
            alt="Home"
            noScale
          />
          <NavItem
            to="/catalog"
            icon={CatalogIcon}
            activeIcon={CatalogActiveIcon}
            hoverIcon={CatalogHoverIcon}
            alt="Catalog"
            noScale
          />
          <NavItem
            to="/blog"
            icon={BlogIcon}
            activeIcon={BlogActiveIcon}
            hoverIcon={BlogHoverIcon}
            alt="Blog"
            noScale
          />
          <NavItem
            to="/about"
            icon={AboutIcon}
            activeIcon={AboutActiveIcon}
            hoverIcon={AboutHoverIcon}
            alt="About"
            noScale
          />
        </nav>

        {/* ── Right side ── */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Admin button */}
          {isAdmin && (
            <NavLink to="/admin">
              <Button variant="secondary" className="text-sm md:text-base px-2 md:px-4">
                Admin
              </Button>
            </NavLink>
          )}

          {/* Language toggle */}
          <div className="hidden sm:flex gap-1 items-center text-sm font-bold text-black/80">
            <button
              className={`${
                currentLanguage === "ENG"
                  ? "underline decoration-2 underline-offset-4"
                  : "hover:text-[#4a2b6b]"
              } transition`}
              onClick={() => setCurrentLanguage("ENG")}
            >
              ENG
            </button>
            <span>/</span>
            <button
              className={`${
                currentLanguage === "UA"
                  ? "underline decoration-2 underline-offset-4"
                  : "hover:text-[#4a2b6b]"
              } transition`}
              onClick={() => setCurrentLanguage("UA")}
            >
              UA
            </button>
          </div>

          {/* ── Burger menu ── */}
          <button
            className="flex md:hidden flex-col justify-center items-center w-8 h-8 rounded-md hover:bg-white/20 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`w-5 h-[2px] bg-black rounded transition-all ${
                isMenuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-black rounded my-[3px] transition-all ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-black rounded transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center divide-y divide-black/60 py-4 bg-[#C6B0E7] rounded-b-[30px] shadow-md">
          <NavLink to="/" className="w-full text-center py-3" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/catalog" className="w-full text-center py-3" onClick={() => setIsMenuOpen(false)}>
            Catalog
          </NavLink>
          <NavLink to="/blog" className="w-full text-center py-3" onClick={() => setIsMenuOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/about" className="w-full text-center py-3" onClick={() => setIsMenuOpen(false)}>
            About
          </NavLink>

          <div className="w-full text-center py-3 text-sm font-bold flex justify-center gap-2">
            <button
              className={`${currentLanguage === "ENG" ? "underline" : ""}`}
              onClick={() => setCurrentLanguage("ENG")}
            >
              ENG
            </button>
            <span>/</span>
            <button
              className={`${currentLanguage === "UA" ? "underline" : ""}`}
              onClick={() => setCurrentLanguage("UA")}
            >
              UA
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
