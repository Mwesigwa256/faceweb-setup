import { useScrollReveal } from "@/hooks/useScrollReveal";

const socials = [
  { name: "YouTube", url: "https://youtube.com/@facetvuganda", icon: "▶", color: "hover:text-red-500" },
  { name: "Instagram", url: "https://instagram.com/facetvuganda", icon: "◎", color: "hover:text-pink-500" },
  { name: "TikTok", url: "https://tiktok.com/@facetvuganda", icon: "♪", color: "hover:text-foreground" },
  { name: "Twitter/X", url: "https://x.com/facetvuganda", icon: "𝕏", color: "hover:text-foreground" },
  { name: "Facebook", url: "https://facebook.com/facetvuganda", icon: "f", color: "hover:text-blue-500" },
];

const SocialSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-2">
          Follow <span className="text-primary">@facetvuganda</span>
        </h2>
        <p className="text-muted-foreground mb-10">Stay connected across all platforms</p>

        <div
          className={`flex flex-wrap items-center justify-center gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card w-20 h-20 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:border-primary/50 hover:scale-110 ${s.color}`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[10px] text-muted-foreground">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
