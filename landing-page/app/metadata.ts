import { Metadata } from 'next'

// TODO: Substitua o valor abaixo pelo código fornecido pelo Google Search Console
// Exemplo: Se o Google fornecer:
// <meta name="google-site-verification" content="1234567890ABCDEF" />
// Você deve colocar apenas o valor do content: "1234567890ABCDEF"
const GOOGLE_SITE_VERIFICATION = 's62qwVhW9LFf6TaUOQMie6kF_0WcaZvGH3qGXBNHns8';

export const metadata: Metadata = {
  metadataBase: new URL('https://wodbot.cc'),
  title: {
    default: 'WodBot - Seu Personal Trainer de IA',
    template: '%s | WodBot'
  },
  description: 'Obtenha treinos personalizados e planos nutricionais que se adaptam às suas necessidades. Modifique exercícios, ajuste refeições e receba orientação quando precisar.',
  keywords: [
    'personal trainer',
    'treino personalizado',
    'plano alimentar',
    'fitness',
    'saúde',
    'bem-estar',
    'IA',
    'inteligência artificial',
    'exercícios',
    'nutrição',
    'academia',
    'treino em casa',
    'personal trainer online',
    'coach fitness',
    'plano de treino',
    'dieta personalizada',
    'treino com IA',
    'fitness tech',
    'saúde digital',
    'bem-estar digital'
  ],
  authors: [{ name: 'WodBot Team' }],
  creator: 'WodBot Team',
  publisher: 'WodBot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://wodbot.cc',
    siteName: 'WodBot',
    title: 'WodBot - Seu Personal Trainer de IA',
    description: 'Obtenha treinos personalizados e planos nutricionais que se adaptam às suas necessidades. Modifique exercícios, ajuste refeições e receba orientação quando precisar.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WodBot - Seu Personal Trainer de IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WodBot - Seu Personal Trainer de IA',
    description: 'Obtenha treinos personalizados e planos nutricionais que se adaptam às suas necessidades.',
    images: ['/og-image.png'],
    creator: '@wodbot',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Aqui é onde você coloca o código de verificação do Google Search Console
    google: GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://wodbot.cc',
  },
} 