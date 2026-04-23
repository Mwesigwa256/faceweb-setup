import { assets } from "@/lib/assets";
import StatsSection from "@/components/StatsSection";
import LiveTVSection from "@/components/LiveTVSection";
import FeaturedShowsSection from "@/components/FeaturedShowsSection";
import SocialSection from "@/components/SocialSection";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ArtistsShowcase from "@/components/ArtistsShowcase";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import OurBrandsSection from "@/components/OurBrandsSection";
import LatestNewsGrid from "@/components/LatestNewsGrid";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import NewsletterSection from "@/components/NewsletterSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";

const HomePage = () => {
  const { ref: brandsRef, isVisible: brandsVisible } = useScrollReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TelevisionStation",
    name: "Face TV",
    url: typeof window !== "undefined" ? window.location.origin : "",
    description: "The Home of Ugandan Music — broadcasting 24 hours across 32+ African countries on StarTimes CH 223 / ST 199.",
    sameAs: [
      "https://facebook.com",
      "https://instagram.com",
      "https://twitter.com",
      "https://youtube.com",
    ],
  };

  return (
    <div className="relative">
      <SEO
        title="Face TV — The Home of Ugandan Music | 24/7 Live"
        description="Face TV is the home of Ugandan music. Watch live on StarTimes CH 223 / ST 199 across 32+ African countries — shows, news, artists and more."
        image={assets.we}
        jsonLd={jsonLd}
      />
      {/* Hero Video Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={assets.home} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center section-container">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-foreground tracking-wider glow-text">
            FACE <span className="text-primary">TV</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mt-4 max-w-xl">
            The Home of Ugandan Music
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            StarTimes CH 223 / ST 199 — 24 Hours, 32+ African Countries
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#live"
              className="px-8 py-3 rounded-full font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "var(--gradient-primary)" }}
            >
              Watch Live
            </a>
            <a
              href="#shows"
              className="px-8 py-3 rounded-full font-semibold glass-card text-foreground hover:border-primary/50 transition-all duration-300"
            >
              Our Shows
            </a>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 animate-bounce">
            <ChevronDown className="text-primary" size={32} />
          </div>
        </div>
      </section>

      {/* Breaking news ticker */}
      <BreakingNewsTicker />

      {/* Stats */}
      <StatsSection />

      {/* Live TV */}
      <div id="live">
        <LiveTVSection />
      </div>

      {/* Latest News (magazine grid) */}
      <LatestNewsGrid />

      {/* Artists Showcase */}
      <ArtistsShowcase />

      {/* Featured Shows */}
      <div id="shows">
        <FeaturedShowsSection />
      </div>

      {/* Our Brands / Family */}
      <OurBrandsSection />

      {/* Upcoming events */}
      <UpcomingEventsSection />

      {/* Clients */}
      <ClientsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter CTA */}
      <NewsletterSection />

      {/* Brand Logos */}
      <section ref={brandsRef} className="py-20" style={{ background: "var(--gradient-dark)" }}>
        <div
          className={`section-container flex flex-col md:flex-row items-center justify-center gap-12 transition-all duration-700 ${
            brandsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src={assets.we}
            alt="We"
            loading="lazy"
            className="h-32 md:h-44 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
          <img
            src={assets.epg}
            alt="EPG"
            loading="lazy"
            className="h-32 md:h-44 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </section>

      {/* Social */}
      <SocialSection />
    </div>
  );
};

export default HomePage;
