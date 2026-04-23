import { Facebook, Instagram, Twitter, Youtube, Search, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const TopBar = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const d = new Date();
    setDate(d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
  }, []);

  return (
    <div className="hidden md:block bg-primary text-primary-foreground text-xs">
      <div className="section-container flex items-center justify-between h-8">
        <div className="flex items-center gap-4">
          <span className="font-medium tracking-wide">{date}</span>
          <span className="opacity-60">|</span>
          <a href="tel:+256200900900" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Phone size={12} /> +256 200 900 900
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80"><Facebook size={14} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80"><Instagram size={14} /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:opacity-80"><Twitter size={14} /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:opacity-80"><Youtube size={14} /></a>
          <span className="opacity-60">|</span>
          <button aria-label="Search" className="hover:opacity-80"><Search size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
