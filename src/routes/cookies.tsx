import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { openCookiePreferences } from "@/components/site/CookieBanner";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookiebeleid — Telefoon Wereld Haarlem" },
      { name: "description", content: "Informatie over de cookies die wij gebruiken en hoe u uw voorkeuren kunt beheren." },
      { property: "og:title", content: "Cookiebeleid — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Welke cookies wij gebruiken en hoe u ze beheert." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Cookies" title="Cookie" highlight="beleid." intro="Een overzicht van welke cookies wij gebruiken, waarvoor ze dienen en hoe u uw voorkeuren beheert." />
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[color:var(--color-hairline)] space-y-8 text-brand-900/80 leading-relaxed">
            <p className="text-sm text-brand-900/50">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</p>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Wat zijn cookies?</h2>
              <p>Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u onze website bezoekt. Ze helpen ons de website goed te laten functioneren en, met uw toestemming, om het gebruik te analyseren.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Welke cookies gebruiken wij?</h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-brand-50/60 p-5">
                  <p className="font-semibold text-brand-900">Functionele cookies (altijd actief)</p>
                  <p className="text-sm mt-1">Noodzakelijk voor het functioneren van de website. Hieronder valt onder andere het onthouden van uw cookievoorkeuren.</p>
                </div>
                <div className="rounded-2xl bg-brand-50/60 p-5">
                  <p className="font-semibold text-brand-900">Analytische cookies (optioneel)</p>
                  <p className="text-sm mt-1">Helpen ons inzicht te krijgen in het gebruik van onze website, zodat wij deze kunnen verbeteren. Deze worden pas geplaatst na uw toestemming.</p>
                </div>
                <div className="rounded-2xl bg-brand-50/60 p-5">
                  <p className="font-semibold text-brand-900">Marketingcookies (optioneel)</p>
                  <p className="text-sm mt-1">Worden gebruikt om relevante advertenties te tonen op andere websites. Deze worden uitsluitend geplaatst met uw toestemming.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Toestemming en voorkeuren beheren</h2>
              <p>Bij uw eerste bezoek vragen wij u toestemming voor het plaatsen van niet-noodzakelijke cookies. U kunt uw voorkeuren op elk moment wijzigen via onderstaande knop.</p>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all text-sm"
              >
                Cookievoorkeuren wijzigen
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Cookies verwijderen via uw browser</h2>
              <p>U kunt cookies ook verwijderen of blokkeren via de instellingen van uw browser. Houd er rekening mee dat sommige onderdelen van de website hierdoor mogelijk niet goed werken.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Meer informatie</h2>
              <p>Lees ook onze <Link to="/privacy" className="text-brand-600 font-semibold">privacyverklaring</Link> voor meer informatie over hoe wij omgaan met uw gegevens.</p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}