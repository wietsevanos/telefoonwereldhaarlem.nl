import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoTw from "@/assets/logo-tw.png.asset.json";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/reparaties", label: "Reparaties" },
  { to: "/afspraak", label: "Afspraak" },
  { to: "/accessoires", label: "Accessoires" },
  { to: "/pakketpunt", label: "Pakketpunt" },
  { to: "/over-ons", label: "Over ons" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-[color:var(--color-hairline)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="size-9 bg-brand-900 rounded-xl grid place-items-center overflow-hidden">
            <img src={logoTw.url} alt="" aria-hidden className="size-6 object-contain" />
          </span>
          <span className="font-bold text-[15px] tracking-tight leading-none">
            TELEFOON WERELD <span className="font-light text-brand-500">HAARLEM</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.slice(1, -1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-brand-900/75 hover:text-brand-600 transition-colors"
              activeProps={{ className: "text-brand-600" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/afspraak"
            className="hidden sm:inline-flex px-5 py-2.5 bg-brand-900 text-white rounded-full text-sm font-semibold hover:bg-brand-600 transition-all active:scale-95"
          >
            Plan Reparatie
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden size-10 grid place-items-center rounded-full bg-white/70 border border-[color:var(--color-hairline)]"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block w-4 h-px bg-brand-900" />
              <span className="block w-4 h-px bg-brand-900" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--color-hairline)] bg-white/90 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-brand-900/80 hover:text-brand-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/afspraak"
              onClick={() => setOpen(false)}
              className="mt-3 px-5 py-3 bg-brand-900 text-white rounded-full text-sm font-semibold text-center"
            >
              Plan Reparatie
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}