import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Potion Brewing Race",
  description: "Blockchain-powered potion brewing race — connect wallet and compete.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
