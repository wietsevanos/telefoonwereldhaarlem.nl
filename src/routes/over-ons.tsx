import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import aboutShop from "@/assets/about-shop.jpg";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Over ons — Telefoon Wereld Haarlem" },
      { name: "description", content: "Het verhaal achter Telefoon Wereld Haarlem — jarenlange ervaring, lokale ondernemer, kwaliteitsgarantie." },
      { property: "og:title", content: "Over Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Kennismaken met uw lokale reparatiespecialist aan de Zijlweg." },
    ],
  }),
  component: OverOnsPage,
});

const stats = [
  { value: "10+", label: "jaar in Haarlem" },
  { value: "20K+", label: "reparaties uitgevoerd" },
  { value: "4,8", label: "gemiddelde review" },
  { value: "30 min", label: "gemiddelde tijd" },
];

const values = [
  { title: "Ambachtelijk", body: "Elke reparatie wordt met aandacht en de juiste tools uitgevoerd — geen haastwerk." },
  { title: "Eerlijk", body: "Geen verborgen kosten of onnodige reparaties. Wij vertellen u eerlijk wat er nodig is." },
  { title: "Lokaal", body: "Geboren en getogen in Haarlem. Wij kennen onze klanten bij naam." },
];

function OverOnsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Over ons"
        title="Uw lokale specialist"
        highlight="aan de Zijlweg."
        intro="Telefoon Wereld Haarlem is meer dan een reparatiewinkel. Het is een vertrouwd adres voor iedere Haarlemmer met een kapot scherm of trage laptop."
      />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-[40px] overflow-hidden shadow-[var(--shadow-lift)] border border-[color:var(--color-hairline)]">
            <img src={aboutShop} alt="Onze winkel aan de Zijlweg" width={1200} height={800} loading="lazy" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-[color:var(--color-hairline)]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-brand-600">{s.value}</div>
              <div className="mt-2 text-sm text-brand-900/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 prose prose-lg">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Het verhaal achter de winkel.</h2>
          <div className="space-y-6 text-brand-900/70 text-lg leading-relaxed">
            <p>
              Wat begon als een passie voor techniek aan de keukentafel, groeide uit tot een vertrouwd
              adres aan de Zijlweg. Wij geloven dat een kapotte telefoon geen reden hoeft te zijn voor
              stress — een goede reparateur lost het op terwijl u koffie drinkt.
            </p>
            <p>
              Onze technici werken alleen met originele en hoogwaardige onderdelen. Of het nu gaat om
              een gebarsten iPhone-scherm, een lege Samsung-batterij of een vloeistofschade aan uw
              MacBook — wij benaderen iedere reparatie met dezelfde precisie en zorg.
            </p>
            <p>
              Boven alles zijn wij Haarlemmers. Wij kennen onze buurt, onze klanten en onze
              verantwoordelijkheid. Daarom blijven mensen graag terugkomen.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Onze waarden</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Waar we voor staan.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={v.title} className="bg-brand-50/60 rounded-3xl p-8 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="size-12 bg-white rounded-xl grid place-items-center mb-6 text-brand-600 font-bold">{i + 1}</div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-brand-900/60 leading-relaxed text-[15px]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kom langs en maak kennis.</h2>
          <p className="mt-4 text-brand-900/60">Zijlweg 24, 2013 DH Haarlem.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/afspraak" className="px-7 py-3.5 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all">
              Plan reparatie
            </Link>
            <Link to="/contact" className="px-7 py-3.5 bg-white border border-[color:var(--color-hairline)] rounded-2xl font-semibold hover:bg-brand-50 transition-all">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}