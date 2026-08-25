import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  weight: ["700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/hannan7866"),
  title: "Abdul Hannan — Full-Stack Developer | Software Engineer",
  description:
    "Full-Stack Developer & Software Engineer building real-world products, business systems, and interactive web experiences. 1.5+ years hands-on experience, 1,000+ real-world transactions, Python, React, Next.js, Node.js, SQL, AI/LLMs.",
  keywords: [
    "Abdul Hannan",
    "Full-Stack Developer",
    "Software Engineer",
    "Python Developer",
    "Python",
    "Tkinter",
    "SQLite",
    "ReportLab",
    "REST API",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "EJS",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "ScrollTrigger",
    "Lenis",
    "Canvas",
    "PostgreSQL",
    "SQL",
    "Supabase",
    "Git",
    "GitHub",
    "Generative AI",
    "LLM",
    "RAG",
    "Full-Stack Development",
    "Backend Development",
    "Frontend Development",
    "Database Design",
    "API Integration",
    "Automation",
    "ERP",
    "CRM",
    "CRUD",
    "MVC",
    "SSR",
    "Responsive Web Design",
    "Lala Motors",
  ],
  authors: [{ name: "Abdul Hannan", url: "https://github.com/hannan7866" }],
  openGraph: {
    title: "Abdul Hannan — Full-Stack Developer | Software Engineer",
    description:
      "Building real-world products, offline-first business systems, and interactive web experiences. 1,000+ real-world transactions processed.",
    url: "https://github.com/hannan7866",
    siteName: "Abdul Hannan Portfolio",
    images: [
      {
        url: "/images/avatar_3d.jpg.png",
        width: 1200,
        height: 630,
        alt: "Abdul Hannan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Hannan — Full-Stack Developer | Software Engineer",
    description:
      "Building real-world products, offline-first business systems, and interactive web experiences. 1,000+ real-world transactions processed.",
    images: ["/images/avatar_3d.jpg.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdul Hannan",
  jobTitle: "Full-Stack Developer | Software Engineer",
  url: "https://github.com/hannan7866",
  sameAs: [
    "https://github.com/hannan7866",
    "https://linkedin.com/in/abdul-hannan-92a911405",
    "https://apple-vision-pro-experience.vercel.app/",
    "https://hannan7866-lalamotors-website-main.vercel.app/",
    "https://skillswap-main-one.vercel.app/",
    "https://tubaportfolio.vercel.app/",
  ],
  knowsAbout: [
    "Python",
    "Tkinter",
    "SQLite",
    "ReportLab",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "EJS",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "ScrollTrigger",
    "Lenis",
    "HTML5 Canvas",
    "PostgreSQL",
    "SQL",
    "Supabase",
    "Generative AI",
    "Large Language Models",
    "RAG",
    "Full-Stack Development",
    "Backend Development",
    "Database Architecture",
    "ERP Systems",
    "MVC Architecture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${syne.variable} ${caveat.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0d0d0f] text-[#ffffff] antialiased selection:bg-[#FF1E56] selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
