import { Gallery6 } from "@/components/ui/gallery6";

const projectItems = [
  {
    id: "MedSim",
    title: "MedSim",
    summary:
      "Deploying agent swarms into Trauma center world models. Harvard HSIL Hackathon Innovation Prize winner.",
    url: "https://github.com/jerryjlwang/medsim",
    image:
      "https://news.vcu.edu/image/425b5473-af45-4b85-b55b-2e63a9d203ba",
  },
  {
    id: "PitchFork Directory",
    title: "PitchFork Directory",
    summary:
      "2M+ startup feature characteristics compiled/imputed.",
    url: "https://huggingface.co/datasets/jerryjwang/PitchFork_Directory",
    image:
      "https://www.usepitchfork.com/_assets/v11/ae6f286f11759f1d2390dfa06302fd672ccc23c2.png",
  },
  {
    id: "Annotagent",
    title: "Annotagent",
    summary:
      "Agentic annotation compiler for arXiv.",
    url: "https://annotagent.vercel.app",
    image:
      "https://blog.arxiv.org/files/2021/02/arxiv-logo-1.png",
  },
  {
    id: "OneSixOne Ventures",
    title: "OneSixOne Ventures",
    summary:
      "Redesigned and built OneSixOne Ventures' web platform from ideation to launch. Will support deal flow, event sponsorships, and fund expansion.",
    url: "https://onesixone.ventures",
    image:
      "https://media.licdn.com/dms/image/v2/D4D0BAQGBcVqq8tTIdQ/company-logo_200_200/B4DZX0l9WmGkAI-/0/1743565346614/onesixone_ventures_logo?e=2147483647&v=beta&t=Ub0A8C1xizCvx262yuTiZSwh1SvImBpBNKXS5ksp4Vo",
  },
  {
    id: "AI Research",
    title: "AI Research",
    summary:
      "Leveraging computational geometry and stochastic physics for model training and sampling.",
    url: "/resume",
    image:
      "https://as2.ftcdn.net/jpg/01/64/60/49/1000_F_164604915_lfoT9BDk9UzTpm14HHZw7hDSJml7A7om.jpg",
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
