const referenceArchitectures = [
  {
    title: "Enterprise AI Gateway",
    type: "Control Plane",
    description:
      "Routing, policy enforcement, observability, model access, and audit for enterprise AI systems.",
  },
  {
    title: "Federated Query",
    type: "Data Access",
    description:
      "A reference pattern for querying across warehouses, lakehouses, SaaS apps, and operational systems.",
  },
  {
    title: "Enterprise RAG",
    type: "AI System",
    description:
      "Secure retrieval architecture with identity, permissions, vector search, and governed context delivery.",
  },
  {
    title: "Lakehouse Architecture",
    type: "Data Platform",
    description:
      "Open table formats, object storage, query engines, catalogs, and analytical execution patterns.",
  },
  {
    title: "Identity & Policy",
    type: "Trust Boundary",
    description:
      "How authentication, authorization, role mapping, and policy decisions shape AI platform behavior.",
  },
  {
    title: "MPP & Compute",
    type: "Execution Engine",
    description:
      "Distributed execution, data partitioning, query planning, node-level processing, and workload scale.",
  },
];

const libraryTopics = [
  "MPP",
  "Columnar Storage",
  "Query Optimizer",
  "Vector Search",
  "MCP",
  "Agent Skills",
  "In-Memory Processing",
  "AI Sovereignty",
  "Policy Engine",
  "Data Residency",
];

export function ArchitectureSections() {
  return (
    <section
      id="library"
      className="border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-[1500px] px-8 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-blue-600">
              Architecture Library
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.075em] text-slate-950">
              Reference architectures for enterprise AI and modern data systems.
            </h2>
          </div>

          <a
            href="#"
            className="text-sm font-black text-blue-600 hover:text-blue-700"
          >
            View full library →
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {referenceArchitectures.map((item, index) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-slate-200 bg-[#fbfdff] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-lg font-black text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">
                  {item.type}
                </span>
              </div>

              <h3 className="text-2xl font-black tracking-[-0.045em] text-slate-950">
                {item.title}
              </h3>

              <p className="mt-4 min-h-24 text-sm leading-6 text-slate-600">
                {item.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Architecture
                </span>

                <span className="text-sm font-black text-blue-600 transition group-hover:translate-x-1">
                  Explore →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-slate-200 bg-[#f7fbff] p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-black tracking-[-0.045em] text-slate-950">
                Browse Concepts
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Short, focused explanations that connect to deeper architecture notes and reference implementations.
              </p>
            </div>

            <a href="#" className="text-sm font-black text-blue-600">
              View concepts →
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            {libraryTopics.map((topic) => (
              <a
                key={topic}
                href="#"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
              >
                {topic}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}