import { QueryProvider } from "@/providers/query-provider"
import { JetBrains_Mono } from "next/font/google";

import "@/app/globals.css" // ❗ Import Tailwind globale

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}