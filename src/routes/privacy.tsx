import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacyverklaring — Telefoon Wereld Haarlem" },
      { name: "description", content: "Lees hoe Telefoon Wereld Haarlem omgaat met uw persoonsgegevens conform de AVG." },
      { property: "og:title", content: "Privacyverklaring — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Onze privacyverklaring conform de AVG." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Privacy" title="Privacy" highlight="verklaring." intro="Wij gaan zorgvuldig om met uw persoonsgegevens en houden ons aan de Algemene Verordening Gegevensbescherming (AVG)." />
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[color:var(--color-hairline)] prose-content space-y-8 text-brand-900/80 leading-relaxed">
            <p className="text-sm text-brand-900/50">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</p>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">1. Verwerkingsverantwoordelijke</h2>
              <p>
                Deze privacyverklaring is van toepassing op alle diensten van Telefoon Wereld Haarlem, gevestigd aan de Zijlweg 24, 2013 DH Haarlem.
                Voor vragen over deze verklaring kunt u contact opnemen via <a className="text-brand-600 font-semibold" href="tel:+31235517048">023 551 7048</a> of door langs te komen in onze winkel.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">2. Welke gegevens verzamelen wij?</h2>
              <p>Wij verzamelen uitsluitend gegevens die noodzakelijk zijn om uw aanvraag, reparatie of contactverzoek af te handelen:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Naam en voornaam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>Informatie over uw apparaat (merk, model, type reparatie)</li>
                <li>Aanvullende opmerkingen die u zelf invult</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">3. Waarom verwerken wij deze gegevens?</h2>
              <p>Wij gebruiken uw gegevens uitsluitend voor de volgende doeleinden:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Het inplannen en afhandelen van uw reparatieafspraak</li>
                <li>Het beantwoorden van uw contactverzoek of offerteaanvraag</li>
                <li>Het contact opnemen om uw aanvraag te bevestigen of toe te lichten</li>
                <li>Het voldoen aan wettelijke verplichtingen (zoals fiscale bewaarplicht)</li>
              </ul>
              <p className="mt-3">Wij gebruiken uw gegevens nooit voor marketingdoeleinden zonder uw uitdrukkelijke toestemming en delen ze niet met derden voor commerciële doeleinden.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">4. Rechtsgrond</h2>
              <p>Wij verwerken uw gegevens op basis van uw toestemming (door het versturen van een formulier), de uitvoering van een overeenkomst (reparatieopdracht) en wettelijke verplichtingen.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">5. Bewaartermijn</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contactformulieren: maximaal 12 maanden na laatste contact.</li>
                <li>Reparatie- en afspraakgegevens: 7 jaar in verband met de wettelijke fiscale bewaarplicht.</li>
                <li>Cookievoorkeuren: maximaal 12 maanden.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">6. Delen met derden</h2>
              <p>Uw gegevens worden alleen gedeeld met partijen die noodzakelijk zijn voor de uitvoering van onze dienst (bijvoorbeeld een verzendpartner bij retournering van een apparaat) of wanneer dit wettelijk verplicht is. Met deze partijen sluiten wij verwerkersovereenkomsten af.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">7. Beveiliging</h2>
              <p>Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies, misbruik en onbevoegde toegang.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">8. Uw rechten</h2>
              <p>U heeft recht op inzage, rectificatie, verwijdering, beperking, bezwaar en gegevensoverdraagbaarheid. U kunt deze rechten uitoefenen door contact met ons op te nemen. Wij reageren binnen 4 weken op uw verzoek.</p>
              <p className="mt-3">Daarnaast heeft u het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens via <a className="text-brand-600 font-semibold" href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noreferrer">autoriteitpersoonsgegevens.nl</a>.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">9. Cookies</h2>
              <p>Onze website gebruikt cookies. Lees ons <Link to="/cookies" className="text-brand-600 font-semibold">cookiebeleid</Link> voor meer informatie.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-3">10. Contact</h2>
              <p>
                Telefoon Wereld Haarlem<br />
                Zijlweg 24, 2013 DH Haarlem<br />
                Telefoon: <a className="text-brand-600 font-semibold" href="tel:+31235517048">023 551 7048</a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}