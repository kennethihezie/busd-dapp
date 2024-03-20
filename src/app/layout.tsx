import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../styles/globals.css'
import { Web3ModalProvider } from '../lib/providers/web3provider'

const poppins = Poppins({subsets: ['latin'], weight: '400'})

export const metadata: Metadata = {
  title: 'BUSD Dapp',
  description: 'Developed by collins ihezie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Web3ModalProvider>
            { children }
        </Web3ModalProvider>
      </body>
    </html>
  )
}
