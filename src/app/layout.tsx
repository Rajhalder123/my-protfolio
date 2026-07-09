import type { Metadata, Viewport } from 'next';
import './globals.css';

import { profile, projects, skills } from '@/data/portfolio';

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: 'Raj Haldar | Full-Stack Developer & AI Engineer',
    template: '%s | Raj Haldar',
  },
  description:
    'Premium portfolio of Raj Haldar, a full-stack developer and AI engineer building React, Next.js, Node.js, Python, Firebase, and AI products.',
  keywords: [
    'Raj Haldar',
    'Full Stack Developer',
    'AI Engineer',
    'React Developer',
    'Next.js Developer',
    'MERN Stack',
    'Portfolio',
    'Web Developer India',
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.siteUrl,
    siteName: 'Raj Haldar Portfolio',
    title: 'Raj Haldar | Full-Stack Developer & AI Engineer',
    description:
      'Case studies, engineering notes, AI products, realtime systems, and premium interface work by Raj Haldar.',
    images: [
      {
        url: '/brand-icon.svg',
        width: 1200,
        height: 630,
        alt: 'Raj Haldar portfolio brand mark',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Haldar | Full-Stack Developer & AI Engineer',
    description: 'Premium full-stack and AI engineering portfolio.',
    images: ['/brand-icon.svg'],
  },
  icons: {
    icon: '/brand-icon.svg',
    apple: '/brand-icon.svg',
  },
  verification: {
    google: 'qa3Kpr2oTNXC19386okUh7dI0ZLDtz5KAfiEckWMfQU',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050608',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.portrait}`,
  jobTitle: profile.role,
  email: profile.email,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: skills.flatMap((category) => category.tools.map((tool) => tool.name)),
  hasPart: projects.map((project) => ({
    '@type': 'CreativeWork',
    name: project.title,
    url: `${profile.siteUrl}/project/${project.slug}`,
    description: project.summary,
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
