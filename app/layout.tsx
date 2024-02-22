import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Inter } from 'next/font/google'
import './globals.css'
import { ConvexClientProvider } from '@/providers/convex-client-provider'

import { Toaster } from '@/components/ui/sonner'
import { Loading } from '@/components/auth/loading'
import { ModelProvider } from '@/providers/model-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Miro Whiteboard',
  description: 'Realtime whiteboard for Collaboration!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModelProvider />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
