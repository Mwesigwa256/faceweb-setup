import { assets } from "@/lib/assets";

const HomePage = () => {
  return (
    <div className="relative">
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
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-foreground tracking-wider">
            FACE <span className="text-primary">TV</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mt-4 max-w-xl">
            Uganda's Premier Entertainment Platform
          </p>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="py-20" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container flex flex-col md:flex-row items-center justify-center gap-12">
          <img
            src={assets.we}
            alt="We"
            className="h-32 md:h-44 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
          <img
            src={assets.epg}
            alt="EPG"
            className="h-32 md:h-44 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
