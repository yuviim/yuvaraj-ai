import {
  Boxes,
  Database,
  FileText,
  Layers3,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import { stats } from "@/data/stats";

const engineeringWork = [
  {
    title: "NexusIQ",
    badge: "Featured",
    subtitle: "Enterprise AI reference implementation",
    description:
      "Federated query, agent skills, governed AI access, and interactive analytics.",
    cta: "Open Implementation →",
    icon: Boxes,
    color: "blue",
  },
  {
    title: "Modern AI Platform",
    badge: "Series",
    subtitle: "Architecture series",
    description:
      "Blueprints for enterprise AI, data platforms, RAG, federation, and observability.",
    cta: "Browse Series →",
    icon: Layers3,
    color: "green",
  },
  {
    title: "Know Exasol",
    badge: "Learning",
    subtitle: "Technical education",
    description:
      "Deep technical series explaining MPP, columnar storage, optimizer, and execution.",
    cta: "Start Learning →",
    icon: Database,
    color: "purple",
  },
  {
    title: "Sovereign AI",
    badge: "Research",
    subtitle: "Architecture research",
    description:
      "Trust boundaries, identity, policy engines, AI gateways, and secure RAG.",
    cta: "Read Research →",
    icon: ShieldCheck,
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#fbfdff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(16,185,129,0.08),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-[1500px] gap-14 px-8 pb-14 pt-14 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        <div>
          <p className="mb-6 text-xs font-black uppercase tracking-[0.28em] text-blue-600">
            Enterprise AI & Data Platform Architecture
          </p>

          <h1 className="max-w-4xl text-[4.4rem] font-black leading-[0.88] tracking-[-0.085em] text-slate-950 md:text-[5.8rem]">
            Designing
            <span className="block">Enterprise AI &</span>
            <span className="block text-blue-600">Modern Data Platforms</span>
          </h1>

          <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
            I design enterprise AI architectures, build production-ready
            reference implementations, and explain modern data platforms through
            engineering notes, diagrams, videos, and working systems.
          </p>

          <div className="mt-7 border-l-4 border-blue-600 pl-5">
            <p className="max-w-2xl text-base font-black leading-7 text-slate-900">
              Building trustworthy Enterprise AI systems through architecture,
              governance, distributed analytics, and engineering-first thinking.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#library"
              className="rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Explore Architecture Library →
            </a>

            <a
              href="#notes"
              className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              Read Engineering Notes
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-1 gap-6 border-t border-slate-200 pt-7 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-50 p-3">
                <Layers3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-black tracking-[-0.05em]">8+</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-500">
                  Architecture
                  <br />
                  Diagrams
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-50 p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-black tracking-[-0.05em]">12+</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-500">
                  Engineering
                  <br />
                  Notes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-50 p-3">
                <PlayCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-black tracking-[-0.05em]">9+</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-500">
                  Videos &
                  <br />
                  Talks
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            Featured Engineering Work
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {engineeringWork.map((work) => {
              const Icon = work.icon;

              return (
                <article
                  key={work.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_28px_80px_rgba(37,99,235,0.08)]"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colorMap[work.color]}`}
                    >
                      <Icon className="h-8 w-8 transition duration-300 group-hover:scale-110" />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${colorMap[work.color]}`}
                    >
                      {work.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-[-0.045em] text-slate-950">
                    {work.title}
                  </h3>

                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {work.subtitle}
                  </p>

                  <p className="mt-5 min-h-20 text-sm leading-6 text-slate-600">
                    {work.description}
                  </p>

                  <a
                    href="#work"
                    className="mt-5 inline-block text-sm font-black text-blue-600 transition group-hover:translate-x-1"
                  >
                    {work.cta}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}