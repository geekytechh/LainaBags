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
  title: "Laina Bags - Premium Bag Manufacturer & Wholesaler | Since 2010",
  description:
    "Established in 2010, Laina Bags is Mumbai's trusted manufacturer and wholesaler of premium soft luggage, backpacks, and bags. Quality craftsmanship at competitive prices.",
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
    canonical: 'https://www.lainabags.com',
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
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />

        {/* Primary Meta Tags */}
        <title>Laina Bags - Premium Bag Manufacturer & Wholesaler | Mumbai</title>
        <meta
          name="description"
          content="Established in 2010, Laina Bags is Mumbai's trusted manufacturer and wholesaler of premium soft luggage, backpacks, laptop bags, hiking bags, and duffel bags. Quality craftsmanship at competitive prices."
        />
        <meta name="keywords" content="bags manufacturer Mumbai, wholesale bags India, backpacks manufacturer, laptop bags wholesale, hiking bags, duffel bags, premium bags Mumbai, bag factory Mumbai, soft luggage manufacturer, Laina Bags, Byculla bags" />
        <meta name="author" content="Laina Bags" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="zQi-1ECEzquaV5q4ZCcZa74q1a1hnzPi-3t8IxKBMsw" />
        <link rel="canonical" href="https://www.lainabags.com" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="18.9712;72.8147" />
        <meta name="ICBM" content="18.9712, 72.8147" />

        {/* Open Graph / Facebook */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Laina Bags - Premium Bag Manufacturer & Wholesaler | Mumbai" />
        <meta property="og:description" content="Established in 2010, Laina Bags is Mumbai's trusted manufacturer and wholesaler of premium soft luggage, backpacks, laptop bags, hiking bags, and duffel bags. Quality craftsmanship at competitive prices." />
        <meta property="og:url" content="https://www.lainabags.com" />
        <meta property="og:site_name" content="Laina Bags" />
        <meta property="og:image" content="https://www.lainabags.com/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Laina Bags - Premium Bag Manufacturer & Wholesaler" />
        <meta name="twitter:description" content="Mumbai's trusted manufacturer of premium bags since 2010. Quality craftsmanship at competitive prices." />
        <meta name="twitter:image" content="https://www.lainabags.com/images/logo.png" />

        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Laina Bags",
            "image": "https://www.lainabags.com/images/logo.png",
            "@id": "https://www.lainabags.com",
            "url": "https://www.lainabags.com",
            "telephone": "+917045010589",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Room No. 1, Chawl 12, Byculla Station Rd, Near Star of India Hotel",
              "addressLocality": "Byculla",
              "addressRegion": "Mumbai",
              "postalCode": "400011",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 18.9712,
              "longitude": 72.8147
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "21:00"
            },
            "sameAs": [
              "https://www.facebook.com/lainabags",
              "https://www.instagram.com/lainabags"
            ]
          })}
        </script>

        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Laina Bags",
            "url": "https://www.lainabags.com",
            "logo": "https://www.lainabags.com/images/logo.png",
            "foundingDate": "2010",
            "description": "Premium bag manufacturer and wholesaler in Mumbai, India. Specializing in backpacks, laptop bags, hiking bags, and duffel bags.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Room No. 1, Chawl 12, Byculla Station Rd",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "400011",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+917045010589",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi"]
            }
          })}
        </script>
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
