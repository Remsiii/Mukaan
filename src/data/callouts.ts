interface ContentBlock {
  text: string;
  type: 'paragraph' | 'heading' | 'list' | 'image';
  items?: string[]; // Für Listen
  imagePath?: string; // Für Bilder
  imageAlt?: string; // Für Bilder
}

interface Button {
  text: string;
  link: string;
}

interface PageContent {
  title: string;
  subtitle: string;
  imagePath: string;
  imageAlt: string;
  content: ContentBlock[];
  button?: Button;
}

export interface Callout {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  slug: string;
  pageContent: PageContent;
}

export const callouts: Callout[] = [
  {
    name: 'Spiele immer günstiger bekommen',
    description: 'keyforsteam.de',
    imageSrc: '/images/kaysteam.jpeg',
    imageAlt: 'KeyForSteam Screenshot - Spiele günstiger kaufen',
    slug: 'keyforsteam',
    pageContent: {
      title: 'Spiele immer günstiger bekommen',
      subtitle: 'keyforsteam.de',
      imagePath: '/images/steam.png',
      imageAlt: 'KeyForSteam Screenshot',
      content: [
        {
          text: 'Wer meinen Kanal schon länger verfolgt, hat bestimmt schon mal von idealo oder Geizhals gehört. So etwas ähnliches gibt es auch für Spiele mit Keyforsteam.',
          type: 'paragraph'
        },
        {
          text: 'Meine PC Spiele hole ich immer von dort. Allerdings muss man bei Konsolen spielen aufpassen, dass man nicht die englische Version erwischt.',
          type: 'paragraph'
        }
      ],
      button: {
        text: 'Zu Keyforsteam',
        link: 'https://www.keyforsteam.de'
      }
    }
  },
  {
    name: 'Produktivität steigern',
    description: 'Tipps und Tools für mehr Produktivität',
    imageSrc: '/images/gameboy.jpg',
    imageAlt: 'Produktivitäts-Tools und Notizen auf einem Schreibtisch',
    slug: 'produktivitaet',
    pageContent: {
      title: 'Produktivität steigern',
      subtitle: 'Wie du effektiver arbeitest und mehr erreichst',
      imagePath: '/images/gameboy.jpg',
      imageAlt: 'Produktivitäts-Tools und Notizen auf einem Schreibtisch',
      content: [
        {
          text: 'Produktivität ist der Schlüssel zum Erfolg',
          type: 'heading'
        },
        {
          text: 'In der heutigen schnelllebigen Welt ist es wichtiger denn je, seine Zeit effektiv zu nutzen. Hier sind meine Top-Tipps für mehr Produktivität:',
          type: 'paragraph'
        },
        {
          type: 'list',
          text: 'Wichtige Produktivitäts-Techniken:',
          items: [
            'Pomodoro-Technik für fokussiertes Arbeiten',
            'Eisenhower-Matrix für besseres Prioritäten-Management',
            'Time-Blocking für strukturierte Tagesplanung',
            'Regelmäßige Pausen für nachhaltige Leistung'
          ]
        },
        {
          text: 'Mit diesen Methoden und den richtigen Tools kannst du deine Produktivität deutlich steigern und mehr aus deinem Tag herausholen.',
          type: 'paragraph'
        }
      ],
      button: {
        text: 'Mehr Produktivitäts-Tipps',
        link: '/blog/productivity'
      }
    }
  },

];
