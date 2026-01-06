import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ButtonNav } from "../ui/ButtonNav";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCatalogClick = (e?: React.MouseEvent) => {
    e?.preventDefault?.();

    if (location.pathname === "/catalog") {
      navigate("/catalog", { replace: true });
      return;
    }

    navigate("/catalog");
  };

  return (
    <header
      className="sticky top-0 z-[40] w-full bg-[#C6B0E7]"
      style={{ borderRadius: "0 0 30px 30px" }}
    >
<div
  className="
    grid 
    grid-cols-2          /* mobile: logo | burger */
    md:grid-cols-3       /* desktop: logo | nav | right space */
    items-center 
    h-[88px] 
    px-6 md:px-10
  "
>
  {/* Logo LEFT (mobile & desktop) */}
  <NavLink to="/" className="flex items-center h-full justify-start">
    <img
      src="/logo/Logo.svg"
      alt="Kyiv Café Hub Logo"
      className="h-10"
      style={{ mixBlendMode: "multiply" }}
    />
  </NavLink>

  {/* Desktop Navigation CENTER */}
  <nav className="hidden md:flex gap-6 items-center justify-center">
    <ButtonNav to="/" label="Home" />
    <ButtonNav to="/catalog" label="Catalog" onClick={handleCatalogClick} />
    <ButtonNav to="/blog" label="Blog" />
    <ButtonNav to="/about" label="About" />
  </nav>

  {/* Burger RIGHT on mobile, empty space on desktop */}
  <div className="flex items-center justify-end">
    <button
      className="flex md:hidden flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-white/20 transition"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <span
        className={`w-6 h-[2px] bg-black rounded transition-all ${
          isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
        }`}
      />
      <span
        className={`w-6 h-[2px] bg-black rounded my-[4px] transition-all ${
          isMenuOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`w-6 h-[2px] bg-black rounded transition-all ${
          isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
        }`}
      />
    </button>
  </div>
</div>



      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#C6B0E7] rounded-b-[30px] shadow-md py-3">

          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `
              w-full text-center py-3 text-lg uppercase font-heading
              ${isActive ? "bg-white/40 font-semibold" : "hover:bg-white/20"}
            `
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/catalog"
            onClick={() => {
              handleCatalogClick();
              setIsMenuOpen(false);
            }}
            className={({ isActive }) =>
              `
              w-full text-center py-3 text-lg uppercase font-heading
              ${isActive ? "bg-white/40 font-semibold" : "hover:bg-white/20"}
            `
            }
          >
            Catalog
          </NavLink>

          <NavLink
            to="/blog"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `
              w-full text-center py-3 text-lg uppercase font-heading
              ${isActive ? "bg-white/40 font-semibold" : "hover:bg-white/20"}
            `
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `
              w-full text-center py-3 text-lg uppercase font-heading
              ${isActive ? "bg-white/40 font-semibold" : "hover:bg-white/20"}
            `
            }
          >
            About
          </NavLink>

        </div>
      )}
    </header>
  );
};
