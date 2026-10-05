import './globals.css';

export const metadata = {
  title: "Livescore",
  description: "Real-time football scores, fixtures & standings from top leagues worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{background:"#0e0e0e", color:"white", margin:0}}>
        {children}
      </body>
    </html>
  );
}
