import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, BarChart2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function initGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  // Default: deny all before user decides
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 2000,
  });
}

function updateGtag(consent: ConsentState) {
  if (!window.gtag) return;
  window.gtag('consent', 'update', {
    ad_storage: consent.advertising ? 'granted' : 'denied',
    ad_user_data: consent.advertising ? 'granted' : 'denied',
    ad_personalization: consent.advertising ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    personalization_storage: consent.analytics ? 'granted' : 'denied',
    security_storage: 'granted',
  });
}

const CONSENT_KEY = 'hamudai_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    advertising: false,
  });
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  useEffect(() => {
    initGtag();
    const lang = localStorage.getItem('hamudai_lang') as 'de' | 'en' | null;
    setLanguage(lang === 'en' ? 'en' : 'de');
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved) {
      const parsed: ConsentState = JSON.parse(saved);
      updateGtag(parsed);
    } else {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const saveConsent = (c: ConsentState) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    updateGtag(c);
    setVisible(false);
  };

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, advertising: true });
  const rejectAll = () => saveConsent({ necessary: true, analytics: false, advertising: false });
  const saveSelection = () => saveConsent(consent);

  const t = {
    de: {
      title: 'Deine Privatsphäre',
      desc: 'Wir verwenden Cookies, um dir die bestmögliche Erfahrung zu bieten und unsere Dienste zu verbessern. Einige sind notwendig, andere helfen uns, die Seite weiterzuentwickeln.',
      necessary: 'Notwendige Cookies',
      necessaryDesc: 'Diese Cookies sind für den Betrieb der Website unbedingt erforderlich und können nicht deaktiviert werden.',
      analytics: 'Analyse-Cookies',
      analyticsDesc: 'Helfen uns zu verstehen, wie Besucher die Website nutzen (z.B. Google Analytics).',
      advertising: 'Werbe-Cookies',
      advertisingDesc: 'Ermöglichen personalisierte Werbung durch Google AdSense basierend auf deinen Interessen.',
      acceptAll: 'Alle akzeptieren',
      rejectAll: 'Alle ablehnen',
      saveSelection: 'Auswahl speichern',
      settings: 'Einstellungen',
      required: 'Immer aktiv',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
      moreInfo: 'Mehr Informationen',
      lessInfo: 'Weniger Informationen',
    },
    en: {
      title: 'Your Privacy',
      desc: 'We use cookies to provide the best possible experience and improve our services. Some are necessary, others help us develop the site further.',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'These cookies are essential for the website to function and cannot be disabled.',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'Help us understand how visitors use the website (e.g. Google Analytics).',
      advertising: 'Advertising Cookies',
      advertisingDesc: 'Enable personalized advertising through Google AdSense based on your interests.',
      acceptAll: 'Accept All',
      rejectAll: 'Reject All',
      saveSelection: 'Save Selection',
      settings: 'Settings',
      required: 'Always active',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      moreInfo: 'More Information',
      lessInfo: 'Less Information',
    },
  };

  const tx = t[language];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-[460px] z-[9999] bg-gray-950 border border-white/15 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-0 flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">{tx.title}</h2>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">{tx.desc}</p>
              </div>
            </div>

            {/* Expandable Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pt-4 space-y-3">
                    {/* Necessary */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Shield size={15} className="text-green-400" />
                          <span className="text-white text-sm font-semibold">{tx.necessary}</span>
                        </div>
                        <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-0.5 rounded-full">{tx.required}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{tx.necessaryDesc}</p>
                    </div>

                    {/* Analytics */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <BarChart2 size={15} className="text-blue-400" />
                          <span className="text-white text-sm font-semibold">{tx.analytics}</span>
                        </div>
                        <button
                          onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                          className={`relative w-11 h-6 rounded-full transition-colors ${consent.analytics ? 'bg-white' : 'bg-white/20'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-black rounded-full shadow transition-transform ${consent.analytics ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{tx.analyticsDesc}</p>
                    </div>

                    {/* Advertising */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <X size={15} className="text-purple-400" />
                          <span className="text-white text-sm font-semibold">{tx.advertising}</span>
                        </div>
                        <button
                          onClick={() => setConsent(c => ({ ...c, advertising: !c.advertising }))}
                          className={`relative w-11 h-6 rounded-full transition-colors ${consent.advertising ? 'bg-white' : 'bg-white/20'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-black rounded-full shadow transition-transform ${consent.advertising ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{tx.advertisingDesc}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="p-6 pt-4 space-y-3">
              {/* Toggle details */}
              <button
                onClick={() => setShowDetails(d => !d)}
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
              >
                {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showDetails ? tx.lessInfo : tx.moreInfo}
              </button>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={acceptAll}
                  className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm"
                >
                  {tx.acceptAll}
                </button>
                <div className="flex gap-2">
                  {showDetails && (
                    <button
                      onClick={saveSelection}
                      className="flex-1 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/10"
                    >
                      {tx.saveSelection}
                    </button>
                  )}
                  <button
                    onClick={rejectAll}
                    className="flex-1 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/10"
                  >
                    {tx.rejectAll}
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Link to="/privacy" className="hover:text-gray-300 transition-colors">{tx.privacy}</Link>
                <span>·</span>
                <Link to="/terms" className="hover:text-gray-300 transition-colors">{tx.terms}</Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
