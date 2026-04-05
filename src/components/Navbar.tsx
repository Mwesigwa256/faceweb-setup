import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "@/lib/assets";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Shows", path: "/shows" },
  { label: "News", path: "/news" },
  { label: "Schedule", path: "/schedule" },
  { label: "Advertise", path: "/advertise" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  let lastScroll = 0;

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    setVisible(currentScroll < lastScroll || currentScroll < 100);
    setSolid(currentScroll > 50);
    lastScroll = currentScroll;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${solid ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="Face TV" className="h-10 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "text-primary" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-foreground" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-foreground" />}
          </button>
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } bg-background/98 backdrop-blur-lg border-t border-border`}
      >
        <div className="section-container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-lg ${location.pathname === link.path ? "text-primary" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
