import Header from "@/components/Header/index";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata = {
  title: "Job Portal",
  description: "Develop by Gamneeds company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <AuthProvider>
          <Header />
          <main> {children}</main>
          <Footer />
          <ScrollToTop />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
