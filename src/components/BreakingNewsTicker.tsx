import { Radio } from "lucide-react";

const items = [
  "Press Play tops Uganda's music ",
  "Face TV now broadcasting in 32+ African countries",
  "Face TV Live Events ",
  "The Spotlight",
  "Face TV Awards",
];

const BreakingNewsTicker = () => {
  return (
    <div className="bg-background border-y border-border overflow-hidden">
      <div className="flex items-stretch">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shrink-0">
          <Radio size={14} className="animate-pulse" /> Breaking
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-2">
            {[...items, ...items].map((t, i) => (
              <span key={i} className="mx-8 text-sm text-foreground/80">
                <span className="text-primary mr-2">●</span>{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
