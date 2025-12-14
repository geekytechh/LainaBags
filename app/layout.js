import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Cormorant_Garamond,
  Parisienne,
  Inter,
  Poppins,
} from "next/font/google";

// Modern sans-serif font for body text
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

// Clean, modern sans-serif alternative
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

// Premium heading font - Elegant serif
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-cormorant",
});

// Premium cursive logo font
const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-parisienne",
});

export const metadata = {
  title: "SEARCH BAGS - Premium Bag Manufacturer & Wholesaler",
  description:
    "Established in 2007, Search Bag is a leading manufacturer and wholesaler of premium messenger bags, backpacks, and more. Find the perfect bag for every occasion.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: 'https://www.searchbag.in',
  },
};

export default function RootLayout({ children }) {
  const mainBgStyle = {
    background: "linear-gradient(to bottom, #fafafa, #f4f4f2)",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${cormorant.variable} ${parisienne.variable}`}
    >
      <head>
        <link rel="icon" type="image/png" href="/images/search.png" />
        <title>SEARCH BAGS - Premium Bag Manufacturer & Wholesaler</title>
        <meta
          name="description"
          content="Established in 2007, Search Bag is a leading manufacturer and wholesaler of premium messenger bags, backpacks, and more. Find the perfect bag for every occasion."
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.searchbag.in" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SEARCH BAGS - Premium Bag Manufacturer & Wholesaler" />
        <meta property="og:description" content="Established in 2007, Search Bag is a leading manufacturer and wholesaler of premium messenger bags, backpacks, and more. Find the perfect bag for every occasion." />
        <meta property="og:url" content="https://www.searchbag.in" />
        <meta property="og:site_name" content="SEARCH BAGS" />
        <meta property="og:image" content="https://www.searchbag.in/images/search.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body style={mainBgStyle}>
        <ClerkProvider>
          <AppContextProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                className: "",
                duration: 5000,
                style: {
                  background: "#fff",
                  color: "#333",
                },
                success: {
                  duration: 3000,
                  style: {
                    background: "#10b981",
                    color: "#fff",
                  },
                },
                error: {
                  duration: 3000,
                  style: {
                    background: "#ef4444",
                    color: "#fff",
                  },
                },
              }}
            />
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
