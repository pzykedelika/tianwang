import { getYouTubeAutoplayEmbedUrl } from "@/lib/utils";

export interface Project {
  id: string;
  title: string;
  description: string;
  /** YouTube/Vimeo embed URL, or local path like "/videos/file.mp4" */
  media: string | null;
  /** "youtube" | "vimeo" | "local" */
  mediaType: "youtube" | "vimeo" | "local" | null;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  projects: Project[];
}

export const brands: Brand[] = [
  {
    id: "st-peters-college",
    name: "St Peter's College",
    description:
      "Capturing the identity and spirit of one of Adelaide's most prestigious institutions.",
    projects: [
      {
        id: "spc-summer-intercol",
        title: "Summer Intercol",
        description: "Match-day highlights capturing the intensity of intercol competition.",
        media: getYouTubeAutoplayEmbedUrl("--GjpQRF4EE"),
        mediaType: "youtube",
      },
      {
        id: "spc-concert",
        title: "Concert",
        description: "Cinematic coverage of live musical performance.",
        media: getYouTubeAutoplayEmbedUrl("XSwKn42et64"),
        mediaType: "youtube",
      },
    ],
  },
  {
    id: "pure-blanks",
    name: "Pure Blanks",
    description:
      "Brand content and product visuals for Pure Blanks.",
    projects: [],
  },
  {
    id: "simple-tuition",
    name: "Simple Tuition",
    description:
      "Creative content for Simple Tuition.",
    projects: [],
  },
  {
    id: "personal",
    name: "Personal Projects",
    description:
      "Self-directed creative work exploring new techniques, ideas, and visual storytelling.",
    projects: [],
  },
];

export const services = [
  {
    title: "Videography",
    description:
      "Cinematic video production from concept to final cut. Corporate films, brand stories, event coverage, and creative content.",
  },
  {
    title: "Photography",
    description:
      "High-end photography for brands, events, and editorial. Capturing moments with precision and artistic vision.",
  },
  {
    title: "Web Creation",
    description:
      "Modern, responsive websites built with cutting-edge technology. From design to deployment, crafted for performance.",
  },
];

export const socialLinks = {
  email: "hello@tianwang.com",
  instagram: "https://instagram.com/tianwang",
  linkedin: "https://www.linkedin.com/in/tian-wang-93a8b6369/",
};
