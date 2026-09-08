export const metadata = {
  title: 'Sanity Studio',
  description: 'Gérer le contenu de LCOM LUNETTE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
