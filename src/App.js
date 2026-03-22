import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Training", "Achievements", "Contact"];

const SKILLS = {
  Languages: ["C", "C++", "JavaScript", "PHP", "Python", "Java"],
  Frontend: ["HTML", "CSS", "React.js", "Tailwind", "Next.js"],
  Backend: ["Node.js", "Express.js"],
  "Tools & Platforms": ["MySQL", "MongoDB", "Git", "GitHub", "VS Code", "XAMPP", "Ubuntu", "Figma", "PostgreSQL"],
  "Soft Skills": ["Critical Thinking", "Learning Agility", "Adaptability"],
};

const PROJECTS = [
  {
    title: "AI PPT Generator",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Firebase", "Gemini AI"],
    date: "Dec 2025",
    description:
      "A React/TypeScript platform utilizing the Gemini AI API to transform natural language prompts into structured, multi-slide presentations with automated Tailwind CSS layouts.",
    bullets: [
      "Built a custom 'Click-to-Edit' interface using iFrames and React hooks, enabling real-time modification of AI-generated content with instant Firebase state sync.",
      "Integrated ImageKit AI for dynamic visual generation and engineered a robust export module using PptxGenJS to convert web components into high-fidelity PowerPoint files.",
    ],
    link: "https://ai-ppt-generator-five.vercel.app/",
    color: "from-cyan-500/20 to-blue-600/10",
    accent: "#22d3ee",
  },
  {
    title: "Perplexity AI Clone",
    stack: ["Next.js", "Supabase", "Inngest", "Brave Search API", "Gemini 1.5"],
    date: "Apr 2025",
    description:
      "An event-driven AI search engine clone with async query processing, integrating Brave Search API with Gemini 1.5 Flash for structured markdown responses.",
    bullets: [
      "Designed PostgreSQL schemas in Supabase to persist multi-turn chat conversations, linking user queries, AI outputs, and session-based records securely.",
      "Implemented background job tracking with run ID polling to synchronize frontend state with asynchronous LLM execution.",
    ],
    link: "#",
    color: "from-violet-500/20 to-purple-600/10",
    accent: "#a78bfa",
  },
];

const CERTS = [
  { name: "Privacy and Security in Online Social Media", org: "NPTEL", date: "Apr 2025" },
  { name: "Object Oriented Programming", org: "Neocolab", date: "Dec 2024" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/dev94108", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dev94108", icon: LinkedinIcon },
  { label: "LeetCode", href: "https://leetcode.com/u/dev_dv7/", icon: CodeIcon },
  { label: "Email", href: "mailto:dev.verma4561@gmail.com", icon: MailIcon },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function GithubIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}
function LinkedinIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function CodeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function MailIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function ChevronDownIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function SendIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function TrophyIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
function StarIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── Animated typing effect ───────────────────────────────────────────────────
function TypewriterText({ texts, className }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? 45 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span className={className}>
      {display}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

// ─── Particle / grid bg ───────────────────────────────────────────────────────
function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
    </div>
  );
}

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050d1a]/90 backdrop-blur-md border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span
          className="font-mono text-cyan-400 font-bold text-lg tracking-widest cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          &lt;DEV /&gt;
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors tracking-widest uppercase"
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-cyan-400" onClick={() => setMenuOpen((o) => !o)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#050d1a]/95 backdrop-blur-md border-b border-cyan-500/10 px-6 pb-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="block w-full text-left py-3 font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors tracking-widest uppercase border-b border-slate-800/50"
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-block font-mono text-xs text-cyan-400/70 tracking-[0.3em] uppercase mb-6 px-3 py-1 rounded border border-cyan-400/20 bg-cyan-400/5"
              style={{ animation: "fadeIn 0.6s ease" }}
            >
              &gt; Available for opportunities
            </div>

            <h1
              className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-4"
              style={{ fontFamily: "'Syne', sans-serif", animation: "fadeIn 0.8s ease 0.2s both" }}
            >
              Dev
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Verma
              </span>
            </h1>

            <div className="text-xl md:text-2xl font-mono text-slate-400 mb-8 h-8">
              <TypewriterText
                texts={["Full-Stack Developer", "AI Enthusiast", "Problem Solver", "CS Engineer"]}
              />
            </div>

            <p className="text-slate-400 leading-relaxed max-w-lg mb-10 text-base">
              B.Tech CSE student at{" "}
              <span className="text-cyan-300">Lovely Professional University</span> (CGPA: 8.56).
              I build AI-powered web apps, craft clean backends, and turn ideas into scalable
              products.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 px-6 py-3 bg-cyan-400 text-[#050d1a] font-bold font-mono text-sm rounded hover:bg-cyan-300 transition-all duration-200 tracking-widest uppercase"
              >
                View Projects
                <ExternalLinkIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-cyan-400/40 text-cyan-400 font-mono text-sm rounded hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-200 tracking-widest uppercase"
              >
                Contact Me
              </button>
            </div>

            {/* Social row */}
            <div className="flex gap-5 mt-10">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="text-slate-500 hover:text-cyan-400 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right – terminal card */}
          <div className="hidden md:block">
            <div className="rounded-xl border border-cyan-500/20 bg-[#0a1628]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-cyan-500/5">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/10 bg-[#050d1a]/60">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-xs text-slate-500 tracking-wider">dev@portfolio ~ $</span>
              </div>
              {/* Content */}
              <div className="p-6 font-mono text-sm space-y-3">
                <p><span className="text-cyan-400">const</span> <span className="text-white">developer</span> <span className="text-cyan-400">=</span> {"{"}</p>
                <p className="pl-6"><span className="text-violet-400">name</span>: <span className="text-green-300">"Dev Verma"</span>,</p>
                <p className="pl-6"><span className="text-violet-400">role</span>: <span className="text-green-300">"Full-Stack Dev"</span>,</p>
                <p className="pl-6"><span className="text-violet-400">university</span>: <span className="text-green-300">"LPU"</span>,</p>
                <p className="pl-6"><span className="text-violet-400">cgpa</span>: <span className="text-yellow-300">8.56</span>,</p>
                <p className="pl-6"><span className="text-violet-400">leetcode</span>: <span className="text-yellow-300">350</span><span className="text-slate-400">+ problems</span>,</p>
                <p className="pl-6"><span className="text-violet-400">passion</span>: [</p>
                <p className="pl-12"><span className="text-green-300">"AI"</span>, <span className="text-green-300">"Web Dev"</span>,</p>
                <p className="pl-12"><span className="text-green-300">"Open Source"</span></p>
                <p className="pl-6">],</p>
                <p className="pl-6"><span className="text-violet-400">status</span>: <span className="text-green-300">"Open to work 🚀"</span></p>
                <p>{"}"}</p>
                <p className="text-slate-500 pt-2">
                  <span className="text-cyan-400 animate-pulse">▊</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600">
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDownIcon className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader index="01" title="Skills" subtitle="Technologies I work with" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <Reveal key={category} delay={i * 80}>
              <div className="group rounded-xl border border-slate-800 bg-[#0a1628]/60 p-6 hover:border-cyan-500/40 hover:bg-[#0a1628]/90 transition-all duration-300">
                <h3 className="font-mono text-cyan-400 text-xs tracking-[0.25em] uppercase mb-5">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-mono rounded-full border border-slate-700 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors duration-200 bg-slate-900/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader index="02" title="Projects" subtitle="Things I've built" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-7 mt-14">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div
                className={`group relative rounded-xl border border-slate-800 bg-gradient-to-br ${p.color} backdrop-blur-sm overflow-hidden hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                style={{ "--accent": p.accent }}
              >
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
                />

                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-1">{p.date}</p>
                      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {p.title}
                      </h3>
                    </div>
                    <a
                      href={p.link} target="_blank"
                      rel="noreferrer"
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-slate-700 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.description}</p>

                  <ul className="space-y-2 mb-6">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm text-slate-400">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded text-xs font-mono border bg-slate-900/60"
                        style={{ borderColor: p.accent + "33", color: p.accent }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* GitHub CTA */}
        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <a
              href="https://github.com/dev94108"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              View more on GitHub
              <ExternalLinkIcon className="w-3 h-3" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Training ─────────────────────────────────────────────────────────────────
function Training() {
  return (
    <section id="training" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader index="03" title="Training & Education" subtitle="Where I've learned & grown" />
        </Reveal>

        <div className="mt-14 space-y-8">
          {/* Timeline item – Training */}
          <Reveal delay={80}>
            <TimelineCard
              type="training"
              title="MERN Stack Professional Training"
              org="Cipher Schools"
              period="Jun 2025 – Jul 2025"
              bullets={[
                "Mastered the MERN Ecosystem — built scalable, data-driven web apps with MongoDB, Express.js, React, and Node.js.",
                "Engineered RESTful APIs, implemented JWT-based authentication, and managed NoSQL databases with Mongoose schemas.",
                "Built responsive React.js UIs with Redux/Context API state management and cloud-deployed full-stack apps.",
              ]}
            />
          </Reveal>

          {/* Timeline item – LPU */}
          <Reveal delay={160}>
            <TimelineCard
              type="education"
              title="B.Tech — Computer Science & Engineering"
              org="Lovely Professional University, Phagwara"
              period="Aug 2023 – Present"
              meta="CGPA: 8.56"
            />
          </Reveal>

          {/* Timeline item – 12th */}
          <Reveal delay={240}>
            <TimelineCard
              type="education"
              title="Intermediate (PCM)"
              org="St. Mary's Academy, Saharanpur"
              period="Apr 2022 – Mar 2023"
              meta="92.2%"
            />
          </Reveal>

          {/* Timeline item – 10th */}
          <Reveal delay={320}>
            <TimelineCard
              type="education"
              title="Matriculation"
              org="St. Mary's Academy, Saharanpur"
              period="Apr 2020 – Mar 2021"
              meta="92.8%"
            />
          </Reveal>
        </div>

        {/* Certificates */}
        <Reveal delay={100}>
          <h3
            className="font-mono text-xs text-cyan-400/70 tracking-[0.3em] uppercase mt-16 mb-6"
          >
            &gt; Certifications
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-800 bg-[#0a1628]/40 hover:border-cyan-500/30 transition-colors">
                <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-snug">{c.name}</p>
                  <p className="text-slate-500 text-xs font-mono mt-1">{c.org} · {c.date}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ type, title, org, period, meta, bullets }) {
  return (
    <div className="relative pl-10 before:absolute before:left-3 before:top-4 before:bottom-0 before:w-px before:bg-slate-800">
      <div
        className="absolute left-0 top-3 w-6 h-6 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: type === "training" ? "#22d3ee" : "#a78bfa",
          backgroundColor: type === "training" ? "#22d3ee18" : "#a78bfa18",
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: type === "training" ? "#22d3ee" : "#a78bfa" }}
        />
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#0a1628]/50 p-6 hover:border-slate-700 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="text-white font-bold text-base" style={{ fontFamily: "'Syne', sans-serif" }}>
              {title}
            </h4>
            <p className="text-slate-400 text-sm mt-0.5">{org}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-slate-500">{period}</p>
            {meta && (
              <p className="font-mono text-xs text-cyan-400 mt-0.5">{meta}</p>
            )}
          </div>
        </div>
        {bullets && (
          <ul className="mt-4 space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-400">
                <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-cyan-400/60" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────
function Achievements() {
  const stats = [
    { value: "400+", label: "LeetCode Problems", icon: CodeIcon, color: "text-yellow-400" },
    { value: "100", label: "Day Streak Badge", icon: StarIcon, color: "text-orange-400" },
    { value: "8.56", label: "CGPA", icon: TrophyIcon, color: "text-cyan-400" },
    { value: "92%+", label: "Board Scores", icon: TrophyIcon, color: "text-violet-400" },
  ];

  return (
    <section id="achievements" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader index="04" title="Achievements" subtitle="Numbers that tell the story" />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="group rounded-xl border border-slate-800 bg-[#0a1628]/60 p-7 text-center hover:border-slate-600 hover:-translate-y-1 transition-all duration-300">
                <s.icon className={`w-7 h-7 mx-auto mb-4 ${s.color}`} />
                <p className={`text-3xl font-black ${s.color}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-slate-500 text-xs font-mono mt-2 tracking-wider uppercase">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* LeetCode banner */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
                <CodeIcon className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-bold">LeetCode Grinder</p>
                <p className="text-slate-400 text-sm">Consistent problem solver across DSA topics</p>
              </div>
            </div>
            <div className="ml-auto flex gap-6">
              <div className="text-center">
                <p className="text-yellow-400 font-bold font-mono text-lg">400+</p>
                <p className="text-slate-500 text-xs">Problems</p>
              </div>
              <div className="text-center">
                <p className="text-orange-400 font-bold font-mono text-lg">100</p>
                <p className="text-slate-500 text-xs">Day Badge</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // "sending" | "sent" | "error"

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    const mailto = `mailto:dev.verma4561@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setTimeout(() => setStatus("sent"), 1000);
  };

  return (
    <section id="contact" className="relative py-28 px-6 pb-40">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader index="05" title="Contact" subtitle="Let's build something great" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-14 mt-14">
          {/* Left – info */}
          <Reveal delay={80}>
            <div>
              <p className="text-slate-400 leading-relaxed mb-10">
                I'm currently open to internships, full-time roles, and freelance work. Whether you
                have a project in mind, a question, or just want to say hi — my inbox is always open.
              </p>

              <div className="space-y-5">
                {[
                  { icon: MailIcon, label: "Email", value: "dev.verma4561@gmail.com", href: "mailto:dev.verma4561@gmail.com" },
                  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/dev94108", href: "https://www.linkedin.com/in/dev94108" },
                  { icon: GithubIcon, label: "GitHub", value: "github.com/dev94108", href: "https://github.com/dev94108" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900/50 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all">
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">{label}</p>
                      <p className="text-white text-sm group-hover:text-cyan-300 transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social grid */}
              <div className="mt-10 pt-10 border-t border-slate-800">
                <p className="font-mono text-xs text-slate-500 tracking-[0.3em] uppercase mb-5">Find me on</p>
                <div className="flex gap-4">
                  {SOCIALS.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      title={label}
                      className="w-11 h-11 flex items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right – form */}
          <Reveal delay={160}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Dev Verma" required />
                <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              </div>
              <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry…" />
              <div>
                <label className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Hey Dev, I have a project idea…"
                  className="w-full bg-[#0a1628]/80 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/60 focus:bg-[#0a1628] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-cyan-400 text-[#050d1a] font-bold font-mono text-sm rounded-lg hover:bg-cyan-300 disabled:opacity-50 transition-all duration-200 tracking-widest uppercase"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Opening mail…" : status === "sent" ? "Message sent ✓" : (
                  <>
                    Send Message
                    <SendIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
              <p className="text-slate-600 text-xs font-mono text-center">This will open your default mail client.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-2">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#0a1628]/80 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/60 focus:bg-[#0a1628] transition-all"
      />
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-xs text-slate-600">
          © 2025 Dev Verma · Built with React & Tailwind
        </span>
        <span className="font-mono text-xs text-slate-600">
          <span className="text-cyan-400/60">const</span> life = <span className="text-green-400/60">"keep building"</span>;
        </span>
      </div>
    </footer>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ index, title, subtitle }) {
  return (
    <div className="flex items-end gap-5">
      <div>
        <p className="font-mono text-xs text-cyan-400/50 tracking-[0.4em] uppercase mb-1">{index}</p>
        <h2
          className="text-4xl md:text-5xl font-black text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {title}
        </h2>
        <p className="text-slate-500 mt-2 font-mono text-sm">{subtitle}</p>
      </div>
      <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent mb-3" />
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background-color: #050d1a;
          color: #e2e8f0;
          font-family: 'JetBrains Mono', monospace;
          -webkit-font-smoothing: antialiased;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050d1a; }
        ::-webkit-scrollbar-thumb { background: #22d3ee33; border-radius: 9999px; }
        ::-webkit-scrollbar-thumb:hover { background: #22d3ee66; }

        /* Selection */
        ::selection { background: #22d3ee33; color: #22d3ee; }
      `}</style>

      <div className="relative min-h-screen bg-[#050d1a]">
        <GridBackground />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Skills />
          <Projects />
          <Training />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}