import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import popIphoneScreen from "@/assets/popular-9.png.asset.json";
import popIphoneBattery from "@/assets/popular-10.png.asset.json";
import popSamsungScreen from "@/assets/popular-11.png.asset.json";
import popSamsungBattery from "@/assets/popular-12.png.asset.json";
import popChargePort from "@/assets/popular-13.png.asset.json";
import popWater from "@/assets/popular-14.png.asset.json";
import brandApple from "@/assets/brands/apple.png.asset.json";
import brandSamsung from "@/assets/brands/samsung.png.asset.json";
import brandGoogle from "@/assets/brands/google.png.asset.json";
import brandOnePlus from "@/assets/brands/oneplus.png.asset.json";
import brandXiaomi from "@/assets/brands/xiaomi.png.asset.json";
import brandOppo from "@/assets/brands/oppo.png.asset.json";
import brandHuawei from "@/assets/brands/huawei.png.asset.json";
import brandSony from "@/assets/brands/sony.png.asset.json";
import brandMicrosoft from "@/assets/brands/microsoft.png.asset.json";
import brandNintendo from "@/assets/brands/nintendo.png.asset.json";
import brandHonor from "@/assets/brands/honor.png.asset.json";
import brandDell from "@/assets/brands/dell.png.asset.json";

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
  { name: "iPhone scherm vervangen", price: "Vanaf €89,-", image: popIphoneScreen.url, desc: "Originele kwaliteit OLED of LCD schermen." },
  { name: "iPhone batterij vervangen", price: "Vanaf €49,-", image: popIphoneBattery.url, desc: "Nieuwe batterij voor een hele dag gebruik." },
  { name: "Samsung scherm reparatie", price: "Vanaf €119,-", image: popSamsungScreen.url, desc: "Originele Samsung onderdelen voor een perfect resultaat." },
  { name: "Samsung batterij vervangen", price: "Vanaf €59,-", image: popSamsungBattery.url, desc: "Direct weer een volle dag accu." },
  { name: "Oplaadpoort reparatie", price: "Vanaf €45,-", image: popChargePort.url, desc: "Slechte verbinding of niet meer opladen? Snel verholpen." },
  { name: "Waterschade herstel", price: "Op offerte", image: popWater.url, desc: "Ultrasone reiniging, 85% wordt succesvol hersteld." },
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
  { name: "Apple", logo: brandApple.url },
  { name: "Samsung", logo: brandSamsung.url },
  { name: "Google", logo: brandGoogle.url },
  { name: "OnePlus", logo: brandOnePlus.url },
  { name: "Xiaomi", logo: brandXiaomi.url },
  { name: "Oppo", logo: brandOppo.url },
  { name: "Huawei", logo: brandHuawei.url },
  { name: "Sony", logo: brandSony.url },
  { name: "Microsoft", logo: brandMicrosoft.url },
  { name: "Nintendo", logo: brandNintendo.url },
  { name: "Honor", logo: brandHonor.url },
  { name: "Dell", logo: brandDell.url },
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
            <div className="mt-10 flex gap-2 sm:gap-3">
              <Link
                to="/afspraak"
                className="px-5 py-3 sm:px-8 sm:py-4 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all hover:shadow-[var(--shadow-glow)] active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                Maak afspraak
              </Link>
              <Link
                to="/reparaties"
                className="px-5 py-3 sm:px-8 sm:py-4 bg-white border border-[color:var(--color-hairline)] rounded-2xl font-semibold hover:bg-brand-50 transition-all active:scale-95 text-sm sm:text-base whitespace-nowrap"
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
            <div className="relative rounded-[40px] overflow-hidden bg-transparent shadow-[var(--shadow-lift)] border border-[color:var(--color-hairline)] animate-float-soft aspect-square">
              <iframe
                title="iphone 17 pro max silver"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking=""
                execution-while-out-of-viewport=""
                execution-while-not-rendered=""
                web-share=""
                src="https://sketchfab.com/models/9dbfe0d846f341bf9fc501a854f5de1a/embed?autospin=1&camera=0&transparent=1"
                className="w-full h-full"
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
                key={b.name}
                className="bg-white aspect-[3/2] grid place-items-center p-4 sm:p-6 hover:bg-brand-50 transition-colors"
              >
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  className="max-h-8 sm:max-h-10 max-w-[80%] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-14 md:py-20 bg-brand-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-white border border-[color:var(--color-hairline)] rounded-[28px] md:rounded-[36px] shadow-[var(--shadow-soft)] overflow-hidden flex flex-col md:flex-row items-stretch">
            {/* Static branding & score */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-row md:flex-col gap-5 md:gap-6 md:w-[34%] shrink-0 border-b md:border-b-0 md:border-r border-[color:var(--color-hairline)] bg-white relative z-10 items-center md:items-start">
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">Klanten</span>
                <h2 className="mt-2 md:mt-3 text-xl md:text-2xl lg:text-[26px] font-semibold tracking-tight leading-tight truncate">
                  Wat klanten over ons zeggen.
                </h2>
              </div>
              <div className="flex items-center gap-3 md:gap-4 ml-auto md:ml-0 shrink-0">
                <div className="flex items-center justify-center size-10 md:size-12 rounded-2xl bg-brand-50 border border-[color:var(--color-hairline)] shadow-sm shrink-0">
                  <svg viewBox="0 0 24 24" className="size-5 md:size-6" aria-hidden>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-xl font-bold text-brand-900 tabular-nums">4,8</span>
                    <span className="text-[#fbbc05] text-sm md:text-base tracking-tight">★★★★★</span>
                  </div>
                  <p className="text-xs md:text-[13px] text-brand-900/60 font-medium mt-0.5">500+ Google beoordelingen</p>
                </div>
              </div>
            </div>

            {/* Marquee */}
            <div className="relative flex-1 overflow-hidden h-[190px] md:h-[240px] flex items-center bg-brand-50/30">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10" />

              <div className="flex w-max animate-marquee-x hover:[animation-play-state:paused]">
                {[...reviews, ...reviews, ...reviews].map((r, i) => {
                  const initials = r.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <figure
                      key={`${r.name}-${i}`}
                      className="w-[280px] md:w-80 mx-2 md:mx-3 p-5 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[color:var(--color-hairline)] shadow-[0_4px_12px_rgba(15,23,42,0.03)] flex flex-col justify-between h-[150px] md:h-[180px] shrink-0"
                    >
                      <blockquote className="text-[13px] md:text-[14px] leading-relaxed text-brand-900/70">
                        "{r.quote}"
                      </blockquote>
                      <figcaption className="flex items-center gap-3">
                        <div className="size-8 md:size-9 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xs md:text-sm">
                          {initials}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-brand-900">{r.name}</div>
                          <div className="text-xs text-brand-900/45">{r.role}</div>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
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
