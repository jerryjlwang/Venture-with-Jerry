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

import ScrollTypewriterText from "../components/ScrollTypewriterText";
import ParticlesComponent from "@/components/ui/particles-bg";

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
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <ParticlesComponent
        className="-inset-x-[6%] -inset-y-[8%] [transform:scale(1.05)]"
        particleCount={180}
        linkDistance={175}
        linkOpacity={0.45}
        moveSpeed={1.65}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.3),rgba(0,0,0,0.88))]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 md:pt-40 lg:px-8">
        <section className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-courier tracking-wide text-cyan-100">
              <FileText className="h-4 w-4" />
              Resume
            </div>
            <a
              href="/Jerry's_Resume.pdf"
              download="Jerry's_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-courier tracking-wide text-white transition-colors hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>

          <h1 className="mb-5 text-4xl font-courier tracking-wide text-white md:text-5xl">
            <ScrollTypewriterText text="Resume" speed={80} />
          </h1>

          <p className="max-w-3xl text-lg font-courier leading-relaxed text-slate-300 md:text-xl">
            A structured snapshot of my background, interests, and the work I am
            building around frontier AI.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/65 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-sm">
            <div className="mb-5 inline-flex items-center gap-2 text-cyan-200">
              <Sparkles className="h-5 w-5" />
              <span className="font-courier text-sm uppercase tracking-[0.22em] text-cyan-200/90">
                Profile
              </span>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-cyan-300/30 bg-white/5 p-2 shadow-[0_0_0_1px_rgba(125,211,252,0.08),0_20px_45px_rgba(8,145,178,0.18)]">
                <img
                  src="/lovable-uploads/jerry-resume-profile.jpeg"
                  alt="Jerry Wang profile"
                  className="h-40 w-40 rounded-full object-cover object-center md:h-48 md:w-48"
                />
              </div>
            </div>

            <h2 className="mb-4 text-center text-2xl font-courier text-white">
              Jerry Wang
            </h2>

            <div className="space-y-4 font-courier leading-relaxed text-slate-300">
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

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/65 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-sm">
            <div className="mb-6 inline-flex items-center gap-2 text-cyan-200">
              <GraduationCap className="h-5 w-5" />
              <span className="font-courier text-sm uppercase tracking-[0.22em] text-cyan-200/90">
                Snapshot
              </span>
            </div>

            <div className="space-y-5 font-courier">
              <div>
                <div className="mb-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                  Education
                </div>
                <div className="text-lg text-white">University of California, Berkeley</div>
                <div className="text-sm text-slate-400">
                  Berkeley, California
                </div>
                <div className="text-lg text-white">Interlake High School</div>
                <div className="text-sm text-slate-400">
                  Bellevue, Washington
                </div>
              </div>

              <div>
                <div className="mb-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                  Focus
                </div>
                <div className="text-white">
                  AI, math, spatial systems
                </div>
              </div>

              <div>
                <div className="mb-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                  Current direction
                </div>
                <div className="text-white">
                  Personal projects, startups, and grinding 24/7
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:jerryjwang@berkeley.edu"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-courier text-white transition-colors hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://github.com/jerryjlwang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-courier text-white transition-colors hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jerrypitchfork/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-courier text-white transition-colors hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.42)] backdrop-blur-sm">
            <h2 className="mb-5 font-courier text-2xl text-white">
              Focus Areas
            </h2>
            <ul className="space-y-3 font-courier text-slate-300">
              {focusAreas.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.42)] backdrop-blur-sm">
            <h2 className="mb-5 font-courier text-2xl text-white">
              Skills & Interests
            </h2>
            <ul className="space-y-3 font-courier text-slate-300">
              {skillAreas.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.42)] backdrop-blur-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-3 font-courier text-2xl text-white">
                Explore the rest of the site
              </h2>
              <p className="max-w-2xl font-courier text-slate-300">
                The posts and project sections show the kinds of ideas, notes,
                and experiments this resume page points toward.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-courier text-slate-950 transition-transform hover:-translate-y-0.5"
              >
                View Posts
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 font-courier text-white transition-colors hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100"
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
