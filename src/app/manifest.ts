import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdul Hannan — Full-Stack Developer Portfolio",
    short_name: "Abdul Hannan",
    description:
      "Full-Stack Developer & Software Engineer building production web apps, offline ERP systems, and AI-powered solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#16191C",
    theme_color: "#16191C",
    icons: [
      {
        src: "/images/Abdul-Image.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/images/Abdul-Image.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
