import './globals.css'
import ApiContext from '@/Context/ApiContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* <div className="bg-yellow-300 sm:bg-orange-400 md:bg-rose-500 lg:bg-red-600">
          .
        </div> */}
          <ApiContext>

            {children}
          </ApiContext>
      </body>
    </html>
  )
}
