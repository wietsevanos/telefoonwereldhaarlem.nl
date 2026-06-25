import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/pakketpunt")({
  head: () => ({
    meta: [
      { title: "Pakketpunt — Telefoon Wereld Haarlem" },
      { name: "description", content: "Pakketten ophalen en versturen aan de Zijlweg in Haarlem — tijdens onze openingstijden." },
      { property: "og:title", content: "Pakketpunt — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Snel pakketten halen en brengen in Haarlem." },
    ],
  }),
  component: PakketpuntPage,
});

function PakketpuntPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pakketpunt"
        title="Pakketten halen en"
        highlight="brengen in Haarlem."
        intro="Onze winkel is officieel DHL pakketpunt. Loop binnen tijdens openingstijden, zonder wachtrij en met persoonlijke service."
      />

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-[color:var(--color-hairline)]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Ophalen</span>
            <h3 className="mt-3 text-2xl font-bold">Uw pakket afhalen</h3>
            <p className="mt-3 text-brand-900/60 leading-relaxed">Neem uw afhaalcode en een geldig legitimatiebewijs mee. Wij overhandigen uw pakket binnen één minuut.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-[color:var(--color-hairline)]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Versturen</span>
            <h3 className="mt-3 text-2xl font-bold">Pakket verzenden</h3>
            <p className="mt-3 text-brand-900/60 leading-relaxed">Met of zonder verzendlabel, wij scannen uw pakket in en u krijgt direct een verzendbewijs.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-[color:var(--color-hairline)]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-center">Openingstijden pakketpunt</h2>
          <ul className="bg-brand-50/60 rounded-3xl p-6 space-y-2 text-[15px] max-w-md mx-auto">
            <li className="flex justify-between"><span>Maandag</span><span className="tabular-nums">10:00 – 18:00</span></li>
            <li className="flex justify-between"><span>Dinsdag t/m Vrijdag</span><span className="tabular-nums">09:30 – 18:00</span></li>
            <li className="flex justify-between"><span>Zaterdag</span><span className="tabular-nums">10:00 – 17:00</span></li>
            <li className="flex justify-between text-brand-900/40"><span>Zondag</span><span>Gesloten</span></li>
          </ul>
          <div className="text-center mt-10">
            <Link to="/contact" className="px-7 py-3.5 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all inline-block">
              Bekijk route & contact
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}