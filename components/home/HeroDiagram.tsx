function Box({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "blue" | "green" | "purple" | "dark";
}) {
  const toneClass = {
    slate: "border-slate-200 bg-white text-slate-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    purple: "border-purple-200 bg-purple-50 text-purple-800",
    dark: "border-slate-950 bg-slate-950 text-white",
  }[tone];

  return (
    <div
      className={`relative rounded-xl border px-4 py-3 text-center text-[11px] font-black leading-tight shadow-sm ${toneClass}`}
    >
      {children}
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-4 w-px border-l border-dashed border-slate-300" />;
}

export function HeroDiagram() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
            Enterprise AI Platform
          </h2>
          <p className="mt-1 text-lg font-semibold text-slate-500">
            Reference Architecture
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
          NexusIQ Pattern
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.9fr_0.72fr]">
        <div className="space-y-3">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
            Sources
          </p>

          {["OLTP", "Warehouse", "Lakehouse", "NoSQL", "SaaS"].map((item) => (
            <Box key={item}>{item}</Box>
          ))}
        </div>

        <div>
          <Box>Apps · Chat · Code · Agents · Dashboards</Box>
          <Connector />

          <Box tone="dark">
            AI Gateway
            <br />
            <span className="font-semibold text-slate-300">
              Routing · Control · Observability
            </span>
          </Box>
          <Connector />

          <div className="grid grid-cols-3 gap-3">
            <Box tone="blue">Identity</Box>
            <Box tone="blue">Policy</Box>
            <Box tone="blue">Audit</Box>
          </div>
          <Connector />

          <Box tone="green">
            Federated Query Layer
            <br />
            <span className="font-semibold">NexusIQ · Virtual Schema</span>
          </Box>
          <Connector />

          <Box tone="blue">
            Query Optimization
            <br />
            <span className="font-semibold">Planning · Pushdown · Routing</span>
          </Box>
          <Connector />

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="mb-3 text-xs font-black text-slate-700">
              Compute Layer / MPP Cluster
            </p>

            <div className="grid grid-cols-[1fr_1fr_32px_1fr] gap-2">
              <Box>Node 1</Box>
              <Box>Node 2</Box>
              <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-black text-slate-400">
                ...
              </div>
              <Box>Node N</Box>
            </div>
          </div>
          <Connector />

          <Box tone="purple">Distributed Storage</Box>
        </div>

        <div className="space-y-3">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
            AI Layer
          </p>

          {["Agents", "Vector Search", "RAG", "BI / Dashboards"].map((item) => (
            <Box key={item} tone="green">
              {item}
            </Box>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-200 pt-5">
        <Box>Identity Access & SSO</Box>
        <Box>Governance Controls</Box>
        <Box>Logs & Compliance</Box>
      </div>
    </div>
  );
}