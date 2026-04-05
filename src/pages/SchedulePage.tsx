import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar } from "lucide-react";

type DaySchedule = { time: string; show: string }[];

const schedule: Record<string, DaySchedule> = {
  Monday: [
    { time: "10–11 AM", show: "DJ Mix" },
    { time: "11 AM–12 PM", show: "Spotlight Repeat" },
    { time: "12–2 PM", show: "Request Time" },
    { time: "2–3 PM", show: "Sing Along" },
    { time: "3–4 PM", show: "Freshers" },
    { time: "4–6 PM", show: "Press Play" },
    { time: "6–7 PM", show: "Spotlight" },
    { time: "7–8 PM", show: "DJ Mix" },
    { time: "8 PM–10 AM", show: "Press Play" },
  ],
  Tuesday: [
    { time: "10–11 AM", show: "DJ Mix" },
    { time: "11 AM–12 PM", show: "Spotlight Repeat" },
    { time: "12–2 PM", show: "Request Time" },
    { time: "2–3 PM", show: "Battle Zone" },
    { time: "3–4 PM", show: "Freshers" },
    { time: "4–6 PM", show: "Press Play" },
    { time: "6–7 PM", show: "Spotlight" },
    { time: "7–8 PM", show: "DJ Mix" },
    { time: "8 PM–10 AM", show: "Press Play" },
  ],
  Wednesday: [
    { time: "10–11 AM", show: "DJ Mix" },
    { time: "11 AM–12 PM", show: "Spotlight Repeat" },
    { time: "12–2 PM", show: "Request Time" },
    { time: "2–3 PM", show: "Sing Along" },
    { time: "3–4 PM", show: "Freshers" },
    { time: "4–6 PM", show: "Press Play" },
    { time: "6–7 PM", show: "Spotlight" },
    { time: "7–8 PM", show: "DJ Mix" },
    { time: "8 PM–10 AM", show: "Press Play" },
  ],
  Thursday: [
    { time: "10–11 AM", show: "DJ Mix" },
    { time: "11 AM–12 PM", show: "Spotlight Repeat" },
    { time: "12–6 PM", show: "Kikadde" },
    { time: "6–7 PM", show: "Spotlight" },
    { time: "7–8 PM", show: "DJ Mix" },
    { time: "8 PM–10 AM", show: "Kikadde" },
  ],
  Friday: [
    { time: "10–11 AM", show: "DJ Mix" },
    { time: "11 AM–12 PM", show: "Spotlight Repeat" },
    { time: "12–2 PM", show: "Request Time" },
    { time: "2–3 PM", show: "Sing Along" },
    { time: "3–3:30 PM", show: "Hip Hop" },
    { time: "3:30–4 PM", show: "Regional" },
    { time: "4–5 PM", show: "Backyard Repeat" },
    { time: "5–6 PM", show: "Press Play" },
    { time: "6–7 PM", show: "Spotlight" },
    { time: "7–8 PM", show: "DJ Mix" },
    { time: "8 PM–10 AM", show: "Press Play" },
  ],
  Saturday: [
    { time: "10–11 AM", show: "DJ Mix" },
    { time: "11 AM–12 PM", show: "Spotlight Repeat" },
    { time: "12–2 PM", show: "Request Time" },
    { time: "2–7 PM", show: "Club Bangerz" },
    { time: "7–8 PM", show: "DJ Mix" },
    { time: "8 PM–10 AM", show: "Press Play" },
  ],
  Sunday: [
    { time: "10–11 AM", show: "DJ Mix" },
    { time: "11 AM–2 PM", show: "Press Play" },
    { time: "2–3 PM", show: "Backyard" },
    { time: "3–7 PM", show: "Press Play" },
    { time: "7–8 PM", show: "DJ Mix" },
    { time: "8 PM–10 AM", show: "Press Play" },
  ],
};

const days = Object.keys(schedule);

const SchedulePage = () => {
  const [activeDay, setActiveDay] = useState("Monday");
  const { ref, isVisible } = useScrollReveal();

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container text-center">
          <Calendar className="mx-auto mb-3 text-primary" size={36} />
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            TV <span className="text-primary">Schedule</span>
          </h1>
          <p className="text-muted-foreground mt-3">Full weekly programming guide for Face TV</p>
        </div>
      </section>

      {/* Day Tabs */}
      <section ref={ref} className="py-16 bg-background">
        <div className="section-container max-w-4xl">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeDay === day
                    ? "text-primary-foreground"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
                style={activeDay === day ? { background: "var(--gradient-primary)" } : undefined}
              >
                {day}
              </button>
            ))}
          </div>

          <div
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="glass-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 text-sm uppercase tracking-wider text-muted-foreground">Time</th>
                    <th className="text-left px-6 py-4 text-sm uppercase tracking-wider text-muted-foreground">Program</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule[activeDay].map((slot, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">{slot.time}</td>
                      <td className="px-6 py-4 font-heading text-lg text-foreground">{slot.show}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
