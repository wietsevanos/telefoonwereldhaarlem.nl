import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-50 text-brand-900 selection:bg-brand-100">
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: string;
}) {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[420px] -z-10 bg-gradient-to-b from-brand-100/60 via-brand-50 to-transparent" />
      <div className="max-w-5xl mx-auto px-6 text-center animate-fade-up">
        <span className="inline-block px-4 py-1.5 bg-white border border-[color:var(--color-hairline)] text-brand-600 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
          {eyebrow}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="text-brand-500">{highlight}</span>
            </>
          ) : null}
        </h1>
        {intro ? (
          <p className="mt-6 text-lg text-brand-900/60 max-w-2xl mx-auto leading-relaxed">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}