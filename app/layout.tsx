export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, background:"white", fontFamily:"Arial"}}>{children}</body>
    </html>
  )
}
