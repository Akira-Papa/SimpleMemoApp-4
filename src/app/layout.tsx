import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'メモアプリ',
  description: 'シンプルなメモアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="min-h-screen bg-white dark:bg-gray-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
