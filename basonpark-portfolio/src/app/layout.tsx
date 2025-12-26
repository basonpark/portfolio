import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { veronaSerial } from "./fonts";
import "./globals.css";
import { LayoutEffects } from "@/components/LayoutEffects";

const fontSans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

const navItems = [
  { name: "Home", url: "/", iconName: "Home" },
  { name: "Art", url: "/art", iconName: "Paintbrush" },
  { name: "Projects", url: "/projects", iconName: "Flame" },
  { name: "Quotes", url: "/quotes", iconName: "Quote" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${veronaSerial.variable}`}
      suppressHydrationWarning={true}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-[52rem] mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="relative flex min-h-screen flex-col">
              {/* Added responsive padding to account for fixed navbar */}
              <div className="flex-1 pb-24 sm:pb-0 sm:pt-24">{children}</div>
              <NavBar items={navItems} />
              <LayoutEffects /> {/* Include the effects component */}
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
