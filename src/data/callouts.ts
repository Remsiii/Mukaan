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
  category: 'tipps' | 'pc' | 'angebote' | 'apps';  // neue Zeile
  pageContent: PageContent;
}

export const callouts: Callout[] = [
  {
    name: 'Spiele immer günstiger bekommen',
    description: 'keyforsteam.de',
    imageSrc: '/Mukaan/images/kaysteam.jpeg',
    imageAlt: 'KeyForSteam Screenshot - Spiele günstiger kaufen',
    slug: 'keyforsteam',
    category: 'angebote',
    pageContent: {
      title: 'Spiele immer günstiger bekommen',
      subtitle: 'keyforsteam.de',
      imagePath: '/Mukaan/images/steam.png',
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
    imageSrc: '/Mukaan/images/gameboy.jpg',
    imageAlt: 'Produktivitäts-Tools und Notizen auf einem Schreibtisch',
    slug: 'produktivitaet',
    category: 'tipps',
    pageContent: {
      title: 'Produktivität steigern',
      subtitle: 'Wie du effektiver arbeitest und mehr erreichst',
      imagePath: '/Mukaan/images/gameboy.jpg',
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
        link: 'https://www.instant-gaming.com/de/playstation/gaming-karten/'
      }
    }
  },
  {
    name: 'Gaming Setup Guide',
    description: 'Das perfekte Gaming Setup zusammenstellen',
    imageSrc: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1170&auto=format&fit=crop',
    imageAlt: 'Modern Gaming Setup mit RGB Beleuchtung',
    slug: 'gaming-setup',
    category: 'pc',
    pageContent: {
      title: 'Das ultimative Gaming Setup',
      subtitle: 'Von Budget bis High-End',
      imagePath: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1170&auto=format&fit=crop',
      imageAlt: 'Gaming Setup mit mehreren Monitoren und RGB Beleuchtung',
      content: [
        {
          text: 'Dein perfektes Gaming-Setup',
          type: 'heading'
        },
        {
          text: 'Ein optimales Gaming-Setup ist mehr als nur ein schneller PC. Hier erfährst du, worauf es wirklich ankommt:',
          type: 'paragraph'
        },
        {
          type: 'list',
          text: 'Essenzielle Komponenten:',
          items: [
            'Ergonomischer Gaming-Stuhl für lange Sessions',
            'Optimale Monitor-Positionierung',
            'Professionelle Beleuchtung',
            'Kabel-Management Tipps'
          ]
        }
      ],
      button: {
        text: 'Setup Guide ansehen',
        link: 'https://www.instant-gaming.com/de/playstation/gaming-karten/'
      }
    }
  },
  {
    name: 'Software Essentials',
    description: 'Must-Have Programme für Windows',
    imageSrc: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1074&auto=format&fit=crop',
    imageAlt: 'Windows Desktop mit verschiedenen Programmen',
    slug: 'software-essentials',
    category: 'apps',
    pageContent: {
      title: 'Windows Software Essentials',
      subtitle: 'Die wichtigsten Programme für deinen PC',
      imagePath: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1074&auto=format&fit=crop',
      imageAlt: 'Moderne Windows Benutzeroberfläche',
      content: [
        {
          text: 'Must-Have Software für Windows',
          type: 'heading'
        },
        {
          text: 'Diese Programme sollte jeder Windows-Nutzer installiert haben:',
          type: 'paragraph'
        },
        {
          type: 'list',
          text: 'Empfohlene Programme:',
          items: [
            'Sicherheits-Software und Antivirus',
            'Produktivitäts-Tools',
            'System-Optimierung',
            'Multimedia-Programme'
          ]
        }
      ],
      button: {
        text: 'Zur Software-Liste',
        link: 'https://www.instant-gaming.com/de/playstation/gaming-karten/'
      }
    }
  },
  {
    name: 'Streaming Guide',
    description: 'Start your Streaming Career',
    imageSrc: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=1170&auto=format&fit=crop',
    imageAlt: 'Streaming Setup mit Mikrofon und Kamera',
    slug: 'streaming',
    category: 'tipps',
    pageContent: {
      title: 'Streaming für Anfänger',
      subtitle: 'Von 0 auf 100 Follower',
      imagePath: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=1170&auto=format&fit=crop',
      imageAlt: 'Professionelles Streaming Equipment',
      content: [
        {
          text: 'Dein Weg zum erfolgreichen Streamer',
          type: 'heading'
        },
        {
          text: 'Streaming ist mehr als nur spielen und reden. Diese Grundlagen brauchst du:',
          type: 'paragraph'
        },
        {
          type: 'list',
          text: 'Streaming Basics:',
          items: [
            'OBS Einrichtung und Optimierung',
            'Mikrofonaufnahme verbessern',
            'Overlay und Alerts erstellen',
            'Community aufbauen'
          ]
        }
      ],
      button: {
        text: 'Streaming Guide lesen',
        link: 'https://www.instant-gaming.com/de/playstation/gaming-karten/'
      }
    }
  },
  {
    name: 'Tech News',
    description: 'Aktuelle Tech-News und Reviews',
    imageSrc: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1170&auto=format&fit=crop',
    imageAlt: 'Laptop mit Tech News auf dem Bildschirm',
    slug: 'tech-news',
    category: 'tipps',
    pageContent: {
      title: 'Tech News & Reviews',
      subtitle: 'Aktuelle Entwicklungen in der Tech-Welt',
      imagePath: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1170&auto=format&fit=crop',
      imageAlt: 'Tech News Dashboard',
      content: [
        {
          text: 'Bleib auf dem neuesten Stand',
          type: 'heading'
        },
        {
          text: 'Die Tech-Welt entwickelt sich ständig weiter. Hier findest du die wichtigsten News und Reviews:',
          type: 'paragraph'
        },
        {
          type: 'list',
          text: 'Aktuelle Themen:',
          items: [
            'Hardware Neuerscheinungen',
            'Software Updates',
            'Gaming News',
            'Tech Reviews'
          ]
        }
      ],
      button: {
        text: 'Zu den News',
        link: '/blog/tech-news'
      }
    }
  },
  {
    name: 'Mechanische Tastaturen',
    description: 'Guide für mechanische Tastaturen',
    imageSrc: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // neuer Bildpfad
    imageAlt: 'RGB Mechanische Tastatur',
    slug: 'keyboard-guide',
    category: 'pc',
    pageContent: {
      title: 'Mechanische Tastaturen Guide',
      subtitle: 'Finde die perfekte Tastatur',
      imagePath: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // neuer Bildpfad
      imageAlt: 'RGB Mechanische Tastatur Nahaufnahme',
      content: [
        {
          text: 'Der ultimative Guide für mechanische Tastaturen',
          type: 'heading'
        },
        {
          text: 'Die Wahl der richtigen mechanischen Tastatur kann dein Gaming- und Tipp-Erlebnis komplett verändern:',
          type: 'paragraph'
        },
        {
          type: 'list',
          text: 'Was du wissen musst:',
          items: [
            'Verschiedene Switch-Typen im Vergleich',
            'Hot-Swap vs. Verlötete Switches',
            'Die besten Tastaturen für jeden Preisbereich',
            'Modding und Customization Tipps'
          ]
        }
      ],
      button: {
        text: 'Zum Tastatur Guide',
        link: 'https://www.instant-gaming.com/de/playstation/gaming-karten/'
      }
    }
  },
  {
    name: 'Home Office Einrichtung',
    description: 'Perfektes Home Office Setup',
    imageSrc: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=1169&auto=format&fit=crop',
    imageAlt: 'Modernes Home Office Setup',
    slug: 'home-office',
    category: 'pc',
    pageContent: {
      title: 'Das perfekte Home Office',
      subtitle: 'Produktiv von Zuhause arbeiten',
      imagePath: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=1169&auto=format&fit=crop',
      imageAlt: 'Ergonomischer Arbeitsplatz',
      content: [
        {
          text: 'Home Office optimieren',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Wichtige Aspekte:',
          items: [
            'Ergonomische Möbel und deren richtige Einstellung',
            'Optimale Beleuchtung für lange Arbeitstage',
            'Die richtige Tech-Ausstattung',
            'Work-Life-Balance im Home Office'
          ]
        }
      ],
      button: {
        text: 'Home Office Guide',
        link: '/blog/home-office'
      }
    }
  },
  {
    name: 'Smartphone Fotografie',
    description: 'Bessere Fotos mit dem Smartphone',
    imageSrc: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$', // neuer Bildpfad
    imageAlt: 'Smartphone Kamera Close-up',
    slug: 'mobile-photography',
    category: 'tipps',
    pageContent: {
      title: 'Smartphone Fotografie Masterclass',
      subtitle: 'Professionelle Fotos mit dem Handy',
      imagePath: 'https://images.unsplash.com/photo-1579202673506-3a5294e09d6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // neuer Bildpfad
      imageAlt: 'Smartphone Kamera System',
      content: [
        {
          text: 'Fotografieren wie ein Profi',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Photography Basics:',
          items: [
            'Grundlagen der Smartphone-Fotografie',
            'Die besten Foto-Apps und Filter',
            'Nachtaufnahmen optimieren',
            'Bildbearbeitung auf dem Smartphone'
          ]
        }
      ],
      button: {
        text: 'Foto Guide ansehen',
        link: '/blog/mobile-photography'
      }
    }
  },
  {
    name: 'Smart Home',
    description: 'Dein Zuhause intelligent vernetzen',
    imageSrc: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1170&auto=format&fit=crop',
    imageAlt: 'Smart Home Devices',
    slug: 'smart-home',
    category: 'pc',
    pageContent: {
      title: 'Smart Home Guide',
      subtitle: 'Intelligentes Wohnen leicht gemacht',
      imagePath: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1170&auto=format&fit=crop',
      imageAlt: 'Smart Home Steuerung',
      content: [
        {
          text: 'Smart Home Automation',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Setup Guide:',
          items: [
            'Die besten Smart Home Systeme',
            'Beleuchtung automatisieren',
            'Sicherheit und Überwachung',
            'Energieeffizienz durch Automation'
          ]
        }
      ],
      button: {
        text: 'Smart Home Guide',
        link: '/blog/smart-home'
      }
    }
  },
  {
    name: 'Audio Setup',
    description: 'Perfekter Sound für Gaming & Musik',
    imageSrc: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1170&auto=format&fit=crop',
    imageAlt: 'Professionelles Audio Setup',
    slug: 'audio-guide',
    category: 'pc',
    pageContent: {
      title: 'Das perfekte Audio Setup',
      subtitle: 'Von Gaming bis Musikproduktion',
      imagePath: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1170&auto=format&fit=crop',
      imageAlt: 'Audio Equipment Setup',
      content: [
        {
          text: 'Audio Setup Guide',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Audio Essentials:',
          items: [
            'Kopfhörer vs. Lautsprecher Setup',
            'Die richtige Soundkarte wählen',
            'Mikrofonauswahl und Einrichtung',
            'Akustik-Optimierung des Raums'
          ]
        }
      ],
      button: {
        text: 'Audio Guide lesen',
        link: '/blog/audio-guide'
      }
    }
  },
  {
    name: 'GPU Übertaktung',
    description: 'Maximum Performance aus deiner Grafikkarte',
    imageSrc: 'https://www.proshop.at/Images/915x900/3275857_4e2b20b77e3c.png', // neuer Bildpfad
    imageAlt: 'Gaming Grafikkarte mit RGB Beleuchtung',
    slug: 'gpu-overclocking',
    category: 'pc',
    pageContent: {
      title: 'GPU Overclocking Guide',
      subtitle: 'Sicher und effektiv übertakten',
      imagePath: 'https://www.proshop.at/Images/915x900/3275857_4e2b20b77e3c.png', // neuer Bildpfad
      imageAlt: 'High-End Grafikkarte',
      content: [
        {
          text: 'Grafikkarten-Optimierung leicht gemacht',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Overclocking Basics:',
          items: [
            'Sichere Übertaktungsgrenzen finden',
            'Temperatur-Monitoring und Kühlung',
            'Benchmarking und Stabilitätstests',
            'VRAM und Power Limit Optimierung'
          ]
        }
      ],
      button: {
        text: 'Zum Overclocking Guide',
        link: '/blog/gpu-overclocking'
      }
    }
  },
  {
    name: 'Linux für Einsteiger',
    description: 'Der Umstieg auf Linux leicht gemacht',
    imageSrc: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Linux Terminal mit Code',
    slug: 'linux-guide',
    category: 'apps',
    pageContent: {
      title: 'Linux Einsteiger Guide',
      subtitle: 'Von Windows zu Linux',
      imagePath: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Linux Desktop Environment',
      content: [
        {
          text: 'Dein Start in die Linux-Welt',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Linux Grundlagen:',
          items: [
            'Die richtige Distribution wählen',
            'Wichtige Terminal-Befehle',
            'Software Installation und Updates',
            'Dual-Boot mit Windows einrichten'
          ]
        }
      ],
      button: {
        text: 'Linux Guide lesen',
        link: '/blog/linux-guide'
      }
    }
  },
  {
    name: 'Cloud Gaming',
    description: 'Gaming ohne High-End Hardware',
    imageSrc: 'https://assets-www.xbox.com/xbox-web/static/media/CloudGaming_LetterBox.scale-200.ef909bf4.png',
    imageAlt: 'Person spielt Spiele auf verschiedenen Geräten',
    slug: 'cloud-gaming',
    category: 'angebote',
    pageContent: {
      title: 'Cloud Gaming Guide',
      subtitle: 'Die Zukunft des Gaming',
      imagePath: 'https://assets-www.xbox.com/xbox-web/static/media/CloudGaming_LetterBox.scale-200.ef909bf4.png',
      imageAlt: 'Cloud Gaming Setup',
      content: [
        {
          text: 'Gaming von überall',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Cloud Gaming Essentials:',
          items: [
            'Dienste im Vergleich (GeForce NOW, Xbox Cloud, etc.)',
            'Internet-Anforderungen und Optimierung',
            'Controller und Peripherie',
            'Kosten und Abonnements'
          ]
        }
      ],
      button: {
        text: 'Cloud Gaming entdecken',
        link: '/blog/cloud-gaming'
      }
    }
  },
  {
    name: 'KI Tools',
    description: 'Künstliche Intelligenz im Alltag nutzen',
    imageSrc: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'KI generierte Kunst und Visualisierungen',
    slug: 'ai-tools',
    category: 'apps',
    pageContent: {
      title: 'KI Tools Guide',
      subtitle: 'Produktiver mit künstlicher Intelligenz',
      imagePath: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'KI Tools und Anwendungen',
      content: [
        {
          text: 'KI-Tools für jeden Einsatz',
          type: 'heading'
        },
        {
          type: 'list',
          text: 'Populäre KI-Anwendungen:',
          items: [
            'ChatGPT und andere Sprachmodelle',
            'KI-Bildgenerierung (DALL-E, Midjourney)',
            'KI für Produktivität und Automatisierung',
            'Kostenlose vs. Premium KI-Tools'
          ]
        }
      ],
      button: {
        text: 'KI Tools entdecken',
        link: '/blog/ai-tools'
      }
    }
  }
];
