import { type ReactNode, useEffect, useRef } from "react";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import ParticleField from "@/components/ParticleField";
import { featuredProjects, type FeaturedProject } from "@/data/projects";
import { posts } from "@/data/posts";
import { useTypewriter } from "@/hooks/useTypewriter";

type HomePost = {
  id: string;
  title: string;
  fund: string;
  date: string;
  readTime: string;
};

type RiseProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

type SectionHeadProps = {
  prompt: string;
  label: string;
  meta?: string;
  action?: ReactNode;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CONTACT_LINKS = [
  {
    label: "GitHub",
    Icon: Github,
    href: "https://github.com/jerryjlwang",
    external: true,
  },
  {
    label: "LinkedIn",
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/jerrypitchfork/",
    external: true,
  },
  {
    label: "Email",
    Icon: Mail,
    href: "mailto:jerryjwang@berkeley.edu",
    external: false,
  },
  {
    label: "Resume",
    Icon: FileText,
    href: "/Jerry's_Resume.pdf",
    external: true,
  },
];

const formatDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00`);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const getFundFromPostId = (id: string) => {
  const separatorIndex = id.indexOf("-");
  return separatorIndex === -1 ? "Venture with Jerry" : id.slice(separatorIndex + 1);
};

const interviewPosts: HomePost[] = posts
  .filter((post) => post.id !== "getting-started")
  .map((post) => ({
    id: post.id,
    title: post.title,
    fund: getFundFromPostId(post.id),
    date: post.date,
    readTime: post.readTime,
  }))
  .sort(
    (firstPost, secondPost) =>
      new Date(secondPost.date).getTime() - new Date(firstPost.date).getTime()
  );

function Rise({ children, delay = 0, className = "" }: RiseProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.transform = "translateY(0)";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: "translateY(18px)",
        transition: "transform 560ms cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHead({
  prompt,
  label,
  meta,
  action,
}: SectionHeadProps) {
  return (
    <div className="mb-[26px] flex items-end gap-3 sm:gap-[18px]">
      <div className="flex shrink-0 items-center gap-2.5">
        <span className="text-sm text-terminal-accent-soft">{prompt}</span>
        <span className="text-sm uppercase tracking-label text-terminal-accent-soft">
          {label}
        </span>
      </div>
      <div className="terminal-rule mb-[7px] hidden h-px min-w-4 flex-1 sm:block" />
      {meta && (
        <span className="mb-0.5 hidden shrink-0 text-sm text-terminal-faint md:inline">
          {meta}
        </span>
      )}
      {action}
    </div>
  );
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  const content = (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="text-sm text-terminal-accent">$</span>
          <span className="truncate text-xl tracking-wide text-terminal-text">
            {project.title}
          </span>
        </span>
        <span className="shrink-0 rounded-full border border-terminal-border-strong px-2.5 py-0.5 text-xs tracking-wide text-terminal-secondary">
          {project.tag}
        </span>
      </div>
      <p className="m-0 text-sm leading-relaxed text-terminal-secondary">
        {project.summary}
      </p>
    </>
  );
  const className =
    "block rounded-2xl border border-terminal-border bg-terminal-glass px-[22px] py-5 transition-all duration-base ease-out hover:-translate-y-[3px] hover:border-terminal-border-hover hover:bg-terminal-glass-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent focus-visible:ring-offset-2 focus-visible:ring-offset-terminal-bg";

  if (project.url.startsWith("/")) {
    return (
      <Link to={project.url} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}

export default function HomePage() {
  const typedSubtitle = useTypewriter(
    "Get to know me and my personal projects."
  );
  const recentPosts = interviewPosts.slice(0, 4);

  return (
    <div className="terminal-page relative min-h-screen overflow-x-hidden bg-terminal-bg font-mono text-terminal-text">
      <div className="pointer-events-none fixed inset-0 z-0">
        <ParticleField />
      </div>

      <div className="relative z-10">
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(20px,4vw,44px)] py-[30px]">
          <Link
            to="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent"
            aria-label="Venture with Jerry home"
          >
            <img
              src="/favicon.png"
              alt=""
              width={34}
              height={34}
              className="rounded-lg"
            />
            <span className="hidden text-xl font-medium tracking-wide text-terminal-text sm:inline">
              Venture with Jerry
            </span>
          </Link>

          <nav className="flex gap-4 sm:gap-[30px]" aria-label="Primary">
            <Link
              to="/posts"
              className="text-base tracking-wide text-terminal-text transition-colors hover:text-terminal-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent sm:text-lg"
            >
              Posts
            </Link>
            <Link
              to="/resume"
              className="text-base tracking-wide text-terminal-text transition-colors hover:text-terminal-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent sm:text-lg"
            >
              Resume
            </Link>
          </nav>
        </header>

        <main className="mx-auto max-w-content px-[clamp(1rem,4vw,2rem)] pb-10 pt-[150px]">
          <div className="mb-[26px] flex items-center gap-3 text-sm tracking-wide text-terminal-faint">
            <span className="inline-flex gap-[7px]" aria-hidden="true">
              <span className="h-[11px] w-[11px] rounded-full bg-[#00f5ff] opacity-85" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#67e8f9] opacity-85" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#334155] opacity-70" />
            </span>
            <span className="ml-1.5">
              <span className="text-terminal-accent-soft">jerry@venture</span>:~ % whoami
            </span>
          </div>

          <Rise>
            <h1
              className="m-0 font-bold leading-[0.96] tracking-tightest text-terminal-hero"
              style={{
                fontSize: "clamp(3.2rem,9vw,6.5rem)",
                textShadow: "var(--terminal-hero-shadow)",
              }}
            >
              Jerry Wang
            </h1>
          </Rise>

          <Rise delay={0.12} className="mt-[22px] max-w-[44ch]">
            <p
              className="m-0 leading-[1.4] tracking-wide text-terminal-text"
              style={{ fontSize: "clamp(1.25rem,2.6vw,1.9rem)" }}
            >
              <span className="mr-3 text-terminal-accent">&gt;</span>
              {typedSubtitle}
              <span
                className="ml-1 inline-block h-[1em] w-[0.6ch] translate-y-[0.12em] animate-vwj-blink bg-terminal-accent align-middle"
                aria-hidden="true"
              />
            </p>
          </Rise>

          <Rise delay={0.26} className="mt-[30px] flex flex-wrap gap-2.5">
            {CONTACT_LINKS.map(({ label, Icon, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 rounded-full border border-terminal-border-strong bg-terminal-glass px-4 py-2 text-sm tracking-wide text-terminal-text transition-colors hover:border-terminal-border-hover hover:bg-terminal-glass-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent focus-visible:ring-offset-2 focus-visible:ring-offset-terminal-bg"
              >
                <Icon size={15} strokeWidth={2} />
                {label}
              </a>
            ))}
          </Rise>

          <Rise delay={0.04}>
            <section className="mt-24" aria-labelledby="recent-posts-heading">
              <SectionHead
                prompt="~/posts"
                label="Recent Posts"
                meta={`${interviewPosts.length} interviews logged`}
                action={
                  <Link
                    to="/posts"
                    className="mb-0.5 ml-auto flex shrink-0 items-center gap-1.5 text-sm text-terminal-accent transition-colors hover:text-terminal-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent"
                  >
                    all <ArrowRight size={16} />
                  </Link>
                }
              />
              <h2 id="recent-posts-heading" className="sr-only">
                Recent Posts
              </h2>

              <div className="border-b border-terminal-border">
                {recentPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/posts/${post.id}`}
                    className="group relative grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border-t border-terminal-border py-[18px] pl-3 pr-3 transition-colors hover:bg-terminal-glass focus-visible:bg-terminal-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terminal-accent sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:gap-[18px] sm:pl-[18px] sm:pr-5"
                  >
                    <span className="pointer-events-none absolute inset-y-2 left-0 w-0.5 origin-center scale-y-0 rounded bg-terminal-accent shadow-terminal-scan transition-transform duration-base ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100" />
                    <span className="text-sm tabular-nums tracking-wide text-terminal-faint transition-colors group-hover:text-terminal-accent group-focus-visible:text-terminal-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-base tracking-wide text-terminal-text sm:text-xl">
                        {post.title}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-terminal-muted sm:text-sm">
                        <span className="text-terminal-accent-soft">{post.fund}</span>
                        <span className="opacity-40">·</span>
                        <span>{formatDate(post.date)}</span>
                        <span className="opacity-40">·</span>
                        <span>{post.readTime}</span>
                      </span>
                    </span>
                    <ArrowRight
                      size={20}
                      className="text-terminal-faint transition-all duration-base ease-out group-hover:translate-x-1 group-hover:text-terminal-accent-soft group-focus-visible:translate-x-1 group-focus-visible:text-terminal-accent-soft"
                    />
                  </Link>
                ))}
              </div>
            </section>
          </Rise>

          <Rise delay={0.04}>
            <section className="mt-[84px]" aria-labelledby="projects-heading">
              <SectionHead
                prompt="~/projects"
                label="Featured Projects"
                meta={`${featuredProjects.length} shipped`}
              />
              <h2 id="projects-heading" className="sr-only">
                Featured Projects
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </Rise>

          <Rise delay={0.04}>
            <div className="mt-20 flex items-center gap-3 text-base text-terminal-faint">
              <span>
                <span className="text-terminal-accent-soft">jerry@venture</span>:~ %{" "}
              </span>
              <span
                className="inline-block h-[1em] w-[0.6ch] animate-vwj-blink bg-terminal-accent"
                aria-hidden="true"
              />
            </div>
          </Rise>
        </main>

        <footer className="px-7 pb-24 pt-8 text-center text-sm tracking-wide text-terminal-faint">
          © {new Date().getFullYear()} Jerry Wang · Venture with Jerry
        </footer>
      </div>
    </div>
  );
}
