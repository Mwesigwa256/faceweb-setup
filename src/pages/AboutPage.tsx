import { assets } from "@/lib/assets";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Eye, Gem, Award } from "lucide-react";

const values = [
  { letter: "F", word: "Fairness" },
  { letter: "A", word: "Authenticity" },
  { letter: "C", word: "Creativity" },
  { letter: "E", word: "Excellence" },
  { letter: "T", word: "Transparency" },
  { letter: "V", word: "Value" },
];

const objectives = [
  "Give Ugandan artists a fair, authentic and transparent platform to air their content.",
  "Promote and showcase Ugandan artists and their talents to the global audience.",
  "Recognise distinguished Ugandan artists and reward up-and-coming talents through the FACE TV Awards.",
  "Produce a world-class, live interactive television broadcast channel.",
  "Unite Ugandans and Africans through the joyous celebrations of excellence in Art.",
  "Build emotional bonds between brands and their customers through strategic partnerships.",
];

const topTowns = ["Kampala", "Mbale", "Masaka", "Jinja", "Mukono", "Iganga", "Gulu", "Arua", "Mbarara", "Lira"];

const AboutPage = () => {
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();
  const { ref: objRef, isVisible: objVisible } = useScrollReveal();
  const { ref: reachRef, isVisible: reachVisible } = useScrollReveal();

  return (
    <div>
      {/* Hero — KEPT */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${assets.concert})` }}
      >
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="relative z-10 section-container">
          <p className="text-accent text-lg italic mb-2">The Home of Ugandan Music</p>
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            About <span className="text-primary">Face TV</span>
          </h1>
        </div>
      </section>

      {/* Who We Are — Enhanced */}
      <section className="py-20" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-6">
            Who <span className="text-primary">We Are</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            FACE TV is a 24hr Ugandan music television channel aired on StarTimes cable network CH 223 / ST 199. The StarTimes platform has over 1.5 million decoders in circulation in Uganda, and over 14.5 million subscribers throughout Africa.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            There are over 470,000 decoders tuned in to FACE TV per day in Uganda alone. We own 35% viewership of StarTimes Pay TV and are the 4th most-watched local channel on the platform. Currently, FACE TV is aired across the East African region and in 32 other African Countries.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            FACE TV is the first and only channel in Uganda and across Africa that plays solely Ugandan music content and features Uganda's broadest mix of contemporary artists and music genres. We support, promote and celebrate the talent and creativity of Ugandan artists, video directors, record labels and producers.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={missionRef} className="py-20 bg-background">
        <div className="section-container max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            className={`glass-card p-8 transition-all duration-700 ${
              missionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-primary" size={28} />
              <h3 className="text-2xl font-heading text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To make FACE TV the biggest Ugandan music channel on the continent. FACE TV is the ultimate recognition of Ugandan Music globally — <span className="text-primary font-semibold">"THE HOME OF UGANDAN MUSIC"</span>.
            </p>
          </div>
          <div
            className={`glass-card p-8 transition-all duration-700 delay-200 ${
              missionVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-primary" size={28} />
              <h3 className="text-2xl font-heading text-foreground">Our Mission</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Produce an international platform to celebrate our cultural heritage and values.</li>
              <li>• Give Ugandan artists a platform to air their creative work — LOCAL CONTENT 24hrs.</li>
              <li>• Recognise up-coming artists as well as established talent globally.</li>
              <li>• Create sustainable growth to the Ugandan music industry.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container text-center">
          <Gem className="mx-auto mb-3 text-primary" size={28} />
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-2">
            Our <span className="text-primary">Values</span>
          </h2>
          <p className="text-muted-foreground mb-10">The acronym of FACE TV stands for everything we believe in.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {values.map((v, i) => (
              <div
                key={v.letter}
                className={`glass-card p-4 transition-all duration-500 hover:border-primary/50 ${
                  valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-3xl font-heading text-primary">{v.letter}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{v.word}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section ref={objRef} className="py-20 bg-background">
        <div className="section-container max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-primary" size={28} />
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">
              Our <span className="text-primary">Objectives</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {objectives.map((obj, i) => (
              <div
                key={i}
                className={`glass-card p-5 transition-all duration-500 ${
                  objVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <span className="text-primary font-heading text-lg mr-2">0{i + 1}</span>
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reach */}
      <section ref={reachRef} className="py-20" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading text-foreground text-center mb-4">
            Our <span className="text-primary">Reach</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Top towns with highest Face TV viewership in Uganda
          </p>
          <div
            className={`flex flex-wrap justify-center gap-3 transition-all duration-700 ${
              reachVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {topTowns.map((town) => (
              <span
                key={town}
                className="px-4 py-2 glass-card text-sm text-foreground hover:border-primary/50 transition-colors"
              >
                {town}
              </span>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Target audience: 15–45 years • Young urban youth • Small businesses • Universities • Freelancers
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
