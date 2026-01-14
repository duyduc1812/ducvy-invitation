import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thiệp mời cưới Duy Đức & Hà Vy",
  description: "Trân trọng kính mời bạn đến chung vui cùng chúng tôi 💍",
  metadataBase: new URL("https://ducvy-invitation.vercel.app"),
  openGraph: {
    title: "Thiệp mời cưới Duy Đức & Hà Vy",
    description: "Trân trọng kính mời bạn đến chung vui cùng chúng tôi 💍",
    url: "https://ducvy-invitation.vercel.app",
    siteName: "Duc & Vy Wedding Invitation",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Thiệp mời cưới Duy Đức & Hà Vy",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp mời cưới Duy Đức & Hà Vy",
    description: "Trân trọng kính mời bạn đến chung vui cùng chúng tôi 💍",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
