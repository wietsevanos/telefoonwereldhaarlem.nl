import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/reparaties")({
  head: () => ({
    meta: [
      { title: "Reparaties — Telefoon Wereld Haarlem" },
      { name: "description", content: "Smartphone-, tablet- en laptopreparaties voor Apple, Samsung, Google, OnePlus, Xiaomi en Oppo in Haarlem." },
      { property: "og:title", content: "Reparaties — Telefoon Wereld Haarlem" },
      { property: "og:description", content: "Overzicht van alle telefoon-, tablet- en laptopreparaties." },
    ],
  }),
  component: ReparatiesPage,
});

type Brand = { name: string; tag: string; models: string[] };
type Category = { id: string; label: string; brands: Brand[] };

const repairTypes = [
  "Scherm vervangen",
  "Batterij vervangen",
  "Camera reparatie",
  "Speaker reparatie",
  "Achterkant vervangen",
  "Laadpoort reparatie",
];

const categories: Category[] = [
  {
    id: "smartphones",
    label: "Smartphones",
    brands: [
      { name: "Apple", tag: "iPhone", models: ["iPhone 15 Pro Max", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone SE"] },
      { name: "Samsung", tag: "Galaxy", models: ["Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23", "Galaxy A55", "Galaxy A35", "Galaxy Z Flip 5"] },
      { name: "Google", tag: "Pixel", models: ["Pixel 8 Pro", "Pixel 8", "Pixel 7", "Pixel 6"] },
      { name: "OnePlus", tag: "Flagship", models: ["OnePlus 12", "OnePlus 11", "OnePlus Nord 3"] },
      { name: "Xiaomi", tag: "Mi/Redmi", models: ["Xiaomi 14", "Redmi Note 13", "Poco F5"] },
      { name: "Oppo", tag: "Find/Reno", models: ["Find X7", "Reno 11", "A78"] },
    ],
  },
  {
    id: "tablets",
    label: "Tablets",
    brands: [
      { name: "Apple iPad", tag: "iPad", models: ["iPad Pro 12.9", "iPad Air", "iPad", "iPad mini"] },
      { name: "Samsung Galaxy Tab", tag: "Tab", models: ["Tab S9 Ultra", "Tab S9", "Tab A9"] },
    ],
  },
  {
    id: "laptops",
    label: "Laptops",
    brands: [
      { name: "Apple MacBook", tag: "MacBook", models: ["MacBook Pro 16", "MacBook Pro 14", "MacBook Air M2", "MacBook Air M3"] },
      { name: "Windows", tag: "Multi-brand", models: ["Dell XPS", "Lenovo ThinkPad", "HP Spectre", "Microsoft Surface"] },
    ],
  },
];

function ReparatiesPage() {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const [openBrand, setOpenBrand] = useState<string | null>("Apple");
  const cat = categories.find((c) => c.id === activeCat)!;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Reparaties"
        title="Elk merk, elk model,"
        highlight="vakkundig hersteld."
        intro="Wij repareren alle gangbare smartphones, tablets en laptops met originele onderdelen. Vind hieronder uw merk en model."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-full border border-[color:var(--color-hairline)] w-fit mx-auto mb-12 shadow-[var(--shadow-soft)]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCat(c.id);
                  setOpenBrand(c.brands[0].name);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCat === c.id ? "bg-brand-900 text-white" : "text-brand-900/70 hover:text-brand-900"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Brands accordion */}
          <div className="max-w-4xl mx-auto space-y-3">
            {cat.brands.map((brand) => {
              const open = openBrand === brand.name;
              return (
                <div
                  key={brand.name}
                  className="bg-white rounded-3xl border border-[color:var(--color-hairline)] overflow-hidden transition-all hover:border-brand-500/20"
                >
                  <button
                    onClick={() => setOpenBrand(open ? null : brand.name)}
                    className="w-full px-6 sm:px-8 py-6 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="size-12 rounded-2xl bg-brand-50 grid place-items-center text-brand-600 font-bold text-sm shrink-0">
                        {brand.name.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold truncate">{brand.name}</h3>
                        <p className="text-sm text-brand-900/50">{brand.tag} · {brand.models.length} modellen</p>
                      </div>
                    </div>
                    <span className={`size-9 rounded-full bg-brand-50 grid place-items-center transition-transform shrink-0 ${open ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  {open && (
                    <div className="px-6 sm:px-8 pb-8 border-t border-[color:var(--color-hairline)] pt-6 animate-fade-in">
                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {brand.models.map((m) => (
                          <div key={m} className="px-4 py-3 rounded-xl bg-brand-50/60 text-sm font-medium hover:bg-brand-50 transition-colors">
                            {m}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs uppercase tracking-widest font-bold text-brand-900/50 mb-3">Beschikbare reparaties</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {repairTypes.map((t) => (
                          <span key={t} className="px-3 py-1.5 rounded-full bg-white border border-[color:var(--color-hairline)] text-xs font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/afspraak"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-900 text-white rounded-full text-sm font-semibold hover:bg-brand-600 transition-all"
                      >
                        Plan reparatie voor {brand.name} <span aria-hidden>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Uw model niet gevonden?</h2>
          <p className="mt-3 text-brand-900/60">Wij repareren ook minder gangbare modellen. Neem contact op voor een offerte op maat.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/afspraak" className="px-7 py-3.5 bg-brand-900 text-white rounded-2xl font-semibold hover:bg-brand-600 transition-all">
              Plan reparatie
            </Link>
            <Link to="/contact" className="px-7 py-3.5 bg-white border border-[color:var(--color-hairline)] rounded-2xl font-semibold hover:bg-brand-50 transition-all">
              Stel een vraag
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}