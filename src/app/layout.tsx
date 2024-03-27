import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// importing clerk provider to wrap whole project with auth
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grumble | Feast Your Eyes",
  description: "Created by Stephen Howe, Max Emerson, Tom Gendall, Ross Gray",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // wrapping all html with auth
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
