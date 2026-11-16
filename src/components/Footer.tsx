import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const footerimg = "/assets/footerimg.png";
const logo = "/assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center py-16"
      style={{ backgroundImage: `url(${footerimg})` }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div className="relative section-container grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <img
            src={logo}
            alt="Face TV"
            className="h-12 mb-4"
            loading="lazy"
          />

          <p className="text-sm text-muted-foreground leading-relaxed">
            The Home of Ugandan Music. Broadcasting 24/7 on StarTimes CH 223
            DTT/Satellite Dish CH 528- across 32+ African countries.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-heading text-primary mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Shows", path: "/shows" },
              { label: "News", path: "/news" },
              { label: "Schedule", path: "/schedule" },
              { label: "Advertise", path: "/advertise" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Our Shows */}
        <div>
          <h3 className="text-xl font-heading text-primary mb-4">
            Our Shows
          </h3>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Press Play</span>
            <span>The Face Hits</span>
            <span>102 Collaborations</span>
            <span>SpotLight</span>
            <span>Imba Sessions</span>
            <span>Rise Up</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-heading text-primary mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin
                size={16}
                className="text-primary mt-0.5 shrink-0"
              />
              <span>Plot 914 Kaduyu Road Kiwatule.</span>
            </div>

            <a
              href="https://wa.me/256748624400"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
            >
              <Phone
                size={16}
                className="text-primary shrink-0 group-hover:scale-110 transition-transform"
              />
              <span>+256 748 624 400</span>
            </a>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={16} className="text-primary shrink-0" />
              <span>mwesigwasophie12@gmail.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-4 flex gap-3 text-muted-foreground text-xs">
            <a
              href="http://www.youtube.com/@FACETVUG"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              YouTube
            </a>

            <a
              href="https://www.tiktok.com/@facetvuganda?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              TikTok
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61595297924610"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative section-container mt-10 pt-6 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          Face TV Uganda. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
