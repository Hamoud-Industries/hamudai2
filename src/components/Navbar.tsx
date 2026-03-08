import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Bot } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { useLanguage } from '../i18n/useLanguage';
import AsteriskLogo from './AsteriskLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('home', 'nav'), href: '/' },
    { name: t('privacy', 'nav'), href: '/privacy' },
    { name: t('terms', 'nav'), href: '/terms' },
    { name: t('imprint', 'nav'), href: '/imprint' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled
          ? 'bg-black/50 backdrop-blur-md border-white/10 py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white text-black overflow-hidden">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <AsteriskLogo size={20} className="relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Hamud<span className="text-gray-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "relative text-sm font-medium hover:text-white transition-colors group py-2",
                location.pathname === link.href ? "text-white" : "text-gray-300"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300",
                location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          <Link
            to="/chat"
            className="px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-gray-200 rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-2"
          >
            <Bot size={16} />
            {t('start', 'nav')}
          </Link>
          <a
            href="/#contact"
            className="px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-gray-200 rounded-full transition-all"
          >
            {t('contact', 'nav')}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-lg font-medium transition-colors",
                location.pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/chat"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-5 py-3 text-center font-medium text-black bg-white hover:bg-gray-200 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Bot size={18} />
            {t('start', 'nav')}
          </Link>
          <a
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-5 py-3 text-center font-medium text-black bg-white hover:bg-gray-200 rounded-xl transition-all"
          >
            {t('contact', 'nav')}
          </a>
        </motion.div>
      )}
    </header>
  );
}
