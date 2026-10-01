import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactWidget } from "@/components/ContactWidget";
import { certifications, education, experience, profile, siteUrl, skills } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: profile.role,
    description: profile.tagline,
    path: "/",
  }),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  metadataBase: new URL(siteUrl),
};

const personId = `${siteUrl}/#person`;
const [city, country] = profile.location.split(", ");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      jobTitle: profile.role,
      description: profile.summary,
      url: siteUrl,
      image: `${siteUrl}/og-image.png`,
      email: `mailto:${profile.email}`,
      sameAs: [profile.github, profile.linkedin],
      address: { "@type": "PostalAddress", addressLocality: city, addressCountry: country },
      worksFor: { "@type": "Organization", name: experience[0].company },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: education.school },
        ...experience.slice(1).map((role) => ({ "@type": "Organization", name: role.company })),
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: profile.role,
        occupationLocation: { "@type": "City", name: city },
        skills: skills.flatMap((group) => group.items).join(", "),
      },
      knowsAbout: [...new Set(["Test Automation", "Accessibility (WCAG 2.1 AA)", ...skills.slice(0, 3).flatMap((g) => g.items)])],
      hasCredential: certifications.map((name) => ({
        "@type": "EducationalOccupationalCredential",
        name,
        credentialCategory: "certificate",
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} — ${profile.role}`,
      description: profile.tagline,
      inLanguage: "en",
      author: { "@id": personId },
      publisher: { "@id": personId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={structuredData} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ContactWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
