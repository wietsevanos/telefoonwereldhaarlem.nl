import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { repairCatalog, categories, type Brand, type Category } from "@/lib/repairs-data";
import { supabase } from "@/integrations/supabase/client";

function priceFor(label: string | null): string | null {
  if (!label) return null;
  const entry = Object.values(repairCatalog).find((r) => r.label === label);
  return entry ? `Vanaf €${entry.from},-` : null;
}

// Openingstijden: ma–vr 10:00–18:00, za 10:00–17:00, zo gesloten. Slots van 30 min.
function slotsForDate(date: Date): Date[] {
  const dow = date.getDay(); // 0 = zo
  if (dow === 0) return [];
  const endHour = dow === 6 ? 17 : 18;
  const out: Date[] = [];
  for (let h = 10; h < endHour; h++) {
    for (const m of [0, 30]) {
      out.push(new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, 0, 0));
    }
  }
  return out;
}

function nextDays(count: number): Date[] {
  const out: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let i = 0;
  while (out.length < count) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    if (d.getDay() !== 0) out.push(d); // skip zondag
    i++;
  }
  return out;
}

function fmtDay(d: Date): string {
  return d.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
}
function fmtTime(d: Date): string {
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}
function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// .ics-bestand in de browser genereren, zodat we geen server-endpoint nodig hebben.
function toICSStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function buildCalendarLinks(slot: Date, title: string, details: string) {
  const end = new Date(slot.getTime() + 30 * 60 * 1000);
  const location = "Telefoon Wereld Haarlem, Generaal Cronjéstraat, Haarlem";
  const dates = `${toICSStamp(slot)}/${toICSStamp(end)}`;
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Telefoon Wereld Haarlem//Afspraak//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${toICSStamp(slot)}-${Math.random().toString(36).slice(2, 10)}@telefoonwereldhaarlem`,
    `DTSTAMP:${toICSStamp(new Date())}`,
    `DTSTART:${toICSStamp(slot)}`,
    `DTEND:${toICSStamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const icsUrl = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  return { google, icsUrl };
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

function AfspraakPage() {
  const search = Route.useSearch();
  const initialCategory = search.device
    ? categories.find((c) => c.device === search.device || c.label === search.device || c.id === search.device) ?? null
    : null;
  const initialBrand = initialCategory && search.brand
    ? initialCategory.brands.find((b) => b.name === search.brand) ?? null
    : null;
  const initialModel = initialBrand && search.model && initialBrand.models.includes(search.model)
    ? search.model
    : null;
  const initialRepair = search.repair ?? null;
  const initialStep = initialRepair
    ? 5
    : initialModel
    ? 4
    : initialBrand
    ? 3
    : initialCategory
    ? 2
    : 1;

  const [step, setStep] = useState(initialStep);
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [brand, setBrand] = useState<Brand | null>(initialBrand);
  const [model, setModel] = useState<string | null>(initialModel);
  const [repair, setRepair] = useState<string | null>(initialRepair);
  const days = useMemo(() => nextDays(14), []);
  const [selectedDay, setSelectedDay] = useState<Date>(days[0]);
  const [slot, setSlot] = useState<Date | null>(null);
  const [taken, setTaken] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ naam: "", email: "", telefoon: "", opmerking: "" });
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 6;
  const canNext =
    (step === 1 && category) ||
    (step === 2 && brand) ||
    (step === 3 && model) ||
    (step === 4 && repair) ||
    (step === 5 && slot) ||
    step === 6;

  // Bezette slots ophalen voor de geselecteerde dag
  useEffect(() => {
    if (step !== 5) return;
    const from = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate(), 0, 0, 0);
    const to = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate(), 23, 59, 59);
    setLoadingSlots(true);
    (supabase as unknown as {
      from: (t: string) => {
        select: (c: string) => {
          gte: (c: string, v: string) => {
            lte: (c: string, v: string) => Promise<{ data: { slot_at: string }[] | null }>;
          };
        };
      };
    })
      .from("bookings")
      .select("slot_at")
      .gte("slot_at", from.toISOString())
      .lte("slot_at", to.toISOString())
      .then(({ data }) => {
        setTaken(new Set((data ?? []).map((r) => new Date(r.slot_at).toISOString())));
      })
      .catch(() => setTaken(new Set()))
      .finally(() => setLoadingSlots(false));
  }, [step, selectedDay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree || !slot) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        slot_at: slot.toISOString(),
        naam: form.naam,
        email: form.email,
        telefoon: form.telefoon,
        apparaat: category?.device ?? null,
        merk: brand?.name ?? null,
        model: model ?? null,
        reparatie: repair ?? "",
        prijs: priceFor(repair),
        opmerking: form.opmerking || null,
      };
      // 1) Boeking opslaan — uniciteit op slot_at voorkomt dubbele boekingen.
      const { error: insertError } = await (
        supabase as unknown as { from: (t: string) => { insert: (r: unknown) => Promise<{ error: { code?: string } | null }> } }
      )
        .from("bookings")
        .insert(payload);
      if (insertError) {
        if ((insertError as { code?: string }).code === "23505") {
          setError("Dit tijdslot is zojuist bezet geraakt. Kies een ander moment.");
          setTaken((prev) => new Set([...prev, slot.toISOString()]));
          setSlot(null);
          setStep(5);
          return;
        }
        throw new Error("insert failed");
      }
      // 2) Mails versturen via edge function (niet-fataal als het faalt — boeking staat al vast).
      try {
        await supabase.functions.invoke("send-afspraak", {
          body: {
            device: category?.device,
            brand: brand?.name,
            model,
            repair,
            price: priceFor(repair),
            slot_at: slot.toISOString(),
            naam: form.naam,
            email: form.email,
            telefoon: form.telefoon,
            opmerking: form.opmerking,
          },
        });
      } catch (mailErr) {
        console.error("send-afspraak invoke failed", mailErr);
      }
      setDone(true);
    } catch {
      setError("Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons.");
    } finally {
      setSubmitting(false);
    }
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
          <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-[var(--shadow-lift)] p-6 sm:p-12 relative overflow-hidden border border-[color:var(--color-hairline)]">
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                        {categories.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setCategory(c);
                              setBrand(null);
                              setModel(null);
                              setRepair(null);
                            }}
                            className={`px-3 py-4 sm:p-6 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all text-center break-words ${
                              category?.id === c.id
                                ? "border-brand-500 bg-brand-50 text-brand-700"
                                : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && category && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">2. Kies uw merk</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {category.brands.map((b) => (
                          <button
                            key={b.name}
                            type="button"
                            onClick={() => {
                              setBrand(b);
                              setModel(null);
                              setRepair(null);
                            }}
                            className={`h-16 rounded-xl font-medium transition-all border-2 ${
                              brand?.name === b.name
                                ? "border-brand-500 bg-brand-50 text-brand-700"
                                : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                            }`}
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && brand && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">3. Welk model?</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                        {brand.models.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setModel(m)}
                            className={`px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                              model === m
                                ? "border-brand-500 bg-brand-50 text-brand-700"
                                : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && brand && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">4. Welke reparatie?</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {brand.repairs.map((key) => {
                          const r = repairCatalog[key];
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setRepair(r.label)}
                              className={`text-left px-5 py-4 rounded-2xl font-medium transition-all border-2 flex items-center justify-between gap-3 ${
                                repair === r.label
                                  ? "border-brand-500 bg-brand-50 text-brand-700"
                                  : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                              }`}
                            >
                              <span>{r.label}</span>
                              <span className="text-xs font-semibold text-brand-600 whitespace-nowrap">
                                Vanaf €{r.from},-
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-4 text-xs text-brand-900/50">
                        Genoemde prijzen zijn indicatief. U ontvangt vooraf altijd een definitieve prijsopgave.
                      </p>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="animate-fade-up">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-4">5. Kies datum & tijd</p>
                      <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 snap-x">
                        {days.map((d) => {
                          const active = sameDay(d, selectedDay);
                          return (
                            <button
                              key={d.toISOString()}
                              type="button"
                              onClick={() => { setSelectedDay(d); setSlot(null); }}
                              className={`shrink-0 snap-start px-4 py-3 rounded-xl border-2 text-center min-w-[88px] transition-all ${
                                active
                                  ? "border-brand-500 bg-brand-50 text-brand-700"
                                  : "border-transparent bg-brand-50/60 hover:bg-brand-50"
                              }`}
                            >
                              <span className="block text-xs font-semibold capitalize">{fmtDay(d)}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-5">
                        {(() => {
                          const all = slotsForDate(selectedDay);
                          const now = Date.now();
                          const future = all.filter((s) => s.getTime() > now + 30 * 60 * 1000);
                          if (future.length === 0) {
                            return <p className="text-sm text-brand-900/60">Geen beschikbare tijden meer op deze dag.</p>;
                          }
                          return (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                              {future.map((s) => {
                                const iso = s.toISOString();
                                const isTaken = taken.has(iso);
                                const isSelected = slot && slot.getTime() === s.getTime();
                                return (
                                  <button
                                    key={iso}
                                    type="button"
                                    disabled={isTaken}
                                    onClick={() => setSlot(s)}
                                    className={`px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                                      isTaken
                                        ? "border-transparent bg-brand-50/40 text-brand-900/30 line-through cursor-not-allowed"
                                        : isSelected
                                        ? "border-brand-500 bg-brand-50 text-brand-700"
                                        : "border-transparent bg-brand-50/60 hover:bg-brand-50 text-brand-900"
                                    }`}
                                    title={isTaken ? "Bezet" : ""}
                                  >
                                    {fmtTime(s)}
                                  </button>
                                );
                              })}
                            </div>
                          );
                        })()}
                        {loadingSlots && (
                          <p className="mt-3 text-xs text-brand-900/40">Beschikbaarheid laden…</p>
                        )}
                        <p className="mt-4 text-xs text-brand-900/50">
                          Tijden met een streep zijn al door iemand anders geboekt.
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <form className="animate-fade-up space-y-4" onSubmit={handleSubmit}>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-2">6. Uw gegevens</p>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={form.naam}
                        onChange={(e) => setForm({ ...form, naam: e.target.value })}
                        placeholder="Volledige naam"
                        className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all"
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="email"
                          required
                          maxLength={255}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="E-mailadres"
                          className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all"
                        />
                        <input
                          type="tel"
                          required
                          maxLength={20}
                          value={form.telefoon}
                          onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                          placeholder="Telefoonnummer"
                          className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={form.opmerking}
                        onChange={(e) => setForm({ ...form, opmerking: e.target.value })}
                        placeholder="Aanvullende informatie (optioneel)"
                        className="w-full px-5 py-4 rounded-2xl bg-brand-50/60 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none resize-none transition-all"
                      />

                      <div className="bg-brand-50 rounded-2xl p-5 text-sm space-y-1 text-brand-900/70">
                        <p><strong>Apparaat:</strong> {category?.label}</p>
                        <p><strong>Merk:</strong> {brand?.name}</p>
                        <p><strong>Model:</strong> {model}</p>
                        <p><strong>Reparatie:</strong> {repair}</p>
                        {slot && (
                          <p><strong>Datum & tijd:</strong> {fmtDay(slot)} om {fmtTime(slot)}</p>
                        )}
                        {priceFor(repair) && (
                          <p className="pt-2 mt-2 border-t border-brand-900/10">
                            <strong>Indicatieve prijs:</strong> {priceFor(repair)}
                            <span className="block text-xs text-brand-900/50 mt-1">
                              Definitieve prijs volgt na diagnose in de winkel.
                            </span>
                          </p>
                        )}
                      </div>

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
                          <Link to="/privacy" className="text-brand-600 font-semibold underline">privacyverklaring</Link>. Mijn gegevens worden uitsluitend gebruikt voor het afhandelen van deze reparatieaanvraag.
                        </span>
                      </label>
                      {error && (
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                      )}
                    </form>
                  )}

                  {/* Nav buttons */}
                  <div className="mt-8 sm:mt-10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      disabled={step === 1}
                      className="px-3 sm:px-5 py-3 rounded-2xl text-sm font-semibold text-brand-900/60 hover:text-brand-900 disabled:opacity-30 whitespace-nowrap"
                    >
                      ← Terug
                    </button>
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={() => canNext && setStep((s) => s + 1)}
                        disabled={!canNext}
                        className="px-5 sm:px-7 py-3 sm:py-3.5 bg-brand-900 text-white rounded-2xl font-semibold text-sm sm:text-base hover:bg-brand-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        Volgende stap →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!agree || submitting}
                        className="px-5 sm:px-7 py-3 sm:py-3.5 bg-brand-500 text-white rounded-2xl font-semibold text-sm sm:text-base hover:bg-brand-600 transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Versturen…" : "Verstuur aanvraag"}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 animate-fade-up">
                  <div className="size-16 mx-auto mb-6 rounded-full bg-brand-500 grid place-items-center text-white text-2xl">✓</div>
                  <h2 className="text-3xl font-bold tracking-tight">Bedankt, {form.naam.split(" ")[0] || "klant"}!</h2>
                  <p className="mt-3 text-brand-900/60 max-w-md mx-auto">
                    Uw afspraak is ingepland{slot ? ` op ${fmtDay(slot)} om ${fmtTime(slot)}` : ""}. U ontvangt een bevestiging per e-mail.
                  </p>
                  {slot && (() => {
                    const title = `Reparatie-afspraak: ${repair ?? ""} (${brand?.name ?? ""} ${model ?? ""})`.trim();
                    const details = `Reparatie-afspraak bij Telefoon Wereld Haarlem.\n\nApparaat: ${category?.label ?? ""}\nMerk: ${brand?.name ?? ""}\nModel: ${model ?? ""}\nReparatie: ${repair ?? ""}`;
                    const { google, icsUrl } = buildCalendarLinks(slot, title, details);
                    return (
                      <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <a
                          href={google}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-3 rounded-2xl bg-brand-900 text-white font-semibold text-sm hover:bg-brand-600 transition-all"
                        >
                          Toevoegen aan Google Agenda
                        </a>
                        <a
                          href={icsUrl}
                          download="afspraak.ics"
                          className="px-5 py-3 rounded-2xl border-2 border-brand-900/15 text-brand-900 font-semibold text-sm hover:bg-brand-50 transition-all"
                        >
                          Apple / Outlook (.ics)
                        </a>
                      </div>
                    );
                  })()}
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