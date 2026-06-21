import { useEffect, useRef, useState } from "react";
import {
  Coffee,
  Building2,
  Briefcase,
  Check,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Mail,
  Bed,
  Bath,
  Ruler,
  Menu,
  X,
} from "lucide-react";

/* ============================================================
   EDIT ME — your real details live here.
   Swap these out before you deploy.
   ============================================================ */
const CONTACT = {
  whatsapp: "https://wa.me/917349408703", // replace with your number, no spaces, country code first
  email: "karthikmuraleedharan734@gmail.com",
  linkedin: "https://linkedin.com/in/karthikmuraleedharan201025",
  github: "https://github.com/karthik201025",
};

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Coffee,
    title: "Cafe & Restaurant Sites",
    description:
      "A menu that's easy for you to update, real photos of the space, hours, location, and online ordering wired through Razorpay — built so regulars can order without a WhatsApp back-and-forth.",
    tags: ["Menu", "Online ordering", "Table booking", "Razorpay"],
  },
  {
    icon: Building2,
    title: "Real Estate Listings",
    description:
      "Property galleries that load fast on a phone, since most buyers are scrolling, not browsing on a laptop. Filters by BHK and budget, plus an enquiry form that lands in your phone, not a contact-us black hole.",
    tags: ["Listings", "Filters", "Enquiry forms", "Map view"],
  },
  {
    icon: Briefcase,
    title: "Business & Service Sites",
    description:
      "For clinics, studios, salons, tutors — anyone taking bookings or explaining what they do. Clean, fast, and built to actually show up when someone searches for you.",
    tags: ["Booking", "SEO-ready", "Mobile-first", "Fast load"],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Brief",
    description:
      "A 15-minute call, or just a WhatsApp message, about what your business needs the site to actually do.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "I build in the open. You see progress through the week instead of waiting for one big reveal at the end.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Site goes live on your domain, with a short walkthrough so you're never locked out of your own business.",
  },
];

const TECH_STACK = ["React", "TypeScript", "Vite", "Supabase", "Razorpay", "Tailwind CSS"];

const WORK_SLOTS = [
  { label: "Project 01", type: "Cafe site" },
  { label: "Project 02", type: "Real estate site" },
  { label: "Project 03", type: "Business site" },
];

/* ============================================================
   Scroll-reveal wrapper
   ============================================================ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Signature element — the hero browser demo.
   Cycles through a cafe, a real-estate listing, and a business
   site inside one browser frame, to show range without needing
   real client screenshots yet.
   ============================================================ */
const DEMO_TABS = [
  { key: "cafe", label: "Cafe", url: "brewandbloom.in", icon: Coffee },
  { key: "realestate", label: "Real estate", url: "urbannest.in", icon: Building2 },
  { key: "business", label: "Business", url: "studiospace.in", icon: Briefcase },
] as const;

function BrowserDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % DEMO_TABS.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="w-full max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ backgroundColor: "#1E1A38" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
        style={{ backgroundColor: "#16132B" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFC857]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#4DEAC8]" />
        <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs font-mono text-slate truncate">
          {DEMO_TABS[active].url}
        </div>
      </div>

      <div className="flex border-b border-white/10">
        {DEMO_TABS.map((tab, i) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(i)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium font-mono transition-colors cursor-pointer ${active === i ? "text-paper bg-white/5" : "text-slate hover:text-paper"
                }`}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="relative h-72">
        {active === 0 && <CafeDemo />}
        {active === 1 && <RealEstateDemo />}
        {active === 2 && <BusinessDemo />}
      </div>
    </div>
  );
}

function CafeDemo() {
  return (
    <div className="h-full flex flex-col">
      <div
        className="h-24 flex items-end p-4"
        style={{ background: "linear-gradient(135deg, #FF5A36 0%, #FF3D81 100%)" }}
      >
        <div>
          <p className="font-display font-bold text-lg leading-none">Brew & Bloom</p>
          <p className="text-xs text-white/80 mt-1">Filter coffee, Bengaluru</p>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-2 text-sm">
        {[
          ["Filter coffee", "₹80"],
          ["Banana bread", "₹150"],
          ["Cold brew", "₹140"],
        ].map(([item, price]) => (
          <div key={item} className="flex justify-between text-paper/90">
            <span>{item}</span>
            <span className="font-mono text-slate">{price}</span>
          </div>
        ))}
      </div>
      <div className="p-4 pt-0">
        <div className="w-full rounded-lg py-2 text-center text-xs font-semibold bg-[#FF5A36] text-ink">
          Order on WhatsApp
        </div>
      </div>
    </div>
  );
}

function RealEstateDemo() {
  return (
    <div className="h-full flex flex-col">
      <div
        className="h-28 p-4 flex flex-col justify-between"
        style={{ background: "linear-gradient(135deg, #4DEAC8 0%, #2BA8C4 100%)" }}
      >
        <span className="self-start text-[10px] font-mono bg-ink/70 text-paper px-2 py-0.5 rounded-full">
          New listing
        </span>
        <p className="font-display font-bold text-ink text-lg leading-none">₹1.2 Cr</p>
      </div>
      <div className="flex-1 p-4 space-y-3 text-sm">
        <p className="text-paper/90">3 BHK · Whitefield, Bengaluru</p>
        <div className="flex gap-4 text-xs text-slate">
          <span className="flex items-center gap-1">
            <Bed size={13} /> 3 Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} /> 2 Bath
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={13} /> 1450 sqft
          </span>
        </div>
      </div>
      <div className="p-4 pt-0">
        <div className="w-full rounded-lg py-2 text-center text-xs font-semibold bg-[#4DEAC8] text-ink">
          Enquire now
        </div>
      </div>
    </div>
  );
}

function BusinessDemo() {
  return (
    <div className="h-full flex flex-col">
      <div
        className="h-20 flex items-center p-4"
        style={{ background: "linear-gradient(135deg, #FF3D81 0%, #8B5CF6 100%)" }}
      >
        <p className="font-display font-bold text-lg leading-tight">
          Studio Space
          <br />
          <span className="text-xs font-body font-normal text-white/80">Yoga & Pilates</span>
        </p>
      </div>
      <div className="flex-1 p-4 space-y-2 text-sm">
        {["Morning batches", "1:1 sessions", "Online + in-studio"].map((item) => (
          <div key={item} className="flex items-center gap-2 text-paper/90">
            <Check size={14} className="text-[#FF3D81]" />
            {item}
          </div>
        ))}
      </div>
      <div className="p-4 pt-0">
        <div className="w-full rounded-lg py-2 text-center text-xs font-semibold bg-[#FF3D81] text-paper">
          Book a class
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Layout sections
   ============================================================ */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-lg tracking-tight">
          Karthik<span className="text-[#FF5A36]">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate hover:text-paper transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold bg-paper text-ink px-4 py-2 rounded-full hover:bg-[#FF5A36] hover:text-paper transition-colors"
        >
          Let's talk
        </a>
        <button className="md:hidden text-paper" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-6 pb-4 border-t border-white/10 pt-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-slate hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center text-sm font-semibold bg-paper text-ink px-4 py-2 rounded-full"
          >
            Let's talk
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 px-6 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{ backgroundColor: "#FF5A36" }}
      />
      <div
        className="absolute top-20 -right-20 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: "#4DEAC8" }}
      />

      <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-14 items-center">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-[#4DEAC8] mb-5">
              Web developer · Bengaluru
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display font-extrabold text-[2.6rem] leading-[1.05] sm:text-6xl tracking-tight">
              Websites for the places people actually go.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-slate max-w-md leading-relaxed">
              I design and build fast, modern sites for cafes, real estate listings, and
              local businesses — menus, listings, bookings and payments, working from day
              one.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#FF5A36] text-ink font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Start a project <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 rounded-full text-sm font-semibold hover:border-white/40 transition-colors"
              >
                See what I build
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="flex justify-center md:justify-end">
          <BrowserDemo />
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="max-w-2xl mb-14">
      <p className="font-mono text-xs uppercase tracking-widest text-[#4DEAC8] mb-3">{eyebrow}</p>
      <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-slate leading-relaxed">{subtitle}</p>}
    </Reveal>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="What I build" title="Three kinds of sites I build often" />
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 100}>
                <div className="h-full p-7 rounded-2xl border border-white/10 hover:border-white/25 transition-colors bg-[#1E1A38]/40">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "#FF5A36" }}
                  >
                    <Icon size={20} className="text-ink" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-sm text-slate leading-relaxed mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-slate"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="py-24 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Work"
          title="Early slots, open now"
          subtitle="I'm taking on my first client projects, and each one becomes a full case study right here. Reach out and yours could be the first thing people see."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {WORK_SLOTS.map((slot, i) => (
            <Reveal key={slot.label} delay={i * 100}>
              <a
                href="#contact"
                className="group h-full flex flex-col justify-between p-7 rounded-2xl border border-dashed border-white/20 hover:border-[#FF5A36]/60 transition-colors min-h-[220px]"
              >
                <div>
                  <span className="font-mono text-[11px] text-slate">{slot.label}</span>
                  <p className="font-display font-bold text-xl mt-3">{slot.type}</p>
                  <p className="text-sm text-slate mt-2">
                    This slot is reserved for a {slot.type.toLowerCase()}.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF5A36] mt-6">
                  Claim this slot
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-24 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="How it works" title="From brief to live site" />
        <div className="grid md:grid-cols-3 gap-10">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="relative">
                <span className="font-display font-extrabold text-5xl text-white/10">{step.number}</span>
                <h3 className="font-display font-bold text-xl mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="py-20 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[#4DEAC8] mb-6 text-center">
            Under the hood
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm px-4 py-2 rounded-full border border-white/10 text-paper/90 hover:border-[#4DEAC8]/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  const points = [
    "Direct line to me — no project managers in between",
    "Built mobile-first by default, since that's how most people browse",
    "Comfortable wiring up Razorpay, Supabase, and modern hosting",
  ];
  return (
    <section className="py-24 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[#4DEAC8] mb-3">About</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-5">
            Hi, I'm Karthik
          </h2>
          <p className="text-slate leading-relaxed">
            I'm a computer science student in Bengaluru, building production websites with
            the same tools fast-moving startups use — React, TypeScript, and Supabase. I
            work directly with you, with no agency layer in between, which usually means a
            faster turnaround and a site that actually matches what you asked for.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span
                  className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#4DEAC8" }}
                >
                  <Check size={12} className="text-ink" />
                </span>
                <p className="text-paper/90">{point}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type FormStatus = "idle" | "sending" | "sent" | "error";

function Contact() {
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("Cafe / Restaurant");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

    if (!supabaseUrl || !supabaseKey) {
      const body = encodeURIComponent(`Name: ${name}\nBusiness type: ${businessType}\n\n${message}`);
      window.location.href = `mailto:${CONTACT.email}?subject=New project enquiry&body=${body}`;
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ name, business_type: businessType, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-28 px-6 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[#4DEAC8] mb-3">Get in touch</p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-5">
            Got a business that needs a website?
          </h2>
          <p className="text-slate mb-10 max-w-md mx-auto">
            Tell me a bit about it below, or reach out directly — I'll get back to you
            within a day.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4DEAC8] text-ink font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={17} />
              WhatsApp me
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 rounded-full text-sm font-semibold hover:border-white/40 transition-colors"
            >
              <Mail size={17} />
              {CONTACT.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <form
            onSubmit={handleSubmit}
            className="text-left bg-[#1E1A38]/50 border border-white/10 rounded-2xl p-7 space-y-5"
          >
            <div>
              <label className="block text-xs font-mono text-slate mb-2">Your name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-ink border border-white/15 rounded-lg px-4 py-2.5 text-sm text-paper outline-none focus:border-[#4DEAC8] transition-colors"
                placeholder="Priya Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate mb-2">What kind of business?</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-ink border border-white/15 rounded-lg px-4 py-2.5 text-sm text-paper outline-none focus:border-[#4DEAC8] transition-colors"
              >
                <option>Cafe / Restaurant</option>
                <option>Real Estate</option>
                <option>Other business / service</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate mb-2">What do you need?</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-ink border border-white/15 rounded-lg px-4 py-2.5 text-sm text-paper outline-none focus:border-[#4DEAC8] transition-colors resize-none"
                placeholder="A simple site for my cafe with a menu and online ordering..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FF5A36] text-ink font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send message"}
              {status !== "sending" && <ArrowRight size={16} />}
            </button>
            {status === "sent" && (
              <p className="text-sm text-[#4DEAC8] text-center">Got it — I'll be in touch within a day.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-[#FF5A36] text-center">
                Something went wrong. Try WhatsApp or email above instead.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate font-mono">
          Karthik · Built with React, Supabase & Tailwind · © 2026
        </p>
        <div className="flex items-center gap-5 text-xs font-mono">
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-paper transition-colors"
          >
            GitHub
          </a>

          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-paper transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body selection:bg-[#FF5A36] selection:text-ink">
      <Nav />
      <Hero />
      <Services />
      <Work />
      <Process />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
