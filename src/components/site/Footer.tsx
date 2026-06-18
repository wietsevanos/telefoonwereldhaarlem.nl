import { Link } from "@tanstack/react-router";
import wordmark from "@/assets/telefoon-wereld-wordmark.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-white pt-12 pb-8 sm:pt-24 sm:pb-12 border-t border-[color:var(--color-hairline)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-10 sm:mb-16 text-center md:text-left">
          <div className="md:col-span-2">
            <div className="flex items-center justify-center md:justify-start mb-5 sm:mb-6">
              <img
                src={wordmark.url}
                alt="Telefoon Wereld Haarlem"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-brand-900/60 max-w-sm mx-auto md:mx-0 leading-relaxed mb-6 sm:mb-8 text-[15px]">
              De premium reparatiepartner voor smartphones, tablets en laptops in Haarlem.
              Snel, eerlijk en met liefde voor techniek.
            </p>
            <Link
              to="/afspraak"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-900 text-white rounded-full text-sm font-semibold hover:bg-brand-600 transition-all"
            >
              Plan reparatie
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div>
            <h5 className="font-semibold text-xs uppercase tracking-widest text-brand-900/50 mb-4 sm:mb-6">
              Bezoek
            </h5>
            <ul className="space-y-1.5 sm:space-y-2 text-brand-900/70 text-[15px]">
              <li>Zijlweg 24</li>
              <li>2013 DH Haarlem</li>
              <li className="pt-3 sm:pt-4">
                <a href="tel:+31235517048" className="font-semibold text-brand-900 hover:text-brand-600 transition-colors">
                  023 551 7048
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-xs uppercase tracking-widest text-brand-900/50 mb-4 sm:mb-6">
              Openingstijden
            </h5>
            <ul className="space-y-1.5 sm:space-y-2 text-[14px] text-brand-900/70">
              <li className="flex justify-center md:justify-between gap-4"><span>Maandag</span><span className="tabular-nums">10:00 – 18:00</span></li>
              <li className="flex justify-center md:justify-between gap-4"><span>Di – Vr</span><span className="tabular-nums">09:30 – 18:00</span></li>
              <li className="flex justify-center md:justify-between gap-4"><span>Zaterdag</span><span className="tabular-nums">10:00 – 17:00</span></li>
              <li className="flex justify-center md:justify-between gap-4 text-brand-900/40"><span>Zondag</span><span>Gesloten</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 border-t border-[color:var(--color-hairline)] flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center">
          <p className="text-brand-900/50 text-xs">
            © {new Date().getFullYear()} Telefoon Wereld Haarlem. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6 text-xs text-brand-900/50">
            <Link to="/privacy" className="hover:text-brand-900">Privacy</Link>
            <Link to="/voorwaarden" className="hover:text-brand-900">Voorwaarden</Link>
            <Link to="/cookies" className="hover:text-brand-900">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}