import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { categories, specialServices, repairCatalog, getRepairPrice } from "@/lib/repairs-data";

type ReparatiesSearch = {
  cat?: string;
  brand?: string;
};

export const Route = createFileRoute("/reparaties")({
  validateSearch: (search: Record<string, unknown>): ReparatiesSearch => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
    brand: typeof search.brand === "string" ? search.brand : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Reparaties, prijzen en modellen — Telefoon Wereld Haarlem" },
      {
        name: "description",
        content:
          "Reparaties voor smartphones, tablets, laptops, MacBooks, smartwatches, gameconsoles en navigatiesystemen. Bekijk modellen, indicatieve prijzen en plan direct uw afspraak.",
      },
      { property: "og:title", content: "Reparaties, prijzen en modellen, Telefoon Wereld Haarlem" },
      {
        property: "og:description",
        content: "Volledig overzicht van reparaties, merken, modellen en indicatieve prijzen.",
      },
    ],
  }),
  component: ReparatiesPage,
});

function ReparatiesPage() {
  const search = Route.useSearch();
  const initialCat =
    (search.cat && categories.find((c) => c.id === search.cat)?.id) ||
    (search.brand &&
      categories.find((c) => c.brands.some((b) => b.name === search.brand))?.id) ||
    categories[0].id;
  const [activeCat, setActiveCat] = useState(initialCat);
  const cat = categories.find((c) => c.id === activeCat)!;
  const initialBrand =
    (search.brand && cat.brands.find((b) => b.name === search.brand)?.name) ||
    cat.brands[0]?.name ||
    null;
  const [openBrand, setOpenBrand] = useState<string | null>(initialBrand);
  const [openModel, setOpenModel] = useState<string | null>(null);
  const [openSeries, setOpenSeries] = useState<string | null>(null);

  const brand = useMemo(() => cat.brands.find((b) => b.name === openBrand) ?? null, [cat, openBrand]);

  // Bij wisselen van merk: series-keuze resetten naar eerste beschikbare serie.
  const seriesList = brand?.series ?? null;
  const activeSeries = seriesList
    ? seriesList.find((s) => s.name === openSeries) ?? seriesList[0]
    : null;
  const shownModels = activeSeries ? activeSeries.models : brand?.models ?? [];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Reparaties"
        title="Elk merk, elk model,"
        highlight="vakkundig hersteld."
        intro="Wij repareren smartphones, tablets, laptops, MacBooks, smartwatches, gameconsoles en navigatiesystemen. Kies hieronder uw categorie, merk en model voor de indicatieve prijs en plan direct uw afspraak."
      />

      <section className="pb-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white border border-[color:var(--color-hairline)] rounded-2xl px-6 py-4 text-sm text-brand-900/70 leading-relaxed">
            <strong className="text-brand-900">Let op:</strong> de vermelde prijzen zijn indicaties. Wij proberen
            deze prijzen zo actueel mogelijk te houden en regelmatig bij te werken. In sommige gevallen kan een prijs
            afwijken. Neem bij twijfel gerust telefonisch contact met ons op voor een actuele prijsopgave.
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex sm:justify-center">
            <div className="flex gap-2 p-1.5 bg-white rounded-full border border-[color:var(--color-hairline)] shadow-[var(--shadow-soft)] overflow-x-auto sm:overflow-visible sm:flex-wrap sm:w-fit scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCat(c.id);
                    setOpenBrand(c.brands[0]?.name ?? null);
                    setOpenModel(null);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                    activeCat === c.id ? "bg-brand-900 text-white" : "text-brand-900/70 hover:text-brand-900"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 max-w-6xl mx-auto">
            {/* Brands list */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-900/40 mb-3 px-2">
                Merken in {cat.label.toLowerCase()}
              </p>
              <div className="bg-white rounded-2xl border border-[color:var(--color-hairline)] p-2">
                {cat.brands.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setOpenBrand(b.name);
                      setOpenModel(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      openBrand === b.name ? "bg-brand-50 text-brand-700" : "hover:bg-brand-50/60"
                    }`}
                  >
                    <span>{b.name}</span>
                    <span className="text-xs text-brand-900/40 tabular-nums">{b.models.length}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Models + repairs */}
            <div>
              {brand ? (
                <div className="space-y-3">
                  {brand.models.map((m) => {
                    const open = openModel === m;
                    const repairs = brand.repairs;
                    return (
                      <div
                        key={m}
                        className="bg-white rounded-2xl border border-[color:var(--color-hairline)] overflow-hidden transition-colors hover:border-brand-500/30"
                      >
                        <button
                          onClick={() => setOpenModel(open ? null : m)}
                          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left"
                        >
                          <div className="min-w-0">
                            <h3 className="font-semibold truncate">{m}</h3>
                            <p className="text-xs text-brand-900/50">
                              {repairs.length} reparaties beschikbaar
                            </p>
                          </div>
                          <span
                            className={`size-8 rounded-full bg-brand-50 grid place-items-center text-brand-700 transition-transform shrink-0 ${
                              open ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                        {open && (
                          <div className="border-t border-[color:var(--color-hairline)] divide-y divide-[color:var(--color-hairline)] animate-fade-in">
                            {repairs.map((key) => {
                              const r = repairCatalog[key];
                              const price = getRepairPrice(m, key);
                              return (
                                <div
                                  key={key}
                                  className="px-5 sm:px-6 py-4 flex items-center justify-between gap-4"
                                >
                                  <div className="min-w-0">
                                    <p className="font-medium text-sm">{r.label}</p>
                                    <p className="text-xs text-brand-900/50 mt-0.5">
                                      {price.onRequest ? (
                                        <span className="font-semibold text-brand-700">Prijs op aanvraag</span>
                                      ) : (
                                        <>
                                          Indicatief vanaf{" "}
                                          <span className="font-semibold text-brand-700">{price.display}</span>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  <Link
                                    to="/afspraak"
                                    search={{
                                      device: cat.device,
                                      brand: brand.name,
                                      model: m,
                                      repair: r.label,
                                    }}
                                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-900 text-white text-xs font-semibold hover:bg-brand-600 transition-all"
                                  >
                                    Plan deze reparatie <span aria-hidden>→</span>
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-brand-900/60">Kies een merk om modellen te tonen.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Specialistische reparaties */}
      <section className="py-20 bg-white border-y border-[color:var(--color-hairline)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4">
              Specialistische reparaties
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ook voor complexe en bijzondere klussen.
            </h2>
            <p className="mt-4 text-brand-900/60">
              Van waterschade tot moederbordreparatie en dataherstel. Wij beoordelen uw toestel altijd vrijblijvend.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialServices.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[color:var(--color-hairline)] p-6 hover:border-brand-500/30 transition-colors flex flex-col"
              >
                <h3 className="font-bold">{s.label}</h3>
                <p className="mt-2 text-sm text-brand-900/60 leading-relaxed flex-1">{s.desc}</p>
                <p className="mt-4 text-sm">
                  <span className="text-brand-900/50">Indicatief </span>
                  <span className="font-semibold text-brand-700">{s.price}</span>
                </p>
                <Link
                  to="/afspraak"
                  search={{ repair: s.label }}
                  className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-900 text-white text-xs font-semibold hover:bg-brand-600 transition-all w-fit"
                >
                  Plan deze reparatie <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Uw model niet gevonden?</h2>
          <p className="mt-3 text-brand-900/60">
            Wij repareren ook minder gangbare modellen en andere elektronische apparaten. Neem contact op voor een
            offerte op maat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/afspraak"
              className="px-7 py-3.5 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all"
            >
              Plan reparatie
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-white border border-[color:var(--color-hairline)] rounded-2xl font-semibold hover:bg-brand-50 transition-all"
            >
              Stel een vraag
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
