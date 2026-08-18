import type { Metadata } from "next";
import "./globals.css";
import "./chat.css";
import "./whatsapp.css";
import "./email.css";
import "./profile.css";
import "./cybersecure360.css";
import "./download.css";

export const metadata: Metadata = {
  title: "Richmond Kwadwo Sarpong | Finance & GRC Portfolio",
  description: "Richmond Kwadwo Sarpong is a Chartered Accountant, Head of Finance, ISO Lead Auditor, business analytics and cybersecurity GRC practitioner in Ghana.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
