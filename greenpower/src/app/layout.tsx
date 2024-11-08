import './layout/global.css';
import type { Metadata } from "next";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './layout/layout.module.css';

export const metadata: Metadata = {
  title: "GreenPower",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={styles.rootLayout}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
