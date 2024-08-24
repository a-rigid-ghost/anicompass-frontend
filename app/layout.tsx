import "./global.css";

export const metadata = {
  title: 'AniCompass',
  description: 'Anime Reccommender',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
