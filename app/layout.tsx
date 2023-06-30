import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { AuthContextProvider } from '@/common/context/AuthContext'
import { UserContextProvider } from '@/common/context/UserContext'
import { CollabraryContextProvider } from '@/common/context/CollabraryContext'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
    title: 'Collabrary',
    description: 'Blockchain Library'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={roboto.className} suppressHydrationWarning={true}>
            <AuthContextProvider>
                <UserContextProvider>
                    <CollabraryContextProvider>
                        { children }
                    </CollabraryContextProvider>
                </UserContextProvider>
            </AuthContextProvider>
        </body>
        </html>
    )
}
