import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/voorwaarden")({
  head: () => ({
    meta: [
      { title: "Algemene voorwaarden — Telefoon Wereld Haarlem" },
      { name: "description", content: "Onze algemene voorwaarden voor reparaties, betalingen, garantie en aansprakelijkheid." },
      { property: "og:title", content: "Algemene voorwaarden — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Voorwaarden voor onze dienstverlening." },
    ],
  }),
  component: VoorwaardenPage,
});

function VoorwaardenPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Voorwaarden" title="Algemene" highlight="voorwaarden." intro="De voorwaarden die gelden voor reparaties, verkoop en overige diensten van Telefoon Wereld Haarlem." />
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[color:var(--color-hairline)] space-y-8 text-brand-900/80 leading-relaxed">
            <p className="text-sm text-brand-900/50">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</p>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 1 — Definities</h2>
              <p>In deze voorwaarden wordt verstaan onder "wij" of "ons": Telefoon Wereld Haarlem, gevestigd aan de Zijlweg 24, 2013 DH te Haarlem. Onder "klant" wordt verstaan: iedere natuurlijke of rechtspersoon die een opdracht aan ons verstrekt.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 2 — Toepasselijkheid</h2>
              <p>Deze voorwaarden zijn van toepassing op alle aanbiedingen, opdrachten en overeenkomsten tussen Telefoon Wereld Haarlem en de klant.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 3 — Offertes en prijzen</h2>
              <p>Genoemde prijzen op onze website en in communicatie zijn indicatief. De definitieve prijs wordt vastgesteld na diagnose in onze winkel en wordt voorafgaand aan de reparatie met de klant gecommuniceerd. Alle prijzen zijn inclusief btw, tenzij anders vermeld.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 4 — Reparatieopdracht</h2>
              <p>De klant verstrekt ons een opdracht tot reparatie op basis van de afgegeven prijsopgave. Indien tijdens de reparatie blijkt dat aanvullende werkzaamheden noodzakelijk zijn, nemen wij eerst contact op met de klant voor goedkeuring.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 5 — Betaling</h2>
              <p>Betaling vindt plaats bij oplevering van het apparaat, contant, per pin of via een vooraf overeengekomen betaalmethode. Bij niet-betaling behouden wij ons het recht voor het apparaat onder ons te houden tot volledige voldoening van de factuur.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 6 — Garantie</h2>
              <p>Op uitgevoerde reparaties geven wij standaard 3 maanden garantie op de vervangen onderdelen en het uitgevoerde werk, mits het apparaat normaal wordt gebruikt. De garantie vervalt bij val-, vocht- of waterschade die na de reparatie ontstaat, bij eigen ingrepen of bij reparaties door derden.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 7 — Aansprakelijkheid</h2>
              <p>Telefoon Wereld Haarlem spant zich in om reparaties zorgvuldig uit te voeren. Wij zijn niet aansprakelijk voor verlies van data; de klant is zelf verantwoordelijk voor het maken van een back-up vóór het inleveren van het apparaat. Onze aansprakelijkheid is in alle gevallen beperkt tot maximaal het factuurbedrag van de betreffende reparatie.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 8 — Niet-afgehaalde apparaten</h2>
              <p>Indien een gerepareerd apparaat niet binnen 90 dagen na bericht van gereedheid wordt afgehaald, behouden wij ons het recht voor het apparaat te verkopen ter dekking van de gemaakte kosten, conform artikel 7:609 BW.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 9 — Herroepingsrecht</h2>
              <p>Reparatiediensten worden uitgevoerd na uitdrukkelijke instemming van de klant. Conform artikel 6:230p BW vervalt het herroepingsrecht zodra de reparatie is gestart.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 10 — Privacy</h2>
              <p>Op alle persoonsgegevens die wij verwerken is onze privacyverklaring van toepassing.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">Artikel 11 — Toepasselijk recht</h2>
              <p>Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Noord-Holland.</p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}