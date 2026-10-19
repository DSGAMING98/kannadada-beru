import type { Metadata, Viewport } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: { default: "ಕನ್ನಡದ ಬೇರು · Kannadada Beru", template: "%s · ಕನ್ನಡದ ಬೇರು" },
  description: "A living Kannada language atlas for words, regional voices, culture, and memory.",
  metadataBase: new URL("https://kannadada-beru.vercel.app"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "ಕನ್ನಡದ ಬೇರು · Kannadada Beru",
    description: "Explore Kannada words, regional voices, culture, and memory across Karnataka.",
    images: [{ url: "/brand/kannadada-beru-logo.webp", width: 1024, height: 1024, alt: "Kannadada Beru official logo" }],
  },
};

export const viewport: Viewport = { themeColor: "#7a1f2b", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kn" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ · Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <footer className="site-footer"><div className="shell"><p lang="kn">ನುಡಿ ಉಳಿದರೆ ನೆನಪು ಉಳಿಯುತ್ತದೆ.</p><span>ಕರ್ನಾಟಕದ ನುಡಿ · ನೆಲ · ನೆನಪು &nbsp;·&nbsp; Language · Land · Memory</span></div></footer>
        <BottomNav />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
