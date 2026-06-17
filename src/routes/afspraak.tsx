import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { repairCatalog } from "@/lib/repairs-data";

const priceByLabel: Record<string, number> = Object.values(repairCatalog).reduce(
  (acc, r) => {
    acc[r.label] = r.from;
    return acc;
  },
  {} as Record<string, number>,
);

function priceFor(label: string | null): string | null {
  if (!label) return null;
  const v = priceByLabel[label];
  return typeof v === "number" ? `Vanaf €${v},-` : null;
}

type AfspraakSearch = {
  device?: string;
  brand?: string;
  model?: string;
  repair?: string;
};

export const Route = createFileRoute("/afspraak")({
  validateSearch: (search: Record<string, unknown>): AfspraakSearch => ({
    device: typeof search.device === "string" ? search.device : undefined,
    brand: typeof search.brand === "string" ? search.brand : undefined,
    model: typeof search.model === "string" ? search.model : undefined,
    repair: typeof search.repair === "string" ? search.repair : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Afspraak maken — Telefoon Wereld Haarlem" },
      { name: "description", content: "Plan in 60 seconden uw reparatieafspraak voor smartphone, tablet of laptop in Haarlem." },
      { property: "og:title", content: "Plan een reparatie — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Eenvoudig online een reparatieafspraak boeken." },
    ],
  }),
  component: AfspraakPage,
});

const devices = [
  "Smartphone",
  "Tablet",
  "Laptop",
  "MacBook",
  "Smartwatch",
  "Gameconsole",
  "Navigatiesysteem",
  "Anders",
] as const;
const brands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Oppo", "Huawei", "Sony", "Microsoft", "Anders"];
const repairsByDevice: Record<string, string[]> = {
  Smartphone: [
    "Scherm vervangen",
    "Batterij vervangen",
    "Oplaadpoort reparatie",
    "Camera reparatie",
    "Speaker reparatie",
    "Microfoon reparatie",
    "Achterkant vervangen",
    "Face ID reparatie",
    "Knoppen reparatie",
    "Waterschade behandeling",
    "Softwareprobleem oplossen",
    "Dataherstel",
    "Moederbord reparatie",
  ],
  Tablet: [
    "Scherm vervangen",
    "Batterij vervangen",
    "Oplaadpoort reparatie",
    "Camera reparatie",
    "Speaker reparatie",
    "Knoppen reparatie",
    "Softwareprobleem oplossen",
    "Waterschade behandeling",
  ],
  Laptop: [
    "Scherm vervangen",
    "Batterij vervangen",
    "Toetsenbord vervangen",
    "SSD of opslag upgrade",
    "Koeling en ventilator",
    "Oplaadpoort reparatie",
    "Softwareprobleem oplossen",
    "Waterschade behandeling",
    "Moederbord reparatie",
    "Dataherstel",
  ],
  MacBook: [
    "Scherm vervangen",
    "Batterij vervangen",
    "Toetsenbord vervangen",
    "SSD of opslag upgrade",
    "Koeling en ventilator",
    "Oplaadpoort reparatie",
    "Softwareprobleem oplossen",
    "Waterschade behandeling",
    "Moederbord reparatie",
    "Dataherstel",
  ],
  Smartwatch: ["Scherm vervangen", "Batterij vervangen", "Achterkant vervangen", "Knoppen reparatie", "Softwareprobleem oplossen"],
  Gameconsole: ["HDMI poort reparatie", "Controller of joystick reparatie", "Oplaadpoort reparatie", "Koeling en ventilator", "SSD of opslag upgrade", "Softwareprobleem oplossen"],
  Navigatiesysteem: ["Scherm vervangen", "Batterij vervangen", "Touchscreen probleem", "Softwareprobleem oplossen"],
  Anders: ["Algemene reparatie", "Diagnose"],
};

function AfspraakPage() {
  const search = Route.useSearch();
  const initialDevice = search.device && (devices as readonly string[]).includes(search.device) ? search.device : null;
  const initialBrand = search.brand ?? null;
  const initialModel = search.model ?? "";
  const initialRepair = search.repair ?? null;
  const initialStep = initialRepair
    ? 5
    : initialModel
    ? 4
    : initialBrand
    ? 3
    : initialDevice
    ? 2
    : 1;

  const [step, setStep] = useState(initialStep);
  const [device, setDevice] = useState<string | null>(initialDevice);
  const [brand, setBrand] = useState<string | null>(initialBrand);
  const [model, setModel] = useState(initialModel);
  const [repair, setRepair] = useState<string | null>(initialRepair);
  const [form, setForm] = useState({ naam: "", email: "", telefoon: "", opmerking: "" });
  const [done, setDone] = useState(false);

  const totalSteps = 5;
  const canNext =
    (step === 1 && device) ||
    (step === 2 && brand) ||
    (step === 3 && model) ||
    (step === 4 && repair) ||
    step === 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <SiteShell>
      <section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-6 text-center animate-fade-up">
          <span className="inline-block px-4 py-1.5 bg-white border border-[color:var(--color-hairline)] text-brand-600 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
            Afspraak maken
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Plan uw reparatie <span className="text-brand-500">in 60 seconden</span>.
          </h1>
          <p className="mt-4 text-brand-900/60 max-w-xl mx-auto">
            Vertel ons wat er aan de hand is. Wij bevestigen uw afspraak persoonlijk.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-[36px] shadow-[var(--shadow-lift)] p-8 sm:p-12 relative overflow-hidden border border-[color:var(--color-hairline)]">
            <div className="absolute -top-24 -right-24 size-72 bg-brand-500/10 blur-3xl rounded-full" />
            <div className="relative">
              {!done ? (
                <>
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex gap-2 w-full">
                      {Array.from({ length: totalSteps }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${i < step ? "bg-brand-500" : "bg-brand-100"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-4 text-xs font-mono text-brand-900/50 tabular-nums shrink-0">
                      {step}/{totalSteps}
                    </span>
                  </div>

                  {step === 1 && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">1. Wat voor apparaat?</p>
                      <div className="grid grid-cols-3 gap-3">
                        {devices.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setDevice(d)}
                            className={`p-6 rounded-2xl border-2 font-bold transition-all ${
                              device === d
                                ? "border-brand-500 bg-brand-50 text-brand-700"
                                : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">2. Kies uw merk</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {brands.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBrand(b)}
                            className={`h-16 rounded-xl font-medium transition-all border-2 ${
                              brand === b
                                ? "border-brand-500 bg-brand-50 text-brand-700"
                                : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">3. Welk model?</p>
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="bv. iPhone 14 Pro"
                        className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none text-lg font-medium transition-all"
                      />
                    </div>
                  )}

                  {step === 4 && device && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">4. Welke reparatie?</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {(repairsByDevice[device] ?? repairsByDevice.Anders).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRepair(r)}
                            className={`text-left px-5 py-4 rounded-2xl font-medium transition-all border-2 flex items-center justify-between gap-3 ${
                              repair === r
                                ? "border-brand-500 bg-brand-50 text-brand-700"
                                : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                            }`}
                          >
                            <span>{r}</span>
                            {priceFor(r) && (
                              <span className="text-xs font-semibold text-brand-600 whitespace-nowrap">
                                {priceFor(r)}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                      <p className="mt-4 text-xs text-brand-900/50">
                        Genoemde prijzen zijn indicatief. U ontvangt vooraf altijd een definitieve prijsopgave.
                      </p>
                    </div>
                  )}

                  {step === 5 && (
                    <form className="animate-fade-up space-y-4" onSubmit={handleSubmit}>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-2">5. Uw gegevens</p>
                      <input
                        type="text"
                        required
                        value={form.naam}
                        onChange={(e) => setForm({ ...form, naam: e.target.value })}
                        placeholder="Volledige naam"
                        className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all"
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="E-mailadres"
                          className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all"
                        />
                        <input
                          type="tel"
                          required
                          value={form.telefoon}
                          onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                          placeholder="Telefoonnummer"
                          className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      <textarea
                        rows={3}
                        value={form.opmerking}
                        onChange={(e) => setForm({ ...form, opmerking: e.target.value })}
                        placeholder="Aanvullende informatie (optioneel)"
                        className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none resize-none transition-all"
                      />

                      <div className="bg-brand-50 rounded-2xl p-5 text-sm space-y-1 text-brand-900/70">
                        <p><strong>Apparaat:</strong> {device}</p>
                        <p><strong>Merk:</strong> {brand}</p>
                        <p><strong>Model:</strong> {model}</p>
                        <p><strong>Reparatie:</strong> {repair}</p>
                        {priceFor(repair) && (
                          <p className="pt-2 mt-2 border-t border-brand-900/10">
                            <strong>Indicatieve prijs:</strong> {priceFor(repair)}
                            <span className="block text-xs text-brand-900/50 mt-1">
                              Definitieve prijs volgt na diagnose in de winkel.
                            </span>
                          </p>
                        )}
                      </div>
                    </form>
                  )}

                  {/* Nav buttons */}
                  <div className="mt-10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      disabled={step === 1}
                      className="px-5 py-3 rounded-2xl text-sm font-semibold text-brand-900/60 hover:text-brand-900 disabled:opacity-30"
                    >
                      ← Terug
                    </button>
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={() => canNext && setStep((s) => s + 1)}
                        disabled={!canNext}
                        className="px-7 py-3.5 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Volgende stap →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-7 py-3.5 bg-brand-500 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all"
                      >
                        Verstuur aanvraag
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 animate-fade-up">
                  <div className="size-16 mx-auto mb-6 rounded-full bg-brand-500 grid place-items-center text-white text-2xl">✓</div>
                  <h2 className="text-3xl font-bold tracking-tight">Bedankt, {form.naam.split(" ")[0] || "klant"}!</h2>
                  <p className="mt-3 text-brand-900/60 max-w-md mx-auto">
                    Wij nemen binnen één werkdag contact met u op om uw afspraak te bevestigen.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-brand-900/50">
            Liever bellen? <a href="tel:+31235517048" className="font-semibold text-brand-600">023 551 7048</a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}