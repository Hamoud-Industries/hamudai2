import { useState, useEffect } from 'react';
import { translations } from './translations';

export function useLanguage() {
  const [lang, setLang] = useState<'en' | 'de'>('de');

  useEffect(() => {
    const browserLang = navigator.language;
    if (browserLang.toLowerCase().startsWith('de')) {
      setLang('de');
    } else {
      setLang('en');
    }
  }, []);

  const t = (key: string, section: 'home' | 'nav' | 'chat') => {
    return translations[lang][section][key as keyof typeof translations[typeof lang][typeof section]] || key;
  };

  return { lang, t, setLang };
}
