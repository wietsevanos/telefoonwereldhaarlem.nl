import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { categories, repairCatalog, specialServices } from "@/lib/repairs-data";

type Item = {
  id: string;
  label: string;
  sub: string;
  haystack: string;
  to: "/afspraak";
  search: Record<string, string>;
};

function buildIndex(): Item[] {
  const items: Item[] = [];
  for (const cat of categories) {
    for (const brand of cat.brands) {
      for (const model of brand.models) {
        for (const key of brand.repairs) {
          const r = repairCatalog[key];
          items.push({
            id: `${cat.id}-${brand.name}-${model}-${key}`,
            label: `${r.label} — ${model}`,
            sub: `${brand.name} · ${cat.label} · vanaf €${r.from}`,
            haystack: `${r.label} ${model} ${brand.name} ${cat.label}`.toLowerCase(),
            to: "/afspraak",
            search: { device: cat.device, brand: brand.name, model, repair: r.label },
          });
        }
      }
    }
  }
  for (const s of specialServices) {
    items.push({
      id: `special-${s.label}`,
      label: s.label,
      sub: `Specialistische reparatie · ${s.price}`,
      haystack: `${s.label} ${s.desc}`.toLowerCase(),
      to: "/afspraak",
      search: { repair: s.label },
    });
  }
  return items;
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as Item[];
    const tokens = term.split(/\s+/).filter(Boolean);
    return index
      .filter((it) => tokens.every((t) => it.haystack.includes(t)))
      .slice(0, 30);
  }, [q, index]);

  if (!open) return null;

  const go = (it: Item) => {
    onClose();
    navigate({ to: it.to, search: it.search });
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-brand-900/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[8vh] w-[min(640px,92vw)] bg-white rounded-2xl shadow-2xl border border-[color:var(--color-hairline)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-hairline)]">
          <Search className="size-5 text-brand-900/50 shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                e.preventDefault();
                go(results[active]);
              }
            }}
            placeholder="Zoek reparatie, model of merk…"
            className="flex-1 bg-transparent outline-none text-base placeholder:text-brand-900/40"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="size-8 grid place-items-center rounded-full hover:bg-brand-50 text-brand-900/60"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {q.trim() === "" ? (
            <div className="px-5 py-8 text-sm text-brand-900/50 text-center">
              Typ bijvoorbeeld <span className="text-brand-900/80 font-medium">"iPhone 13 scherm"</span> of{" "}
              <span className="text-brand-900/80 font-medium">"Samsung batterij"</span>.
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-sm text-brand-900/50 text-center">
              Geen resultaten. Neem contact op voor een offerte op maat.
            </div>
          ) : (
            <ul className="py-2">
              {results.map((it, i) => (
                <li key={it.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(it)}
                    className={`w-full text-left px-5 py-3 flex items-center justify-between gap-4 transition-colors ${
                      i === active ? "bg-brand-50" : "hover:bg-brand-50/60"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-900 truncate">{it.label}</p>
                      <p className="text-xs text-brand-900/55 truncate">{it.sub}</p>
                    </div>
                    <span className="text-brand-600 text-xs font-semibold shrink-0" aria-hidden>
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}