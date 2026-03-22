"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

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

/* ─── Subscribe Form ─── */
export function SubscribeForm({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={`${className} text-[var(--accent)] font-semibold text-lg`}
        role="status"
      >
        You&apos;re in. Watch your inbox. 👁️
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
    >
      <label htmlFor={dark ? "email-hero" : "email-cta"} className="sr-only">
        Email address
      </label>
      <input
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
  );
}

/* ─── Newsletter Card ─── */
export function NewsletterCard({
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
      <div className="text-4xl mb-4" aria-hidden="true">
        {emoji}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-[var(--muted)] leading-relaxed mb-4">{description}</p>
      <span className="text-sm text-[var(--accent)] font-medium">
        {frequency}
      </span>
    </div>
  );
}

/* ─── Sections that need client-side reveal ─── */
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

export function AuthorSection() {
  const authorRef = useReveal();
  return (
    <section className="py-32 px-6" aria-labelledby="author-heading">
      <div ref={authorRef} className="reveal max-w-3xl mx-auto text-center">
        <div className="inline-block mb-6 text-6xl" aria-hidden="true">
          👁️
        </div>
        <h2
          id="author-heading"
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Written by{" "}
          <span className="text-[var(--accent)]">Policarpo</span>
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
