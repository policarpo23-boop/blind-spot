import {
  SubscribeForm,
  NewsletterCard,
  AboutSection,
  AuthorSection,
} from "./components";

const DISCLAIMER = "Free. No spam. Unsubscribe anytime.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Blind Spot",
  description:
    "Contrarian takes on markets, tech, and culture. The stuff everyone else is too polite to say.",
  url: "https://blindspot.news",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>

      <main id="main-content" className="min-h-screen">
        {/* ─── Nav ─── */}
        <nav
          aria-label="Main navigation"
          className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <span className="text-xl font-bold tracking-tight">
              Blind<span className="text-[var(--accent)]">Spot</span>
            </span>
            <a
              href="#subscribe"
              className="px-5 py-2 text-sm bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Subscribe
            </a>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section
          aria-labelledby="hero-heading"
          className="min-h-screen flex items-center justify-center px-6 pt-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1
              id="hero-heading"
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 animate-fade-in-up"
            >
              Blind<span className="text-[var(--accent)]">Spot</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[var(--muted)] mb-4 animate-fade-in-up delay-100 max-w-2xl mx-auto">
              We see what others miss.
            </p>
            <p className="text-base sm:text-lg text-[var(--muted)]/60 mb-12 animate-fade-in-up delay-200 max-w-xl mx-auto">
              Contrarian takes on markets, tech, and culture.
              <br />
              The stuff everyone else is too polite to say.
            </p>
            <div className="animate-fade-in-up delay-300 max-w-lg mx-auto">
              <SubscribeForm dark />
            </div>
            <p className="mt-4 text-sm text-[var(--muted)]/40 animate-fade-in-up delay-400">
              {DISCLAIMER}
            </p>
          </div>
        </section>

        {/* ─── About ─── */}
        <AboutSection />

        {/* ─── Newsletters ─── */}
        <section
          aria-labelledby="newsletters-heading"
          className="py-32 px-6 bg-[var(--surface-light)]/50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                id="newsletters-heading"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Pick your blind spots.
              </h2>
              <p className="text-[var(--muted)] text-lg">
                Choose one, or get them all. Each one challenges what you think
                you know.
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
        <AuthorSection />

        {/* ─── Final CTA ─── */}
        <section
          id="subscribe"
          aria-labelledby="cta-heading"
          className="py-32 px-6 bg-[var(--surface-light)]"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Stop missing what matters.
            </h2>
            <p className="text-[var(--muted)] text-lg mb-10">
              Join the contrarians. One email, no fluff, always a perspective
              you won&apos;t find anywhere else.
            </p>
            <SubscribeForm />
            <p className="mt-4 text-sm text-[var(--muted)]/40">{DISCLAIMER}</p>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-[var(--muted)]">
              © 2025 Blind Spot. All rights reserved.
            </span>
            <span className="text-sm text-[var(--muted)]">
              Built with conviction. Powered by dissent.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
