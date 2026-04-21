import { Gallery6 } from "@/components/ui/gallery6";

const projectItems = [
  {
    id: "venture-with-jerry",
    title: "Venture With Jerry",
    summary:
      "A living interview archive that turns conversations with investors into readable notes, visuals, and takeaways.",
    url: "/posts",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "open-source-builds",
    title: "Open Source Builds",
    summary:
      "Python and frontend experiments around research workflows, automation, and tools that support AI x finance curiosity.",
    url: "https://github.com/jerryjlwang",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ai-finance-notes",
    title: "AI x Finance Notes",
    summary:
      "A growing collection of ideas on where machine intelligence meets investing, diligence, and operating systems for builders.",
    url: "/resume",
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "community-building",
    title: "Community Building",
    summary:
      "An ongoing effort to connect with founders, operators, and investors while documenting the network behind the journey.",
    url: "https://www.linkedin.com/in/jerry-wang-21a282368/",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "personal-systems",
    title: "Personal Systems",
    summary:
      "Projects shaped by golf, writing, experimentation, and the process of turning curiosity into repeatable habits.",
    url: "/resume",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function FeaturedProjectsGallery() {
  return (
    <Gallery6
      heading="Featured Projects"
      animateHeading
      headingClassName="font-normal"
      demoUrl="https://github.com/jerryjlwang"
      demoLabel="Visit GitHub"
      demoMode="github-icon"
      items={projectItems}
    />
  );
}
