import { Mail, MapPin } from 'lucide-react';

export default function Imprint() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 text-gray-300">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
          <MapPin size={32} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">Impressum</h1>
      </div>

      <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-p:text-gray-400 prose-a:text-white hover:prose-a:text-gray-300">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>HamudAI</strong><br />
          (Vertreten durch: Omar Al-Hamoud)<br />
          Lutherstraße 27,<br />
          30171 Hannover<br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-gray-500" />
            <a href="mailto:omaralhamoud1234@gmail.com" className="text-white hover:underline">
              omaralhamoud282@gmail.com
            </a>
          </div>
        </div>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Omar Al-Hamoud<br />
          Lutherstraße 27,<br />
          30171 Hannover
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </div>
    </div>
  );
}
