import { assets } from "@/lib/assets";

const AboutPage = () => {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${assets.concert})` }}
      >
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="relative z-10 section-container">
          <p className="text-accent text-lg italic mb-2">I miss us</p>
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            About <span className="text-primary">Face TV</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container max-w-3xl">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Face TV Uganda is a modern entertainment platform focused on promoting Ugandan music, artists, and digital content.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our mission is to connect fans with their favorite artists through streaming, news, and exclusive content.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
