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
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

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
    <div className="relative bg-black">
      {/* Subtle CRT Noise Overlay */}
      <div className="tv-noise" />

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
        
        {/* Background Scrolling Artist Ticker (Very transparent, huge font) */}
        <div className="absolute inset-0 flex flex-col justify-center opacity-10 pointer-events-none overflow-hidden z-0 rotate-[-5deg] scale-110">
          <div className="whitespace-nowrap animate-marquee text-[15rem] font-heading text-outline uppercase leading-none">
            UGANDA • AFROBEATS • DANCEHALL • HIPHOP • R&B • GOSPEL • KADONGO KAMU • UGANDA • AFROBEATS • DANCEHALL • HIPHOP • R&B • GOSPEL • KADONGO KAMU •
          </div>
          <div className="whitespace-nowrap animate-marquee text-[15rem] font-heading text-outline uppercase leading-none mt-10" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
            JOSE CHAMELEONE • BEBE COOL • BOUNTY KILLER • SHEEBAH • AZAWI • VINKA • EDDY KENZO • JOSE CHAMELEONE • BEBE COOL • BOUNTY KILLER • SHEEBAH • AZAWI • VINKA • EDDY KENZO •
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center section-container">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glitch-wrapper"
          >
            <h1 
              className="text-7xl md:text-9xl lg:text-[12rem] font-heading text-white tracking-widest drop-shadow-[0_0_30px_rgba(255,0,0,0.8)] glitch" 
              data-text="FACE TV"
            >
              FACE <span className="text-primary">TV</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-2xl font-bold text-foreground mt-4 max-w-xl uppercase tracking-[0.2em] drop-shadow-md"
          >
            The Home of Ugandan Music
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-sm md:text-base text-muted-foreground mt-3 font-medium bg-black/40 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm"
          >
            StarTimes CH 223 / ST 199 — 24 Hours, 32+ African Countries
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex gap-6"
          >
            <a
              href="#live"
              className="px-8 py-4 rounded-full font-bold text-lg text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] pulse-glow"
              style={{ background: "var(--gradient-primary)" }}
            >
              Watch Live
            </a>
            <a
              href="#shows"
              className="px-8 py-4 rounded-full font-bold text-lg glass-card text-foreground hover:border-primary transition-all duration-300 hover:bg-white/10"
            >
              Our Shows
            </a>
          </motion.div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 animate-bounce">
            <ChevronDown className="text-primary" size={32} />
          </div>
        </div>
      </section>

      {/* Breaking news ticker */}
      <BreakingNewsTicker />

      {/* Latest News (magazine grid) */}
      <AnimatedSection>
        <LatestNewsGrid />
      </AnimatedSection>
      
      {/* Stats */}
      <AnimatedSection delay={0.1}>
        <StatsSection />
      </AnimatedSection>

      {/* Live TV */}
      <AnimatedSection>
        <div id="live">
          <LiveTVSection />
        </div>
      </AnimatedSection>

      {/* Artists Showcase */}
      <AnimatedSection>
        <ArtistsShowcase />
      </AnimatedSection>

      {/* Featured Shows */}
      <AnimatedSection>
        <div id="shows">
          <FeaturedShowsSection />
        </div>
      </AnimatedSection>

      {/* Our Brands / Family */}
      <AnimatedSection>
        <OurBrandsSection />
      </AnimatedSection>

      {/* Upcoming events */}
      <AnimatedSection>
        <UpcomingEventsSection />
      </AnimatedSection>

      {/* Clients */}
      <AnimatedSection>
        <ClientsSection />
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>

      {/* Newsletter CTA */}
      <AnimatedSection>
        <NewsletterSection />
      </AnimatedSection>

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
