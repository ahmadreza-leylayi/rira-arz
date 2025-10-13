
import  "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa:IR" dir="rtl">
      
      <body>
        {children}
      </body>
    </html>
  );
}
