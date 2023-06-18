import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { AuthContextProvider } from '@/common/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
    title: 'Collabrary',
    description: 'Blockchain Library',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={roboto.className} suppressHydrationWarning={true}>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </body>
        </html>
    )
}
