import { Download, Smartphone, Share, Plus, Bell, Wifi, Zap, Check } from "lucide-react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import SEO from "@/components/SEO";
import { toast } from "sonner";

const InstallPage = () => {
  const { canInstall, isInstalled, isIOS, promptInstall } = useInstallPrompt();

  const handleInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === "accepted") toast.success("Face TV is installing on your device!");
    else if (outcome === "dismissed") toast("Install dismissed — you can try again anytime.");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Install Face TV — Get the App | Face TV Uganda"
        description="Install Face TV on your phone or desktop. Watch shows, catch breaking news, and stream live — right from your home screen."
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-2xl" style={{ background: "var(--gradient-primary)" }}>
            <Smartphone className="text-primary-foreground" size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading text-foreground mb-4">
            Get the <span className="text-primary">Face TV App</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Install Face TV on your device for the fastest way to watch shows, follow breaking news, and stream live — straight from your home screen.
          </p>

          {isInstalled ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-primary font-semibold">
              <Check size={20} /> Face TV is already installed
            </div>
          ) : canInstall ? (
            <button
              onClick={handleInstall}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-semibold text-primary-foreground shadow-xl hover:opacity-90 transition active:scale-95"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Download size={20} /> Install Face TV
            </button>
          ) : (
            <p className="text-sm text-muted-foreground">
              {isIOS
                ? "Follow the iPhone instructions below to install."
                : "Open this page in Chrome, Edge, or Safari on your device, then follow the steps below."}
            </p>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="section-container">
          <h2 className="text-3xl font-heading text-center text-foreground mb-12">Why install?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Lightning fast", desc: "Launches instantly from your home screen — no browser required." },
              { icon: Wifi, title: "Works on the go", desc: "Smooth experience on any connection, fullscreen and immersive." },
              { icon: Bell, title: "Breaking news ready", desc: "Be first to know when news drops and shows go live." },
            ].map((b) => (
              <div key={b.title} className="glass-card p-6 hover:border-primary/50 transition">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                  <b.icon className="text-primary-foreground" size={22} />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-heading text-center text-foreground mb-12">How to install</h2>

          {/* iPhone / iPad */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-heading text-2xl text-foreground mb-4 flex items-center gap-2">
              <Smartphone size={22} className="text-primary" /> iPhone &amp; iPad (Safari)
            </h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span> Tap the <Share size={16} className="inline text-primary" /> <strong className="text-foreground">Share</strong> button at the bottom of Safari.</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span> Scroll down and tap <Plus size={16} className="inline text-primary" /> <strong className="text-foreground">Add to Home Screen</strong>.</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span> Tap <strong className="text-foreground">Add</strong> in the top-right corner. The Face TV icon appears on your home screen.</li>
            </ol>
          </div>

          {/* Android */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-heading text-2xl text-foreground mb-4 flex items-center gap-2">
              <Smartphone size={22} className="text-primary" /> Android (Chrome)
            </h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span> Tap the <strong className="text-foreground">⋮ menu</strong> (top-right of Chrome).</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span> Tap <strong className="text-foreground">Install app</strong> or <strong className="text-foreground">Add to Home screen</strong>.</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span> Confirm <strong className="text-foreground">Install</strong>. Face TV will launch like a native app.</li>
            </ol>
          </div>

          {/* Desktop */}
          <div className="glass-card p-6">
            <h3 className="font-heading text-2xl text-foreground mb-4 flex items-center gap-2">
              <Download size={22} className="text-primary" /> Desktop (Chrome / Edge)
            </h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span> Look for the <strong className="text-foreground">install icon</strong> on the right side of the address bar.</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span> Click it and choose <strong className="text-foreground">Install</strong>. Face TV opens in its own window.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstallPage;
