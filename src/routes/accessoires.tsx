import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/accessoires")({
  head: () => ({
    meta: [
      { title: "Accessoires — Telefoon Wereld Haarlem" },
      { name: "description", content: "Hoesjes, opladers en screenprotectors voor elk merk en model — verkrijgbaar in onze winkel aan de Zijlweg." },
      { property: "og:title", content: "Accessoires — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Premium accessoires direct uit voorraad." },
    ],
  }),
  component: AccessoiresPage,
});

const categories = [
  { title: "Hoesjes", body: "Van strak siliconen tot leren bookcases, bescherming met stijl voor iPhone, Samsung, Google en meer.", tag: "200+ modellen" },
  { title: "Opladers", body: "Originele USB-C, Lightning en MagSafe opladers. Inclusief snelladers en draadloze opties.", tag: "Origineel" },
  { title: "Screenprotectors", body: "Premium tempered glass, perfect aangebracht in de winkel, lifetime garantie tegen breuk.", tag: "Gratis plaatsing" },
];

function AccessoiresPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Accessoires"
        title="Alles om uw toestel"
        highlight="te beschermen."
        intro="Wij selecteren accessoires die wij zelf ook zouden gebruiken, hoogwaardig en eerlijk geprijsd, passend bij uw model."
      />

      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-brand-900 text-white animate-fade-up">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p className="text-[15px] font-medium">
              <span className="font-semibold">2 jaar garantie</span> op elk accessoire — pech of breuk, wij regelen het.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <div
              key={c.title}
              className="bg-white rounded-3xl p-8 border border-[color:var(--color-hairline)] hover:border-brand-500/30 hover:shadow-[var(--shadow-lift)] transition-all animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">{c.tag}</span>
              <h3 className="mt-3 text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 text-brand-900/60 leading-relaxed text-[15px]">{c.body}</p>
              <div className="mt-4 flex items-center gap-2 text-[13px] text-brand-600 font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                2 jaar garantie
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white border-y border-[color:var(--color-hairline)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Geen webshop, wel persoonlijk advies.</h2>
          <p className="mt-4 text-brand-900/60">
            Kom langs in de winkel aan de Zijlweg. Wij helpen u het juiste accessoire kiezen voor uw toestel en gebruik.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="px-7 py-3.5 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all">
              Plan winkelbezoek
            </Link>
            <Link to="/afspraak" className="px-7 py-3.5 bg-white border border-[color:var(--color-hairline)] rounded-2xl font-semibold hover:bg-brand-50 transition-all">
              Direct reparatie plannen
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}