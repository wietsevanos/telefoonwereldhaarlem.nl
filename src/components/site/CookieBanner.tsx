import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

const STORAGE_KEY = "tw-cookie-consent-v1";
const OPEN_EVENT = "tw:open-cookie-preferences";

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

function loadConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
}

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = loadConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
    const open = () => {
      const cur = loadConsent();
      if (cur) {
        setAnalytics(cur.analytics);
        setMarketing(cur.marketing);
      }
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const decide = (a: boolean, m: boolean) => {
    const consent: Consent = {
      necessary: true,
      analytics: a,
      marketing: m,
      decidedAt: new Date().toISOString(),
    };
    saveConsent(consent);
    setAnalytics(a);
    setMarketing(m);
    setVisible(false);
    setShowPrefs(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookievoorkeuren"
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md z-[100] animate-fade-up"
    >
      <div className="bg-white rounded-3xl border border-[color:var(--color-hairline)] shadow-[var(--shadow-lift)] p-6 sm:p-7">
        {!showPrefs ? (
          <>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-600 mb-2">Cookies</p>
            <h3 className="text-lg font-bold text-brand-900">Wij respecteren uw privacy</h3>
            <p className="mt-2 text-sm text-brand-900/70 leading-relaxed">
              Wij gebruiken functionele cookies om de website te laten werken. Met uw toestemming plaatsen we ook
              analytische en marketingcookies. Lees meer in ons{" "}
              <Link to="/cookies" className="text-brand-600 font-semibold underline">cookiebeleid</Link>.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => decide(true, true)}
                className="flex-1 px-4 py-3 bg-brand-900 text-white rounded-2xl font-semibold text-sm hover:bg-brand-600 transition-all"
              >
                Alles accepteren
              </button>
              <button
                type="button"
                onClick={() => decide(false, false)}
                className="flex-1 px-4 py-3 bg-brand-50 text-brand-900 rounded-2xl font-semibold text-sm hover:bg-brand-100 transition-all"
              >
                Alleen noodzakelijk
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="mt-3 w-full text-center text-xs font-semibold text-brand-900/60 hover:text-brand-900"
            >
              Voorkeuren aanpassen
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-600 mb-2">Voorkeuren</p>
            <h3 className="text-lg font-bold text-brand-900">Cookievoorkeuren</h3>
            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-3 rounded-2xl bg-brand-50/60 p-4 cursor-not-allowed opacity-90">
                <input type="checkbox" checked readOnly className="mt-1 accent-brand-500" />
                <span className="text-sm">
                  <span className="block font-semibold text-brand-900">Noodzakelijk</span>
                  <span className="text-brand-900/60">Altijd actief — vereist voor basisfunctionaliteit.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-2xl bg-brand-50/60 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 accent-brand-500"
                />
                <span className="text-sm">
                  <span className="block font-semibold text-brand-900">Analytisch</span>
                  <span className="text-brand-900/60">Helpt ons de website te verbeteren.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-2xl bg-brand-50/60 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 accent-brand-500"
                />
                <span className="text-sm">
                  <span className="block font-semibold text-brand-900">Marketing</span>
                  <span className="text-brand-900/60">Voor relevante advertenties op andere websites.</span>
                </span>
              </label>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => decide(analytics, marketing)}
                className="flex-1 px-4 py-3 bg-brand-900 text-white rounded-2xl font-semibold text-sm hover:bg-brand-600 transition-all"
              >
                Voorkeuren opslaan
              </button>
              <button
                type="button"
                onClick={() => decide(true, true)}
                className="flex-1 px-4 py-3 bg-brand-500 text-white rounded-2xl font-semibold text-sm hover:bg-brand-600 transition-all"
              >
                Alles accepteren
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}