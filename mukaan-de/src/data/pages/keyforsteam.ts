import { DetailPageProps } from '../../components/DetailPage'

export const keyForSteamContent: DetailPageProps = {
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
