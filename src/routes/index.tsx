import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import heroPhone from "@/assets/hero-phone.jpg";
import repairScreen from "@/assets/repair-screen.jpg";
import repairBattery from "@/assets/repair-battery.jpg";
import repairSamsung from "@/assets/repair-samsung.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Telefoon Wereld Haarlem — Premium telefoonreparaties in Haarlem" },
      { name: "description", content: "Snelle, eerlijke en professionele smartphone-, tablet- en laptopreparaties aan de Zijlweg in Haarlem. Klaar terwijl u wacht." },
      { property: "og:title", content: "Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Premium telefoonreparaties in het hart van Haarlem." },
    ],
  }),
  component: Home,
});

const reasons = [
  { title: "Snelle reparaties", body: "De meeste reparaties zijn binnen 30 minuten klaar terwijl u geniet van een kop koffie." },
  { title: "Ervaren specialisten", body: "Gecertificeerde technici met jarenlange ervaring in alle grote merken." },
  { title: "Eerlijke prijzen", body: "Geen verborgen kosten. We communiceren de exacte reparatieprijs altijd vooraf." },
  { title: "Lokale service", body: "Uw vertrouwde tech-buurman aan de Zijlweg in Haarlem." },
];

const popularRepairs = [
  { name: "iPhone scherm vervangen", price: "Vanaf €89,-", image: repairScreen, desc: "Originele kwaliteit OLED of LCD schermen." },
  { name: "iPhone batterij vervangen", price: "Vanaf €49,-", image: repairBattery, desc: "Nieuwe batterij voor een hele dag gebruik." },
  { name: "Samsung scherm reparatie", price: "Vanaf €119,-", image: repairSamsung, desc: "Originele Samsung onderdelen voor een perfect resultaat." },
  { name: "Samsung batterij vervangen", price: "Vanaf €59,-", image: repairBattery, desc: "Direct weer een volle dag accu." },
  { name: "Oplaadpoort reparatie", price: "Vanaf €45,-", image: repairScreen, desc: "Slechte verbinding of niet meer opladen? Snel verholpen." },
  { name: "Waterschade herstel", price: "Op offerte", image: repairBattery, desc: "Ultrasone reiniging, 85% wordt succesvol hersteld." },
];

const steps = [
  { n: "01", title: "Maak afspraak", body: "Kies je toestel en tijdstip in onze online planner of bel ons direct." },
  { n: "02", title: "Breng toestel langs", body: "Kom langs aan de Zijlweg 24 in Haarlem, zonder wachttijd." },
  { n: "03", title: "Wij repareren", body: "Onze technici fixen je toestel met uiterste precisie en originele onderdelen." },
  { n: "04", title: "Weer als nieuw", body: "Getest, gecontroleerd en klaar. Inclusief garantie op de reparatie." },
];

const reviews = [
  { quote: "Binnen 25 minuten een nieuw scherm. Top service, vriendelijke uitleg.", name: "Sanne M.", role: "Haarlem" },
  { quote: "Eerlijke prijs en heldere communicatie. Geen verrassingen achteraf.", name: "Daan K.", role: "Overveen" },
  { quote: "Mijn iPhone deed het weer alsof er niets was gebeurd. Aanrader.", name: "Mira V.", role: "Heemstede" },
];

const repairBrands = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "Xiaomi",
  "Oppo",
  "Huawei",
  "Sony",
  "Microsoft",
  "Nintendo",
  "Honor",
  "Motorola",
];

function Home() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative pt-12 lg:pt-20 pb-24 overflow-hidden">
        <div className="absolute -top-32 -left-40 size-[600px] bg-brand-200/40 blur-3xl rounded-full -z-10" />
        <div className="absolute top-40 right-0 size-[500px] bg-brand-400/20 blur-3xl rounded-full -z-10 animate-glow-pulse" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[color:var(--color-hairline)] text-brand-600 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              Vandaag geopend · Haarlem
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
              Telefoon kapot?{" "}
              <span className="text-brand-500">Binnen no-time weer als nieuw.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-brand-900/60 max-w-lg leading-relaxed">
              Professionele smartphone, tablet en laptop reparaties in het hart van Haarlem.
              Klaar terwijl u wacht, met de hoogste kwaliteit onderdelen.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/afspraak"
                className="px-8 py-4 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all hover:shadow-[var(--shadow-glow)] active:scale-95"
              >
                Maak afspraak
              </Link>
              <Link
                to="/reparaties"
                className="px-8 py-4 bg-white border border-[color:var(--color-hairline)] rounded-2xl font-semibold hover:bg-brand-50 transition-all active:scale-95"
              >
                Bekijk reparaties
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-6 text-sm text-brand-900/60">
              <div className="flex items-center gap-1.5">
                <span className="text-brand-500 text-lg">★★★★★</span>
                <span className="font-semibold text-brand-900">4,8</span>
              </div>
              <span className="h-4 w-px bg-brand-900/15" />
              <span>500+ tevreden klanten in Haarlem</span>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="absolute -inset-12 bg-brand-500/15 blur-3xl rounded-full" />
            <div className="relative rounded-[40px] overflow-hidden bg-white shadow-[var(--shadow-lift)] border border-[color:var(--color-hairline)] animate-float-soft">
              <img
                src={heroPhone}
                alt="Premium smartphone weergave"
                width={1024}
                height={1024}
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-xl rounded-2xl px-5 py-4 border border-[color:var(--color-hairline)] shadow-[var(--shadow-soft)] hidden md:block">
              <div className="text-2xl font-bold text-brand-600">30 min</div>
              <div className="text-xs text-brand-900/60 uppercase tracking-wider mt-0.5">Gemiddelde reparatietijd</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Waarom Telefoon Wereld</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Vertrouwd, snel en zonder verrassingen.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {reasons.map((r, i) => (
              <div key={r.title} className="group animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="size-12 bg-brand-50 rounded-xl grid place-items-center mb-6 group-hover:bg-brand-500 transition-colors">
                  <span className="size-5 rounded-md border-2 border-brand-500 group-hover:border-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-brand-900/60 leading-relaxed text-[15px]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR REPAIRS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-14">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Populair</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Onze meest gevraagde reparaties</h2>
              <p className="mt-3 text-brand-900/60 max-w-xl">Snel, transparant geprijsd, en uitgevoerd door specialisten.</p>
            </div>
            <Link to="/reparaties" className="text-brand-600 font-semibold underline underline-offset-8 hover:gap-3 flex items-center gap-2 transition-all">
              Bekijk alle reparaties <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularRepairs.map((r, i) => (
              <Link
                key={r.name}
                to="/afspraak"
                className="group bg-white p-6 rounded-[28px] border border-[color:var(--color-hairline)] hover:border-brand-500/30 hover:shadow-[var(--shadow-lift)] transition-all animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="mb-6 overflow-hidden rounded-2xl bg-brand-50">
                  <img
                    src={r.image}
                    alt={r.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-lg font-bold mb-2">{r.name}</h4>
                <p className="text-brand-900/60 text-sm mb-5">{r.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-600 text-sm">{r.price}</span>
                  <span className="size-9 bg-brand-50 rounded-full grid place-items-center group-hover:bg-brand-900 group-hover:text-white transition-all">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-white border-y border-[color:var(--color-hairline)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Hoe werkt het</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Een reparatie regelen in vier stappen.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((s, i) => (
              <div key={s.n} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-5xl font-bold text-brand-100 tabular-nums leading-none mb-6">{s.n}</div>
                <h4 className="text-lg font-bold mb-3">{s.title}</h4>
                <p className="text-brand-900/60 text-[15px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS WE REPAIR */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Merken</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Wij repareren elk groot merk.
            </h2>
            <p className="mt-3 text-brand-900/60">
              Van Apple en Samsung tot Google, Sony en alles ertussenin. Staat uw merk er niet bij? Loop gerust binnen of bel ons.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[color:var(--color-hairline)] rounded-3xl overflow-hidden border border-[color:var(--color-hairline)]">
            {repairBrands.map((b) => (
              <div
                key={b}
                className="bg-white aspect-[3/2] grid place-items-center text-brand-900/70 font-semibold tracking-tight text-lg hover:bg-brand-50 transition-colors"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Klanten</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                Wat klanten over ons zeggen.
              </h2>
              <div className="mt-8 inline-flex items-center gap-4 p-4 bg-white rounded-2xl border border-[color:var(--color-hairline)]">
                <svg viewBox="0 0 48 48" className="size-10 shrink-0" aria-hidden>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tabular-nums">4,8</span>
                    <span className="text-brand-500 text-base">★★★★★</span>
                  </div>
                  <p className="text-xs text-brand-900/60 mt-0.5">Google reviews · 500+ beoordelingen</p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {reviews.map((r, i) => (
                <figure
                  key={r.name}
                  className="bg-white rounded-3xl p-6 border border-[color:var(--color-hairline)] animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="text-brand-500 mb-4">★★★★★</div>
                  <blockquote className="text-brand-900/80 text-[15px] leading-relaxed">"{r.quote}"</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-brand-900/50 text-xs">{r.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] bg-brand-900 px-8 sm:px-14 py-16 text-center text-white shadow-[var(--shadow-lift)]">
            <div className="absolute -top-40 -right-20 size-[400px] bg-brand-500/30 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto text-balance">
                Klaar om uw toestel te laten herstellen?
              </h2>
              <p className="mt-5 text-white/70 max-w-xl mx-auto">
                Plan binnen 60 seconden een afspraak. Kom langs aan de Zijlweg 24 in Haarlem.
              </p>
              <Link
                to="/afspraak"
                className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-900 rounded-2xl font-semibold hover:bg-brand-50 transition-all active:scale-95"
              >
                Plan direct uw reparatie <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
