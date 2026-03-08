import { useLanguage } from '../i18n/useLanguage';
import { FileText } from 'lucide-react';

export default function Terms() {
  const { lang } = useLanguage();

  const isDE = lang === 'de';

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-24 relative z-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
          <FileText size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {isDE ? 'Nutzungsbedingungen (AGB)' : 'Terms of Service'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {isDE ? 'Letzte Aktualisierung: Januar 2025' : 'Last updated: January 2025'}
          </p>
        </div>
      </div>

      <div className="prose prose-invert prose-sm max-w-none space-y-8">
        {isDE ? (
          <>
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">1. Geltungsbereich und Vertragsparteien</h2>
              <p className="text-gray-300 leading-relaxed">
                Diese Nutzungsbedingungen regeln die Nutzung des KI-gestützten Lernassistenten <strong className="text-white">HamudAI</strong>, bereitgestellt durch <strong className="text-white">Hamoud Labs</strong> (nachfolgend „Anbieter"). Durch die Nutzung von HamudAI erklärst du dich mit diesen Bedingungen einverstanden. Bitte lese sie sorgfältig durch, bevor du unsere Dienste verwendest.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">2. Beschreibung des Dienstes</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                HamudAI ist ein KI-gestützter Lernassistent, der Schülern und Studenten bei Bildungsaufgaben hilft. Der Dienst umfasst:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Beantwortung von Fragen zu schulischen und universitären Themen</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Analyse von hochgeladenen Bildern und PDF-Dokumenten</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Lernunterstützung durch sokratische Methoden</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Spracherkennung für Spracheingaben</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Der Dienst wird kostenfrei angeboten und kann jederzeit ohne Ankündigung geändert, eingeschränkt oder eingestellt werden.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">3. Nutzungsregeln und verbotene Inhalte</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Die Nutzung von HamudAI ist ausschließlich für legale und bildungsbezogene Zwecke gestattet. Es ist ausdrücklich verboten:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
                  <span>Den Dienst zur Erstellung von illegalen, schädlichen, beleidigenden, diskriminierenden, pornografischen oder bedrohenden Inhalten zu nutzen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
                  <span>Den Dienst zur Entwicklung von Malware, Schadsoftware, Viren oder sonstigen schädlichen Programmen zu verwenden</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
                  <span>Urheberrechtlich geschützte Inhalte ohne Erlaubnis hochzuladen oder zu verbreiten</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
                  <span>Den Dienst zum Schummeln bei offiziellen Prüfungen oder zur akademischen Unehrlichkeit zu nutzen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
                  <span>Automatisierte Anfragen, Bots oder Scraping-Tools zu verwenden, um den Dienst zu überlasten</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
                  <span>Versuche, die Sicherheitsmechanismen des Systems zu umgehen oder die KI zu manipulieren</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
                  <span>Persönliche Daten Dritter ohne deren Einwilligung einzugeben oder zu verarbeiten</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Verstöße gegen diese Regeln können zum sofortigen Ausschluss von der Nutzung und gegebenenfalls zu rechtlichen Schritten führen.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">4. Haftungsausschluss für KI-generierte Inhalte</h2>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 mb-4">
                <p className="text-yellow-300 text-sm font-medium">⚠️ Wichtiger Hinweis zur KI-Nutzung</p>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                HamudAI wird von einer künstlichen Intelligenz (Google Gemini API) betrieben. Der Anbieter übernimmt <strong className="text-white">keine Garantie</strong> für die Richtigkeit, Vollständigkeit, Aktualität oder Eignung der generierten Inhalte für einen bestimmten Zweck.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> KI-generierte Antworten können <strong className="text-white">Fehler oder Ungenauigkeiten</strong> enthalten (sog. „Halluzinationen")</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Die Inhalte sind <strong className="text-white">nicht als professionelle Beratung</strong> (medizinisch, rechtlich, finanziell) zu verstehen</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Nutzer sind selbst verantwortlich für die Überprüfung und Verwendung generierter Inhalte</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Bei wichtigen Entscheidungen sollte immer ein qualifizierter Fachexperte konsultiert werden</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Der Anbieter haftet nicht für Schäden, die durch die Nutzung oder den Verlass auf KI-generierte Inhalte entstehen, soweit dies gesetzlich zulässig ist.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">5. Datenschutz und Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Der Schutz deiner persönlichen Daten ist uns wichtig. Detaillierte Informationen zur Datenverarbeitung findest du in unserer <a href="/privacy" className="text-white underline hover:text-gray-300">Datenschutzerklärung</a>.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Unsere Website verwendet Cookies, darunter auch Werbe-Cookies von Google AdSense zur Finanzierung des kostenlosen Dienstes. Du kannst deine Cookie-Einstellungen jederzeit anpassen.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Chat-Verläufe werden <strong className="text-white">nur lokal</strong> in deinem Browser gespeichert</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Deine Daten werden <strong className="text-white">nicht</strong> zum Training von KI-Modellen verwendet</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Hochgeladene Dateien werden nur zur Verarbeitung deiner Anfrage temporär übertragen</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">6. Werbung (Google AdSense)</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                HamudAI wird durch Werbeanzeigen von <strong className="text-white">Google AdSense</strong> finanziert. Durch die Nutzung unseres Dienstes stimmst du zu, dass auf der Website Werbeanzeigen angezeigt werden können.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Mit deiner Einwilligung werden personalisierte Anzeigen basierend auf deinen Interessen angezeigt. Ohne Einwilligung werden nur nicht-personalisierte Anzeigen geschaltet.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Weitere Informationen zur Datenverarbeitung durch Google findest du unter: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-gray-300">https://policies.google.com/privacy</a>
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">7. Geistiges Eigentum</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Alle Rechte an der Website HamudAI, einschließlich Design, Quellcode, Texte und Logos, liegen beim Anbieter und sind urheberrechtlich geschützt.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Die durch die KI generierten Inhalte werden dir zur persönlichen, nicht-kommerziellen Nutzung im Bildungskontext überlassen. Eine Weitergabe oder kommerzielle Nutzung bedarf der vorherigen schriftlichen Zustimmung des Anbieters.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">8. Verfügbarkeit und Änderungen</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Der Anbieter bemüht sich um eine hohe Verfügbarkeit des Dienstes, übernimmt jedoch keine Garantie für eine ununterbrochene Verfügbarkeit. Wartungsarbeiten, technische Störungen oder höhere Gewalt können zu vorübergehenden Ausfällen führen.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Der Anbieter behält sich das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Bei wesentlichen Änderungen werden Nutzer informiert. Die fortgesetzte Nutzung nach Änderungen gilt als Zustimmung zu den neuen Bedingungen.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">9. Anwendbares Recht und Gerichtsstand</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">10. Kontakt</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Bei Fragen zu diesen Nutzungsbedingungen kannst du uns erreichen:
              </p>
              <div className="bg-white/5 rounded-2xl p-4 text-gray-300 space-y-1">
                <p><strong className="text-white">Hamoud Labs</strong></p>
                <p>E-Mail: <a href="mailto:omaralhamoud282@gmail.com" className="text-white hover:text-gray-300">omaralhamoud282@gmail.com</a></p>
                <p>Weitere Details: <a href="/imprint" className="text-white hover:text-gray-300">Impressum</a></p>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">1. Scope and Contracting Parties</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms of Service govern the use of the AI-powered learning assistant <strong className="text-white">HamudAI</strong>, provided by <strong className="text-white">Hamoud Labs</strong> (hereinafter "Provider"). By using HamudAI, you agree to these terms. Please read them carefully before using our services.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                HamudAI is an AI-powered learning assistant that helps students with educational tasks. The service includes:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Answering questions on school and university topics</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Analysis of uploaded images and PDF documents</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Learning support through Socratic methods</li>
                <li className="flex items-start gap-2"><span className="text-white mt-1">•</span> Speech recognition for voice input</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                The service is offered free of charge and may be changed, restricted, or discontinued at any time without notice.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">3. Usage Rules and Prohibited Content</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Use of HamudAI is permitted solely for legal and educational purposes. It is expressly prohibited to:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span><span>Use the service to create illegal, harmful, offensive, discriminatory, pornographic, or threatening content</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span><span>Use the service to develop malware, viruses, or other harmful programs</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span><span>Upload or distribute copyrighted content without permission</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span><span>Use the service to cheat in official exams or engage in academic dishonesty</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span><span>Use automated requests, bots, or scraping tools to overload the service</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span><span>Attempt to bypass security mechanisms or manipulate the AI</span></li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span><span>Enter or process personal data of third parties without their consent</span></li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">4. Disclaimer for AI-Generated Content</h2>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 mb-4">
                <p className="text-yellow-300 text-sm font-medium">⚠️ Important notice regarding AI usage</p>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                HamudAI is powered by artificial intelligence (Google Gemini API). The Provider gives <strong className="text-white">no guarantee</strong> for the accuracy, completeness, timeliness, or suitability of generated content for any specific purpose. AI-generated responses may contain errors ("hallucinations") and should not be relied upon as professional advice.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">5. Advertising (Google AdSense)</h2>
              <p className="text-gray-300 leading-relaxed">
                HamudAI is funded by ads from <strong className="text-white">Google AdSense</strong>. With your consent, personalized ads based on your interests may be shown. Without consent, only non-personalized ads are displayed. More information: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-gray-300">Google Privacy Policy</a>
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">6. Contact</h2>
              <div className="bg-white/5 rounded-2xl p-4 text-gray-300 space-y-1">
                <p><strong className="text-white">Hamoud Labs</strong></p>
                <p>Email: <a href="mailto:omaralhamoud282@gmail.com" className="text-white hover:text-gray-300">omaralhamoud282@gmail.com</a></p>
                <p>Details: <a href="/imprint" className="text-white hover:text-gray-300">Imprint</a></p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
