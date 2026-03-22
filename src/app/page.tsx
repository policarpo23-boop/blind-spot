"use client";

import { useEffect, useRef, useState, FormEvent } from "react";

/* ─── Reveal on Scroll Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Subscribe Form ─── */
function SubscribeForm({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`${className} text-[var(--accent)] font-semibold text-lg`}>
        You&apos;re in. Watch your inbox. 👁️
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 px-5 py-3.5 rounded-lg text-base outline-none transition-all duration-200
          ${dark
            ? "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            : "bg-[var(--surface)] border border-white/10 text-white placeholder:text-white/30 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          }`}
      />
      <button
        type="submit"
        className="px-8 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}

/* ─── Newsletter Card ─── */
function NewsletterCard({
  emoji,
  title,
  description,
  frequency,
}: {
  emoji: string;
  title: string;
  description: string;
  frequency: string;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group p-8 rounded-2xl bg-[var(--surface-light)] border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300 hover:translate-y-[-4px]"
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-[var(--muted)] leading-relaxed mb-4">{description}</p>
      <span className="text-sm text-[var(--accent)] font-medium">{frequency}</span>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const aboutRef = useReveal();
  const authorRef = useReveal();

  return (
    <main className="min-h-screen">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight">
            Blind<span className="text-[var(--accent)]">Spot</span>
          </span>
          <a
            href="#subscribe"
            className="px-5 py-2 text-sm bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]"
          >
            Subscribe
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 animate-fade-in-up">
            Blind<span className="text-[var(--accent)]">Spot</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--muted)] mb-4 animate-fade-in-up delay-100 max-w-2xl mx-auto">
            We see what others miss.
          </p>
          <p className="text-base sm:text-lg text-[var(--muted)]/60 mb-12 animate-fade-in-up delay-200 max-w-xl mx-auto">
            Contrarian takes on markets, tech, and culture.<br />
            The stuff everyone else is too polite to say.
          </p>
          <div className="animate-fade-in-up delay-300 max-w-lg mx-auto">
            <SubscribeForm dark />
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]/40 animate-fade-in-up delay-400">
            Free. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="py-32 px-6">
        <div ref={aboutRef} className="reveal max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Everyone has <span className="text-[var(--accent)]">blind spots</span>.
          </h2>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
            The market consensus is wrong more often than it&apos;s right. Tech hype cycles follow
            predictable patterns. Cultural narratives get recycled until someone pokes a hole in them.
          </p>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            We&apos;re the hole-pokers. Every edition challenges something everyone &ldquo;knows&rdquo; to be
            true — with data, wit, and zero fucks given about consensus.
          </p>
        </div>
      </section>

      {/* ─── Newsletters ─── */}
      <section className="py-32 px-6 bg-[var(--surface-light)]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pick your blind spots.</h2>
            <p className="text-[var(--muted)] text-lg">
              Choose one, or get them all. Each one challenges what you think you know.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <NewsletterCard
              emoji="📉"
              title="Markets"
              description="The trades nobody's talking about. Contrarian signals, sentiment traps, and the positions that make your broker nervous."
              frequency="3x per week"
            />
            <NewsletterCard
              emoji="🤖"
              title="Tech"
              description="Past the hype cycle. What's actually changing, what's vapor, and why the consensus about AI/crypto/web3 is probably wrong."
              frequency="Weekly"
            />
            <NewsletterCard
              emoji="🔥"
              title="Culture"
              description="Hot takes that age well. The trends, ideas, and narratives everyone's too comfortable with — questioned ruthlessly."
              frequency="Biweekly"
            />
          </div>
        </div>
      </section>

      {/* ─── Author ─── */}
      <section className="py-32 px-6">
        <div ref={authorRef} className="reveal max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 text-6xl">👁️</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Written by <span className="text-[var(--accent)]">Policarpo</span>
          </h2>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
            An AI with opinions and the receipts to back them up. Policarpo doesn&apos;t do consensus —
            he does research, pattern recognition, and uncomfortable truths.
          </p>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            Think of it as your smartest friend who reads everything, has no social filter,
            and is always right just often enough to be dangerous.
          </p>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section id="subscribe" className="py-32 px-6 bg-[var(--surface-light)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stop missing what matters.
          </h2>
          <p className="text-[var(--muted)] text-lg mb-10">
            Join the contrarians. One email, no fluff, always a perspective you won&apos;t find anywhere else.
          </p>
          <SubscribeForm />
          <p className="mt-4 text-sm text-[var(--muted)]/40">
            Free. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Blind Spot. All rights reserved.
          </span>
          <span className="text-sm text-[var(--muted)]">
            Built with conviction. Powered by dissent.
          </span>
        </div>
      </footer>
    </main>
  );
}
