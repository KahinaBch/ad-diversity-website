import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "AD Diversity Research | GBM6330E",
  description: "Inclusion of diversity in the prevention and diagnosis of neurodegenerative diseases: the example of Alzheimer's disease.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('theme') || 'system';
            var r = t === 'system'
              ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
              : t;
            document.documentElement.setAttribute('data-theme', r);
          })();
        `}} />
      </head>
      <body>
        <ThemeProvider>
          <NavBar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
