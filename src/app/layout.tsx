import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import DeviceWrapper from '@hooks/DeviceWrapper'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "IDVACC CBT SITE",
  description: "CBT Website for Indonesia vACC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <DeviceWrapper>
          {children}
        </DeviceWrapper>
      </body>
    </html>
  );
}
