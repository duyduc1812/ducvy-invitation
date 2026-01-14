import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://ducvy-invitation.vercel.app";
const OG_IMAGE = `${SITE_URL}/ogv2.jpg`;

export const metadata: Metadata = {
  title: "Thiệp mời cưới Duy Đức & Hà Vy",
  description: "Trân trọng kính mời bạn đến chung vui cùng chúng tôi 💍",
  metadataBase: new URL(SITE_URL),

  openGraph: {
    title: "Thiệp mời cưới Duy Đức & Hà Vy",
    description: "Trân trọng kính mời bạn đến chung vui cùng chúng tôi 💍",
    url: SITE_URL,
    siteName: "Duc & Vy Wedding Invitation",
    images: [
      {
        url: OG_IMAGE,
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
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
	  <head>
	    <meta property="og:image" content="https://ducvy-invitation.vercel.app/ogv2.jpg">
	  </head>
      <body>{children}</body>
    </html>
  );
}
