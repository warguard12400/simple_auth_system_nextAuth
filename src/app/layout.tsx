import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavComp from '@/components/my-components/nav'
import ToasterContext from '@/context/ToasterContext'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-secondary-foreground`}>
        <SessionProvider session={session}>
          <NavComp />

          {children}
          <ToasterContext />
        </SessionProvider>
      </body>
    </html>
  )
}
