import React from "react";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Script from "next/script";

export const metadata = {
  title: "Livescore",
  description: "Real-time football scores, fixtures & standings from top leagues worldwide",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rayhan:..."
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        {/* AdSense - MONEY */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        <Toaster position="top-right" toastOptions={{
          style: { background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", fontSize: "14px" }
        }} />
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
