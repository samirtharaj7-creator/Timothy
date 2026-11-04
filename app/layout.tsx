import type { Metadata } from "next";
import { GlobalFooter, GlobalShell } from "@/components/global-shell";
import { ReadingProgressBar } from "@/components/reading-progress";
import { RouteStyling } from "@/components/route-styling";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import "./global-shell.css";
import "./timothy-illustrated.css";
import "./background-content.css";
import "./timothy-reader.css";

export const metadata: Metadata = {
  title: {
    default: "1 & 2 Timothy Study",
    template: "%s | 1 & 2 Timothy Study"
  },
  description:
    "Study 1 Timothy and 2 Timothy with KJV chapter text, verse commentary, historical context, and practical application.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://timothy.mybibleexplorer.com")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@400;500;600&display=swap"
        />
      </head>
      <body className="mbe-shell-managed" data-timothy-route="home">
        <RouteStyling />
        <GlobalShell />
        <ReadingProgressBar />
        <SiteHeader />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
