import {
  ArrowUpRight,
  Download,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import ParticleField from "@/components/ParticleField";
import { useTypewriter } from "@/hooks/useTypewriter";

const focusAreas = [
  "AI x finance research",
  "Venture capital interviews and startups",
  "Open source experimentation",
  "Geometry and stochastic physics",
];

const skillAreas = [
  "Python",
  "Financial analysis",
  "Matlab",
  "Spatial Encoding",
  "Computational Geometry",
  "Full-stack development",
];

const Resume = () => {
  const typedTitle = useTypewriter("Resume", 80, 120);

  return (
    <div className="terminal-page relative min-h-screen overflow-x-hidden bg-terminal-bg text-terminal-text">
      <div className="pointer-events-none fixed inset-0 z-0">
        <ParticleField />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 md:pt-40 lg:px-8">
        <section className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-terminal-border-hover bg-terminal-glass px-4 py-2 text-sm font-courier tracking-wide text-terminal-accent-soft">
              <FileText className="h-4 w-4" />
              Resume
            </div>
            <a
              href="/Jerry's_Resume.pdf"
              download="Jerry's_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-terminal-border-strong bg-terminal-glass px-4 py-2 text-sm font-courier tracking-wide text-terminal-text transition-colors hover:border-terminal-border-hover hover:bg-terminal-glass-strong hover:text-terminal-accent-soft"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>

          <h1 className="mb-5 text-4xl font-courier tracking-wide text-terminal-text md:text-5xl">
            {typedTitle}
          </h1>

          <p className="max-w-3xl text-lg font-courier leading-relaxed text-terminal-secondary md:text-xl">
            I'm a 4 time AIME qualifier, USACO Platinum division qualifier, and USAEO top 50 participant. I'm passionate about human-centered AI and spatial systems.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="rounded-[2rem] border border-terminal-border bg-terminal-panel p-8 shadow-terminal-panel backdrop-blur-sm">
            <div className="mb-5 inline-flex items-center gap-2 text-terminal-accent-soft">
              <Sparkles className="h-5 w-5" />
              <span className="font-courier text-sm uppercase tracking-[0.22em] text-terminal-accent-soft">
                Profile
              </span>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-terminal-border-hover bg-terminal-glass p-2 shadow-terminal-panel">
                <img
                  src="/lovable-uploads/jerry-resume-profile.jpeg"
                  alt="Jerry Wang profile"
                  className="h-40 w-40 rounded-full object-cover object-center md:h-48 md:w-48"
                />
              </div>
            </div>

            <h2 className="mb-4 text-center text-2xl font-courier text-terminal-text">
              Jerry Wang
            </h2>

            <div className="space-y-4 font-courier leading-relaxed text-terminal-secondary">
              <p>
                I am an incoming electrical engineering and computer sciences student at UC Berkeley with a
                growing interest in the intersection of AI, math, and stochastic problems.
              </p>
              <p>
                Over the last year, I have been learning through direct
                conversations with venture professionals, writing up insights,
                and building a body of work around curiosity-driven research.
              </p>
              <p>
                Outside of that, I spend time golfing, exploring business
                ideas, and building systems that turn learning into something
                shareable and repeatable.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-terminal-border bg-terminal-panel p-8 shadow-terminal-panel backdrop-blur-sm">
            <div className="mb-6 inline-flex items-center gap-2 text-terminal-accent-soft">
              <GraduationCap className="h-5 w-5" />
              <span className="font-courier text-sm uppercase tracking-[0.22em] text-terminal-accent-soft">
                Snapshot
              </span>
            </div>

            <div className="space-y-5 font-courier">
              <div>
                <div className="mb-1 text-sm uppercase tracking-[0.18em] text-terminal-muted">
                  Education
                </div>
                <div className="text-lg text-terminal-text">University of California, Berkeley</div>
                <div className="text-sm text-terminal-muted">
                  Berkeley, California
                </div>
                <div className="text-lg text-terminal-text">Interlake High School</div>
                <div className="text-sm text-terminal-muted">
                  Bellevue, Washington
                </div>
              </div>

              <div>
                <div className="mb-1 text-sm uppercase tracking-[0.18em] text-terminal-muted">
                  Focus
                </div>
                <div className="text-terminal-text">
                  AI, math, spatial systems
                </div>
              </div>

              <div>
                <div className="mb-1 text-sm uppercase tracking-[0.18em] text-terminal-muted">
                  Current direction
                </div>
                <div className="text-terminal-text">
                  Personal projects, startups, and grinding 24/7
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:jerryjwang@berkeley.edu"
                className="inline-flex items-center gap-2 rounded-full border border-terminal-border-strong bg-terminal-glass px-4 py-2 text-sm font-courier text-terminal-text transition-colors hover:border-terminal-border-hover hover:bg-terminal-glass-strong hover:text-terminal-accent-soft"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://github.com/jerryjlwang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-terminal-border-strong bg-terminal-glass px-4 py-2 text-sm font-courier text-terminal-text transition-colors hover:border-terminal-border-hover hover:bg-terminal-glass-strong hover:text-terminal-accent-soft"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jerrypitchfork/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-terminal-border-strong bg-terminal-glass px-4 py-2 text-sm font-courier text-terminal-text transition-colors hover:border-terminal-border-hover hover:bg-terminal-glass-strong hover:text-terminal-accent-soft"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-terminal-border bg-terminal-panel p-8 shadow-terminal-panel backdrop-blur-sm">
            <h2 className="mb-5 font-courier text-2xl text-terminal-text">
              Focus Areas
            </h2>
            <ul className="space-y-3 font-courier text-terminal-secondary">
              {focusAreas.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-terminal-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-terminal-border bg-terminal-panel p-8 shadow-terminal-panel backdrop-blur-sm">
            <h2 className="mb-5 font-courier text-2xl text-terminal-text">
              Skills & Interests
            </h2>
            <ul className="space-y-3 font-courier text-terminal-secondary">
              {skillAreas.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-terminal-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-terminal-border bg-terminal-panel p-8 shadow-terminal-panel backdrop-blur-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-3 font-courier text-2xl text-terminal-text">
                Explore the rest of the site
              </h2>
              <p className="max-w-2xl font-courier text-terminal-secondary">
                The posts and project sections show the kinds of ideas, notes,
                and experiments this resume page points toward.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 rounded-full bg-terminal-accent px-5 py-3 font-courier text-terminal-button-text transition-transform hover:-translate-y-0.5"
              >
                View Posts
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-terminal-border-strong bg-terminal-glass px-5 py-3 font-courier text-terminal-text transition-colors hover:border-terminal-border-hover hover:bg-terminal-glass-strong hover:text-terminal-accent-soft"
              >
                Back Home
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
