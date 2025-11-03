import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopr - Your Modern E-commerce Store",
  description: "Shop the latest products with our modern e-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen transition-colors duration-200">
              <Header />
              <main className="flex-1 w-full">
                {children}
              </main>
              <Footer />
              <Toaster 
                position="top-center"
                toastOptions={{
                  className: 'dark:bg-gray-800 dark:text-white'
                }}
              />
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
