export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html style={{margin:0,padding:0,background:"black",width:"100%",overflowX:"hidden"}}>
      <body style={{margin:0,padding:0,background:"black",width:"100%",overflowX:"hidden",minHeight:"100vh"}}>
        {children}
      </body>
    </html>
  )
}
