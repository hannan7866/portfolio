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

const siteUrl = "https://portfolio-hannan7866s-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdul Hannan — Full-Stack Developer | Software Engineer Portfolio",
    template: "%s | Abdul Hannan",
  },
  description:
    "Official portfolio of Abdul Hannan — Full-Stack Developer & Software Engineer with 1.5+ years production experience building full-stack web applications, offline ERP billing engines (1,000+ transactions), AI/RAG systems, and high-performance interactive interfaces. React, Next.js, TypeScript, Node.js, Python, PostgreSQL.",
  applicationName: "Abdul Hannan Developer Portfolio",
  generator: "Next.js",
  keywords: [
    // Brand & Name Keywords
    "Abdul Hannan",
    "Abdul Hannan Portfolio",
    "Abdul Hannan Full Stack Developer",
    "Abdul Hannan Software Engineer",
    "Abdul Hannan Web Developer",
    "Abdul Hannan CV",
    "Abdul Hannan Resume",
    "hannan7866",
    "hannanwahid",

    // Core Role & Industry Search Keywords
    "Full Stack Developer",
    "Full Stack Developer Portfolio",
    "Software Engineer Portfolio",
    "Frontend Developer Portfolio",
    "Backend Developer Portfolio",
    "Full Stack Web Developer",
    "React Developer Portfolio",
    "Next.js Developer Portfolio",
    "TypeScript Developer Portfolio",
    "Python Developer Portfolio",
    "Best Full Stack Developer Portfolios",
    "Creative Developer Portfolio",
    "Modern Web Developer Portfolio",

    // Technology Stack Keywords
    "Next.js App Router Developer",
    "React.js 19 Developer",
    "Node.js Backend Engineer",
    "Express.js REST APIs",
    "Python SQLite ERP Developer",
    "PostgreSQL Supabase Database Architect",
    "MongoDB Full Stack Developer",
    "Tailwind CSS Framer Motion GSAP Animations",
    "HTML5 Canvas Interactive Experience",
    "Generative AI and RAG Pipeline Engineer",

    // Project & Case Study Keywords
    "Lala Motors Web Platform",
    "Lala Motors Offline ERP Billing System",
    "SkillSwap Time Banking Platform",
    "Apple Vision Pro Interactive Canvas",
    "DuoTech Engineering Matrix",
    "Tuba Khan Portfolio",
    "StayScape Vacation Rental App",

    // Location & Availability Keywords
    "Full Stack Developer India",
    "Software Engineer Delhi NCR",
    "Full Stack Developer Agra Gurugram",
    "Remote Full Stack Engineer Worldwide",
    "Hire Full Stack Developer",
    "Freelance Full Stack Web Developer",
    "Software Engineer 15 Days Notice Period",
  ],
  authors: [{ name: "Abdul Hannan", url: siteUrl }],
  creator: "Abdul Hannan",
  publisher: "Abdul Hannan",
  category: "technology",
  classification: "Software Engineering & Full Stack Web Development Portfolio",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Abdul Hannan — Full-Stack Developer & Software Engineer Portfolio",
    description:
      "Explore production systems, offline-first ERP engines (1,000+ real transactions), 3-tier project suite, and full-stack interactive case studies by Abdul Hannan.",
    url: siteUrl,
    siteName: "Abdul Hannan — Developer Portfolio",
    images: [
      {
        url: "/images/Abdul-Image.jpeg",
        width: 1200,
        height: 630,
        alt: "Abdul Hannan — Full-Stack Developer & Software Engineer",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Hannan — Full-Stack Developer & Software Engineer Portfolio",
    description:
      "Building real-world web apps, offline ERP business engines, and interactive web experiences. React, Next.js, Node.js, Python, PostgreSQL.",
    images: ["/images/Abdul-Image.jpeg"],
    creator: "@hannan7866",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/Abdul-Image.jpeg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abdul Hannan",
      givenName: "Abdul",
      familyName: "Hannan",
      jobTitle: "Full-Stack Developer & Software Engineer",
      description:
        "Full-Stack Developer & Software Engineer with 1.5+ years production experience building scalable web applications, offline ERP billing engines, and AI/RAG solutions.",
      url: siteUrl,
      image: `${siteUrl}/images/Abdul-Image.jpeg`,
      email: "mailto:dev.hannan.ai@gmail.com",
      telephone: "+91-7310542113",
      worksFor: {
        "@type": "Organization",
        name: "Lala Motors",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Dr. Bhimrao Ambedkar University (DBRAU) / Institute of Engineering and Technology, Agra",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Agra",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/hannan7866",
        "https://linkedin.com/in/abdul-hannan-92a911405",
        "https://lalamotors.vercel.app/",
        "https://duotech-portfolio.vercel.app/",
        "https://tubaportfolio.vercel.app/",
        "https://apple-vision-pro-experience.vercel.app/",
        "https://skillswap-main-one.vercel.app/",
      ],
      knowsAbout: [
        "Full-Stack Web Development",
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "Supabase",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP ScrollTrigger",
        "REST API Architecture",
        "Enterprise ERP Systems",
        "Generative AI & RAG Pipelines",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Full Stack Developer Certification (OneRoadmap)",
          credentialCategory: "Certification",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Data Analyst - Big 4 Ready Certification (OneRoadmap)",
          credentialCategory: "Certification",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abdul Hannan Developer Portfolio",
      alternateName: ["Abdul Hannan Full Stack Developer", "Abdul Hannan Portfolio"],
      description:
        "Official developer portfolio of Abdul Hannan showcasing production systems, 3-tier project suite, case studies, and engineering capabilities.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Abdul Hannan — Full-Stack Developer Profile",
      about: {
        "@id": `${siteUrl}/#person`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: "Featured Production & Engineering Projects",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Lala Motors Full-Stack Automotive Platform",
          description: "Production web platform supporting service bookings, customer accounts, spare parts commerce, and CRM synchronization with automated notifications.",
          url: "https://lalamotors.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lala Motors Offline-First ERP & Billing Engine",
          description: "Desktop ERP and billing system in Python, Tkinter, SQLite, and ReportLab processing 1,000+ real-world transactions.",
          url: "https://github.com/hannan7866/Lala_Motors_Desktop_Application",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Apple Vision Pro Interactive Canvas Showcase",
          description: "Interactive canvas-based frame rendering synchronized with scroll position using GSAP ScrollTrigger and Lenis smooth scroll.",
          url: "https://apple-vision-pro-experience.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "SkillSwap — Peer-to-Peer Time Banking Platform",
          description: "Skill exchange platform with time-banking credit system, user profiles, transaction workflows, React, TypeScript, Node.js, and MongoDB.",
          url: "https://skillswap-main-one.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "DuoTech — Engineering Matrix & Duo Platform",
          description: "High-performance collaborative engineering showcase combining systems engineering with interactive frontend craft.",
          url: "https://duotech-portfolio.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "StayScape — Full Stack Rental Platform",
          description: "Full-stack vacation rental application built with Node.js, Express, MongoDB, Mongoose, and MVC architecture.",
          url: "https://github.com/hannan7866",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faqpage`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do we get started on a project or role?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We start with a quick discovery discussion where you share your project goals, technical requirements, and timeline. From there, I propose the architectural approach, milestone roadmap, and immediate next steps.",
          },
        },
        {
          "@type": "Question",
          name: "What is your primary tech stack & capabilities?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "My core stack includes React.js, Next.js (App Router, Server Components & SSR), TypeScript/JavaScript, Node.js, Express.js, Python, PostgreSQL, MongoDB, SQLite, and Supabase. I also build Generative AI and RAG pipelines.",
          },
        },
        {
          "@type": "Question",
          name: "Do you have experience building offline-first systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! I engineered an offline-first desktop ERP and billing system in Python and SQLite for Lala Motors that has processed over 1,000+ real-world transactions with local database persistence and automated PDF invoice generation.",
          },
        },
        {
          "@type": "Question",
          name: "Are you available for full-time roles or contract projects?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. I am actively seeking Full-Stack Developer and Software Engineer opportunities (Remote, Hybrid, or On-site in India / Global) as well as selective high-impact freelance/consulting projects.",
          },
        },
        {
          "@type": "Question",
          name: "How do you approach database schema design & APIs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I follow strict normalization and indexing strategies for relational databases (PostgreSQL/SQLite), implement structured RESTful endpoints with input validation, JWT authentication, and automated error telemetry.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a typical project take to complete?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Depending on complexity, standalone web applications and API integrations typically take 1–3 weeks, while comprehensive enterprise ERPs and multi-tier platforms take 4–6 weeks with continuous milestone deliverables.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${syne.variable} ${caveat.variable} dark scroll-smooth`}
    >
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
