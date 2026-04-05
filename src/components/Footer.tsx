import { Link } from "react-router-dom";
import { assets } from "@/lib/assets";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center py-16 mt-20"
      style={{ backgroundImage: `url(${assets.footerimg})` }}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div className="relative section-container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-heading text-primary mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/shows" className="nav-link">Shows</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-heading text-primary mb-4">Contact</h3>
          <p className="text-muted-foreground">Email: info@facetv.ug</p>
          <p className="text-muted-foreground">Phone: +256 700000000</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
