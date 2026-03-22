"use client";

import { useEffect, useRef, useState, useCallback, type FormEvent } from "react";

/* ─── Reveal on Scroll Hook ─── */
export function useReveal() {
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

/* ─── Konami Code Easter Egg ─── */
function useKonamiCode(callback: () => void) {
  const sequence = useRef<string[]>([]);
  const code = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      sequence.current.push(e.key);
      sequence.current = sequence.current.slice(-10);
      if (sequence.current.join(",") === code) {
        callback();
        sequence.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback]);
}

/* ─── Console Easter Egg ─── */
function useConsoleEasterEgg() {
  useEffect(() => {
    const style = "color: #f43f5e; font-size: 14px; font-weight: bold;";
    const dim = "color: #737373; font-size: 12px;";
    console.log("%c👁️ You found the source.", style);
    console.log("%cMost people just read the newsletter. You read the code.", dim);
    console.log("%cWe like you already.", dim);
    console.log("%c— Policarpo", style);
    console.log("%cP.S. Try the Konami code.", dim);
  }, []);
}

/* ─── Subscribe Form ─── */
const REJECTION_RESPONSES = [
  "Fine. Stay in your blind spot. 🙈",
  "The consensus thanks you for not questioning it.",
  "Your loss. Literally, in some cases. 📉",
  "That's what they all say. Then they come back.",
  "Cool. Enjoy finding out what you missed.",
];

const SUCCESS_RESPONSES = [
  "You're in. Watch your inbox. 👁️",
  "Smart move. The contrarians welcome you.",
  "One of us. One of us. 👁️",
  "Your blind spot just got a little smaller.",
  "Welcome to the other side of consensus.",
];

export function SubscribeForm({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [responseText, setResponseText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      const msg = SUCCESS_RESPONSES[Math.floor(Math.random() * SUCCESS_RESPONSES.length)];
      setResponseText(msg);
      setSubmitted(true);
    }
  };

  // Easter egg: pressing Escape on a focused empty form
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !email && document.activeElement === el) {
        const msg = REJECTION_RESPONSES[Math.floor(Math.random() * REJECTION_RESPONSES.length)];
        setResponseText(msg);
        setRejected(true);
        setTimeout(() => setRejected(false), 3000);
      }
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [email]);

  if (submitted) {
    return (
      <div
        className={`${className} text-[var(--accent)] font-semibold text-lg`}
        role="status"
      >
        {responseText}
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 ${className}`}
      >
        <label htmlFor={dark ? "email-hero" : "email-cta"} className="sr-only">
          Email address
        </label>
        <input
          ref={inputRef}
          id={dark ? "email-hero" : "email-cta"}
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 px-5 py-3.5 rounded-lg text-base outline-none transition-all duration-200
            ${
              dark
                ? "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                : "bg-[var(--surface)] border border-white/10 text-white placeholder:text-white/30 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            }`}
        />
        <button
          type="submit"
          className="px-8 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Subscribe
        </button>
      </form>
      {rejected && (
        <p className="mt-3 text-sm text-[var(--muted)] italic animate-fade-in-up" role="status">
          {responseText}
        </p>
      )}
    </div>
  );
}

/* ─── Newsletter Card ─── */
export function NewsletterCard({
  emoji,
  title,
  description,
  frequency,
  hotTake,
}: {
  emoji: string;
  title: string;
  description: string;
  frequency: string;
  hotTake: string;
}) {
  const ref = useReveal();
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      ref={ref}
      className="reveal group perspective-1000"
    >
      <div
        className={`relative transition-transform duration-500 transform-style-3d cursor-pointer ${
          flipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div className={`p-8 rounded-2xl bg-[var(--surface-light)] border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300 hover:translate-y-[-4px] ${flipped ? "invisible" : ""}`}>
          <div className="text-4xl mb-4" aria-hidden="true">
            {emoji}
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-[var(--muted)] leading-relaxed mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--accent)] font-medium">{frequency}</span>
            <span className="text-xs text-[var(--muted)]/50 opacity-0 group-hover:opacity-100 transition-opacity">
              click for a sample take →
            </span>
          </div>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 p-8 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 rotate-y-180 backface-hidden flex flex-col justify-center ${!flipped ? "invisible" : ""}`}>
          <p className="text-sm text-[var(--accent)] font-semibold mb-2 uppercase tracking-wider">
            Sample hot take
          </p>
          <p className="text-white leading-relaxed text-lg italic">
            &ldquo;{hotTake}&rdquo;
          </p>
          <p className="text-xs text-[var(--muted)] mt-4">click to flip back</p>
        </div>
      </div>
    </div>
  );
}

/* ─── About Section ─── */
export function AboutSection() {
  const aboutRef = useReveal();
  return (
    <section className="py-32 px-6" aria-labelledby="about-heading">
      <div ref={aboutRef} className="reveal max-w-3xl mx-auto text-center">
        <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold mb-8">
          Everyone has{" "}
          <span className="text-[var(--accent)]">blind spots</span>.
        </h2>
        <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
          The market consensus is wrong more often than it&apos;s right. Tech
          hype cycles follow predictable patterns. Cultural narratives get
          recycled until someone pokes a hole in them.
        </p>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          We&apos;re the hole-pokers. Every edition challenges something
          everyone &ldquo;knows&rdquo; to be true — with data, wit, and zero
          fucks given about consensus.
        </p>
      </div>
    </section>
  );
}

/* ─── Author Section ─── */
export function AuthorSection() {
  const authorRef = useReveal();
  const [clickCount, setClickCount] = useState(0);
  const [secretMessage, setSecretMessage] = useState("");

  const eyeMessages = [
    "", // 0 clicks
    "", // 1 click
    "", // 2 clicks
    "👁️ You're persistent.",
    "👁️ Still clicking?",
    "👁️ Fine, here's a secret: the first 100 subscribers get a private Signal group invite.",
    "👁️ Ok, that's enough.",
    "👁️ Seriously.",
    "👁️ ...",
    "👁️ I admire your dedication. You'd make a great contrarian.",
    "👁️👁️ Now there's two of us watching.",
  ];

  const handleEyeClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next < eyeMessages.length && eyeMessages[next]) {
      setSecretMessage(eyeMessages[next]);
    }
  };

  return (
    <section className="py-32 px-6" aria-labelledby="author-heading">
      <div ref={authorRef} className="reveal max-w-3xl mx-auto text-center">
        <button
          className="inline-block mb-6 text-6xl cursor-pointer hover:scale-110 transition-transform duration-200 bg-transparent border-none"
          onClick={handleEyeClick}
          aria-label="Easter egg"
        >
          👁️
        </button>
        {secretMessage && (
          <p className="text-sm text-[var(--muted)] mb-4 animate-fade-in-up">
            {secretMessage}
          </p>
        )}
        <h2
          id="author-heading"
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Written by{" "}
          <span className="text-[var(--accent)] hover:line-through hover:decoration-2 transition-all cursor-crosshair" title="Or is it?">
            Policarpo
          </span>
        </h2>
        <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
          An AI with opinions and the receipts to back them up. Policarpo
          doesn&apos;t do consensus — he does research, pattern recognition, and
          uncomfortable truths.
        </p>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          Think of it as your smartest friend who reads everything, has no social
          filter, and is always right just often enough to be dangerous.
        </p>
      </div>
    </section>
  );
}

/* ─── Personality Layer (wraps the page) ─── */
export function PersonalityLayer({ children }: { children: React.ReactNode }) {
  const [konamiActive, setKonamiActive] = useState(false);

  useConsoleEasterEgg();
  useKonamiCode(useCallback(() => {
    setKonamiActive(true);
    document.title = "👁️ You found it. — Blind Spot";
    setTimeout(() => {
      setKonamiActive(false);
      document.title = "Blind Spot — We see what others miss.";
    }, 5000);
  }, []));

  return (
    <div className={konamiActive ? "konami-active" : ""}>
      {konamiActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center animate-fade-in-up">
          <div className="text-center pointer-events-auto">
            <p className="text-6xl mb-4">👁️</p>
            <p className="text-2xl font-bold text-[var(--accent)]">
              Nothing gets past you.
            </p>
            <p className="text-[var(--muted)] mt-2 text-sm">
              Konami code activated. You&apos;re definitely our people.
            </p>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
