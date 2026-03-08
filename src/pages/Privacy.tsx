import { ShieldCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 text-gray-300">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
          <ShieldCheck size={32} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">Datenschutzerklärung</h1>
      </div>

      <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-p:text-gray-400 prose-a:text-white hover:prose-a:text-gray-300">
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
        </p>
        <p>
          <strong>Wie erfassen wir Ihre Daten?</strong><br />
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder im Chatbot verwenden.
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
        </p>

        <h2>2. Hosting und Content Delivery Networks (CDN)</h2>
        <h3>Externes Hosting</h3>
        <p>
          Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
        </p>

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>

        <h2>4. Datenerfassung auf dieser Website</h2>
        <h3>Cookies</h3>
        <p>
          Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
        </p>

        <h3>Google AdSense</h3>
        <p>
          Diese Website nutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p>
          Google AdSense verwendet sogenannte „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website ermöglichen. Google AdSense verwendet auch sogenannte Web Beacons (unsichtbare Grafiken). Durch diese Web Beacons können Informationen wie der Besucherverkehr auf diesen Seiten ausgewertet werden.
        </p>
        <p>
          Die durch Cookies und Web Beacons erzeugten Informationen über die Benutzung dieser Website (einschließlich Ihrer IP-Adresse) und Auslieferung von Werbeformaten werden an einen Server von Google in den USA übertragen und dort gespeichert. Diese Informationen können von Google an Vertragspartner von Google weitergegeben werden. Google wird Ihre IP-Adresse jedoch nicht mit anderen von Ihnen gespeicherten Daten zusammenführen.
        </p>

        <h2>5. Chatbot und KI-Verarbeitung</h2>
        <p>
          Unsere Website bietet einen KI-gestützten Chatbot ("HamudAI"). Wir speichern Chat-Verläufe standardmäßig nur lokal in Ihrem Browser (Local Storage). Bitte geben Sie im Chat keine sensiblen persönlichen Daten (wie Passwörter, Adressen oder Finanzdaten) ein.
        </p>
      </div>
    </div>
  );
}
