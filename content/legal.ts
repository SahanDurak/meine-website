import { contactEmail } from "@/content/about";

export type LegalSection = {
  heading: string;
  // Each entry is one paragraph. Lines inside an address block may be
  // separated with "\n" (rendered with whitespace-pre-line).
  paragraphs: string[];
};

export type LegalPage = {
  title: string; // H1
  description: string; // German meta description, max ~155 chars
  intro?: string;
  sections: LegalSection[];
};

export const impressum: LegalPage = {
  title: "Impressum",
  description:
    "Impressum von Sahan Durak: Anbieterkennzeichnung und Kontaktdaten gemäß § 5 DDG.",
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG",
      paragraphs: ["Sahan Durak\nTriftstraße 63\n23554 Lübeck"],
    },
    {
      heading: "Kontakt",
      paragraphs: [`E-Mail: ${contactEmail}`],
    },
  ],
};

// Describes the site as it is: no cookies, no tracking, no external embeds.
// Update this text together with any change that adds one (e.g. a YouTube
// embed, analytics, external fonts or a contact form).
export const datenschutz: LegalPage = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung: Welche Daten beim Besuch dieser Website verarbeitet werden, wer dafür verantwortlich ist und welche Rechte du hast.",
  intro:
    "Diese Erklärung beschreibt, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden und welche Rechte du dabei hast.",
  sections: [
    {
      heading: "Verantwortlicher",
      paragraphs: [
        `Sahan Durak\nTriftstraße 63\n23554 Lübeck\nE-Mail: ${contactEmail}`,
      ],
    },
    {
      heading: "Hosting bei Vercel",
      paragraphs: [
        "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. [Bitte prüfen]",
        "Beim Aufruf der Website verarbeitet Vercel Server-Logdaten, darunter deine IP-Adresse, die aufgerufene URL, Datum und Uhrzeit des Zugriffs, Browsertyp (User-Agent) und die Referrer-URL. [Bitte prüfen]",
        "Zweck der Verarbeitung ist die Auslieferung der Website und die Gewährleistung der Sicherheit.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website). [Bitte prüfen]",
        "Wie lange die Daten gespeichert werden, bestimmt Vercel. [Bitte prüfen]",
        "Dabei können Daten in die USA übermittelt werden. Vercel soll nach dem EU-U.S. Data Privacy Framework zertifiziert sein. [Bitte prüfen]",
        "Für die Verarbeitung durch Vercel ist ein Auftragsverarbeitungsvertrag (Data Processing Agreement) vorgesehen. [Bitte prüfen: abschließen oder Satz streichen]",
      ],
    },
    {
      heading: "Keine Cookies, kein Tracking",
      paragraphs: [
        "Diese Website setzt keine Cookies. Es gibt keine Analyse- oder Tracking-Werkzeuge, keine Werbung und keine Social-Media-Plugins.",
        "Es werden keine externen Inhalte eingebettet, zum Beispiel von YouTube. Videos werden von dieser Website selbst ausgeliefert.",
      ],
    },
    {
      heading: "Schriftarten",
      paragraphs: [
        "Alle verwendeten Schriftarten (Geist, Geist Mono und eine eigene Handschrift) werden vom Server dieser Website ausgeliefert. Beim Besuch wird keine Verbindung zu Google Fonts oder anderen Schriftdiensten aufgebaut.",
      ],
    },
    {
      heading: "Lokaler Speicher (Hell-/Dunkelmodus)",
      paragraphs: [
        "Wenn du den Hell- oder Dunkelmodus manuell umschaltest, wird deine Auswahl im localStorage deines Browsers unter dem Schlüssel „theme“ gespeichert (Wert „light“ oder „dark“).",
        "Dieser Wert bleibt auf deinem Gerät und wird nicht an den Server übertragen. Er wird wieder entfernt, sobald du den Modus wählst, den dein System ohnehin verwendet, oder wenn du die Browserdaten löschst.",
        "Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG, da die Speicherung nötig ist, um die von dir gewünschte Einstellung bereitzustellen. [Bitte prüfen]",
      ],
    },
    {
      heading: "Kontakt per E-Mail",
      paragraphs: [
        `Wenn du mir eine E-Mail an ${contactEmail} schreibst, werden deine E-Mail-Adresse und der Inhalt deiner Nachricht verarbeitet, um deine Anfrage zu beantworten.`,
        "Die Adresse ist ein Gmail-Konto. Die E-Mails werden daher von Google (Google Ireland Limited bzw. Google LLC) verarbeitet. [Bitte prüfen]",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, bei vertragsbezogenen Anfragen Art. 6 Abs. 1 lit. b DSGVO. [Bitte prüfen]",
      ],
    },
    {
      heading: "Deine Rechte",
      paragraphs: [
        "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). [Bitte prüfen]",
        `Zur Ausübung deiner Rechte schreib mir an ${contactEmail}.`,
      ],
    },
    {
      heading: "Beschwerderecht",
      paragraphs: [
        "Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für Schleswig-Holstein ist das das Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein (ULD). [Bitte prüfen]",
      ],
    },
  ],
};
