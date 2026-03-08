import { Link } from 'react-router-dom';
import { Bot, BrainCircuit, GraduationCap, ArrowRight, ShieldCheck, Zap, Mail, HelpCircle, CheckCircle2, BookOpen, Upload, MessageSquare } from 'lucide-react';
import GeminiAnimation from '../components/GeminiAnimation';
import { useLanguage } from '../i18n/useLanguage';
import AsteriskLogo from '../components/AsteriskLogo';

export default function Home() {
  const { t, lang } = useLanguage();
  const isDE = lang === 'de';

  const faqItems = isDE ? [
    { q: 'Ist HamudAI wirklich kostenlos?', a: 'Ja, HamudAI ist komplett kostenlos nutzbar. Der Dienst wird durch Werbeanzeigen von Google AdSense finanziert.' },
    { q: 'Welche Fächer kann HamudAI abdecken?', a: 'HamudAI kann bei nahezu allen Schul- und Universitätsfächern helfen – von Mathematik, Physik und Chemie über Geschichte, Biologie und Geografie bis hin zu Sprachen und Informatik.' },
    { q: 'Kann ich Fotos meiner Hausaufgaben hochladen?', a: 'Ja! Du kannst Bilder (JPG, PNG) oder PDF-Dateien direkt in den Chat hochladen. HamudAI analysiert den Inhalt und hilft dir gezielt bei deinen Aufgaben.' },
    { q: 'Werden meine Chats gespeichert?', a: 'Deine Chats werden ausschließlich lokal in deinem Browser gespeichert und niemals auf unsere Server übertragen. Du hast die volle Kontrolle über deine Daten.' },
    { q: 'Gibt HamudAI einfach die Lösungen raus?', a: 'Nein – HamudAI nutzt die sokratische Methode. Es stellt dir gezielte Fragen, um dich zur Lösung zu führen. So lernst du nachhaltig und verstehst den Stoff wirklich.' },
    { q: 'Funktioniert HamudAI auf dem Smartphone?', a: 'Ja, HamudAI ist vollständig mobiloptimiert und funktioniert auf allen modernen Smartphones und Tablets.' },
  ] : [
    { q: 'Is HamudAI really free?', a: 'Yes, HamudAI is completely free to use. The service is funded by Google AdSense advertising.' },
    { q: 'Which subjects can HamudAI cover?', a: 'HamudAI can help with virtually all school and university subjects – from math, physics, and chemistry to history, biology, geography, languages, and computer science.' },
    { q: 'Can I upload photos of my homework?', a: 'Yes! You can upload images (JPG, PNG) or PDF files directly into the chat. HamudAI analyzes the content and helps you with your specific tasks.' },
    { q: 'Are my chats saved?', a: 'Your chats are stored exclusively locally in your browser and never transferred to our servers. You have full control over your data.' },
    { q: 'Does HamudAI just give out solutions?', a: 'No – HamudAI uses the Socratic method. It asks targeted questions to guide you to the solution, so you learn sustainably.' },
    { q: 'Does HamudAI work on smartphones?', a: 'Yes, HamudAI is fully mobile-optimized and works on all modern smartphones and tablets.' },
  ];

  const steps = isDE ? [
    { icon: <MessageSquare size={24} />, title: 'Frage stellen', desc: 'Tippe deine Frage zu einem Lernthema ein oder lade ein Bild deiner Aufgabe hoch.' },
    { icon: <BrainCircuit size={24} />, title: 'KI analysiert', desc: 'HamudAI versteht deinen Kontext, dein Niveau und formuliert eine pädagogisch sinnvolle Antwort.' },
    { icon: <BookOpen size={24} />, title: 'Verstehen & Lernen', desc: 'Durch gezielte Fragen und klare Erklärungen verstehst du den Stoff – nicht nur die Lösung.' },
  ] : [
    { icon: <MessageSquare size={24} />, title: 'Ask a Question', desc: 'Type your question about a learning topic or upload an image of your assignment.' },
    { icon: <BrainCircuit size={24} />, title: 'AI Analyzes', desc: 'HamudAI understands your context and level, formulating a pedagogically meaningful response.' },
    { icon: <BookOpen size={24} />, title: 'Understand & Learn', desc: 'Through targeted questions and clear explanations, you understand the material – not just the solution.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 pb-24 relative">
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center relative z-10">
        <div className="absolute inset-0 -z-10">
          <GeminiAnimation />
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-sm mt-32 md:mt-0">
          <AsteriskLogo size={16} />
          <span>{t('heroBadge', 'home')}</span>
        </div>
        
        <h1 className="sr-only">
          {t('heroTitle', 'home')} HamudAI
        </h1>
        
        <div className="h-[200px] md:h-[300px] w-full"></div>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-2xl">
          {t('heroDesc', 'home')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            to="/chat" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            <Bot size={20} />
            {t('startBtn', 'home')}
            <ArrowRight size={18} />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm"
          >
            {t('learnMore', 'home')}
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 border-t border-white/10 relative z-10 bg-black/50 backdrop-blur-lg mt-20 rounded-3xl px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('featuresTitle', 'home')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('featuresDesc', 'home')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <BrainCircuit size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{t('feat1Title', 'home')}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t('feat1Desc', 'home')}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{t('feat2Title', 'home')}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t('feat2Desc', 'home')}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{t('feat3Title', 'home')}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t('feat3Desc', 'home')}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 border-t border-white/10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isDE ? 'So funktioniert HamudAI' : 'How HamudAI Works'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isDE
              ? 'In nur drei einfachen Schritten zu besserem Verständnis und besseren Noten.'
              : 'In just three simple steps to better understanding and better grades.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-white/5 border border-white/10 p-8 rounded-3xl">
              <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {step.icon}
              </div>
              <div className="text-5xl font-black text-white/10 mb-2">0{i + 1}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits List Section */}
      <section className="w-full py-20 border-t border-white/10 relative z-10 bg-black/50 backdrop-blur-lg rounded-3xl px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isDE ? 'Alles was du zum Lernen brauchst' : 'Everything You Need to Learn'}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              {isDE
                ? 'HamudAI vereint modernste KI-Technologie mit bewährten pädagogischen Methoden. Ob Schüler, Student oder Weiterbildungssuchender – HamudAI passt sich deinem Niveau und Lernstil an.'
                : 'HamudAI combines state-of-the-art AI technology with proven pedagogical methods. Whether student or lifelong learner – HamudAI adapts to your level and learning style.'}
            </p>
            <ul className="space-y-4">
              {(isDE ? [
                'Fragen auf Deutsch und Englisch stellen',
                'Komplexe Formeln und Gleichungen verstehen',
                'Hausaufgabenfotos hochladen und analysieren lassen',
                'PDF-Skripte direkt im Chat besprechen',
                'Spracheingabe für freihändiges Lernen',
                'Dunkel-Design für ermüdungsfreies Lesen',
                'Offline-Funktion durch Service Worker',
                'DSGVO-konform und datenschutzfreundlich',
              ] : [
                'Ask questions in German and English',
                'Understand complex formulas and equations',
                'Upload homework photos for analysis',
                'Discuss PDF scripts directly in chat',
                'Voice input for hands-free learning',
                'Dark design for fatigue-free reading',
                'Offline functionality via Service Worker',
                'GDPR-compliant and privacy-friendly',
              ]).map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <Upload size={20} className="text-white" />
                <span className="text-white font-semibold">{isDE ? 'Dateien hochladen' : 'Upload Files'}</span>
              </div>
              {[
                { label: isDE ? 'Mathematik Aufgabe (Bild)' : 'Math Assignment (Image)', type: '.jpg', color: 'bg-blue-400/20 text-blue-300' },
                { label: isDE ? 'Chemie Skript (PDF)' : 'Chemistry Script (PDF)', type: '.pdf', color: 'bg-red-400/20 text-red-300' },
                { label: isDE ? 'Geschichte Notizen (Bild)' : 'History Notes (Image)', type: '.png', color: 'bg-green-400/20 text-green-300' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-gray-300 text-sm">{f.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-mono ${f.color}`}>{f.type}</span>
                </div>
              ))}
              <p className="text-gray-500 text-xs mt-4 text-center">
                {isDE ? '✓ Analyse läuft in Sekunden' : '✓ Analysis runs in seconds'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="w-full py-20 border-t border-white/10 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('aboutTitle', 'home')}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t('aboutDesc1', 'home')}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {t('aboutDesc2', 'home')}
            </p>
            <Link to="/chat" className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
              <GraduationCap size={20} />
              {t('tryFree', 'home')}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square md:aspect-video rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/800/600')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
              <div className="relative z-10 text-center">
                <Bot size={64} className="text-white/80 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white tracking-widest uppercase">HamudAI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 border-t border-white/10 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle size={24} className="text-white" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {isDE ? 'Häufige Fragen (FAQ)' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            {isDE ? 'Hier findest du Antworten auf die häufigsten Fragen rund um HamudAI.' : 'Find answers to the most common questions about HamudAI.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/8 transition-colors">
              <h3 className="text-white font-semibold mb-3 flex items-start gap-2">
                <span className="text-gray-500 font-mono text-sm mt-0.5">Q{i + 1}</span>
                {item.q}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 border-t border-white/10 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('contactTitle', 'home')}</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('contactDesc', 'home')}
        </p>
        <a 
          href="mailto:omaralhamoud282@gmail.com" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-200 text-black font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <Mail size={20} />
          {t('sendMsg', 'home')}
        </a>
      </section>
    </div>
  );
}
