import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Telefoon Wereld Haarlem" },
      { name: "description", content: "Bezoek ons aan de Zijlweg 24 in Haarlem, bel 023 551 7048 of stuur ons een bericht." },
      { property: "og:title", content: "Contact — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Adres, openingstijden en contactformulier." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(false);
  return (
    <SiteShell>
      <PageHero eyebrow="Contact" title="Kom langs of" highlight="stuur een bericht." intro="Wij zijn er voor u tijdens onze openingstijden. Bellen, mailen of binnenlopen mag altijd." />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[color:var(--color-hairline)]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-900/50 mb-4">Adres</h3>
              <p className="text-lg font-semibold">Zijlweg 24</p>
              <p className="text-brand-900/70">2013 DH Haarlem</p>
              <a href="https://maps.google.com/?q=Zijlweg+24+Haarlem" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-brand-600 font-semibold text-sm hover:gap-3 transition-all">
                Route plannen <span aria-hidden>→</span>
              </a>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-[color:var(--color-hairline)]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-900/50 mb-4">Telefoon</h3>
              <a href="tel:+31235517048" className="text-lg font-semibold text-brand-600">023 551 7048</a>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-[color:var(--color-hairline)]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-900/50 mb-4">Openingstijden</h3>
              <ul className="space-y-1 text-[15px] text-brand-900/70">
                {[
                  { day: "Maandag", hours: "10:00 – 18:00" },
                  { day: "Dinsdag", hours: "09:30 – 18:00" },
                  { day: "Woensdag", hours: "09:30 – 18:00" },
                  { day: "Donderdag", hours: "09:30 – 18:00" },
                  { day: "Vrijdag", hours: "09:30 – 18:00" },
                  { day: "Zaterdag", hours: "10:00 – 17:00" },
                  { day: "Zondag", hours: "Gesloten", closed: true },
                ].map((item, index) => {
                  const todayIndex = (new Date().getDay() + 6) % 7; // 0=Maandag, 6=Zondag
                  const isToday = index === todayIndex;
                  return (
                    <li
                      key={item.day}
                      className={`flex justify-between items-center rounded-xl px-3 py-1.5 -mx-3 transition-colors ${
                        isToday ? "bg-brand-50 font-semibold text-brand-900" : ""
                      } ${item.closed ? "text-brand-900/40" : ""}`}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                          </span>
                        )}
                        {item.day}
                      </span>
                      <span className={`tabular-nums ${item.closed ? "" : ""}`}>{item.hours}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden border border-[color:var(--color-hairline)] shadow-[var(--shadow-soft)] bg-white aspect-[4/3]">
              <iframe
                title="Kaart Zijlweg 24 Haarlem"
                src="https://www.google.com/maps?q=Zijlweg+24,+2013+DH+Haarlem&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); if (!agree) return; setSent(true); }}
              className="bg-white rounded-3xl p-8 border border-[color:var(--color-hairline)] space-y-4"
            >
              <h3 className="text-xl font-bold">Stuur ons een bericht</h3>
              {sent ? (
                <p className="text-brand-600 font-semibold">Bedankt! We nemen snel contact op.</p>
              ) : (
                <>
                  <input required maxLength={100} placeholder="Naam" className="w-full px-5 py-3.5 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all" />
                  <input required type="email" maxLength={255} placeholder="E-mail" className="w-full px-5 py-3.5 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all" />
                  <textarea required maxLength={1000} rows={4} placeholder="Uw vraag" className="w-full px-5 py-3.5 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none resize-none transition-all" />
                  <label className="flex items-start gap-3 text-sm text-brand-900/70 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1 accent-brand-500"
                    />
                    <span>
                      Ik ga akkoord met de{" "}
                      <Link to="/privacy" className="text-brand-600 font-semibold underline">privacyverklaring</Link>. Mijn gegevens worden uitsluitend gebruikt voor het beantwoorden van dit contactverzoek.
                    </span>
                  </label>
                  <button disabled={!agree} className="px-6 py-3.5 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed">Verstuur bericht</button>
                </>
              )}
            </form>

            <Link to="/afspraak" className="block text-center px-6 py-4 bg-brand-500 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all">
              Of plan direct uw reparatie →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}