import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/base.css";
import { SITE_CONFIG } from "@/lib/constants";
import { ErrorBoundaryWrapper } from "@/components/ErrorBoundaryWrapper";
import { AdminProvider } from "@/context/AdminContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - Backend & Full-Stack Developer | AWS Certified`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Backend Developer",
    "Full-Stack Developer",
    "FastAPI",
    "Node.js",
    "Python",
    "AWS",
    "Scalable Systems",
    "API Design",
    "Cloud Architecture",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "System Design",
    "Microservices",
    "Database Design",
    "RESTful APIs",
    "GraphQL",
    "DevOps",
    "Portfolio",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - Backend & Full-Stack Developer`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Backend Developer Portfolio`,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Backend & Full-Stack Developer`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@yourusername",
    site: "@yourusername",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  category: 'technology',
  classification: 'Portfolio',
  verification: {
    // Add your verification tokens when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (systemDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
            `,
          }}
        />
        <ErrorBoundaryWrapper>
        <AdminProvider>
        <ConditionalLayout>
            {children}
        </ConditionalLayout>
        </AdminProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}

