const dataSources = ["OLTP", "Warehouse", "Data Lake", "NoSQL", "SaaS"];
const aiApps = ["AI Agents", "Vector Search", "RAG", "Dashboards"];

function Box({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "blue" | "green" | "purple";
}) {
  const tones = {
    default: "border-slate-200 bg-slate-50 text-slate-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    purple: "border-purple-200 bg-purple-50 text-purple-800",
  };

  return (
    <div className={`rounded-2xl border px-4 py-3 text-center text-xs font-black ${tones[tone]}`}>
      {children}
    </div>
  );
}

export function HeroArchitecture() {
  return (
    <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
      <p className="mb-5 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        Enterprise AI Reference Architecture
      </p>

      <div className="grid gap-4 lg:grid-cols-[0.7fr_1.8fr_0.7fr]">
        <div className="space-y-3">
          <p className="text-center text-xs font-black text-slate-500">Data Sources</p>
          {dataSources.map((item) => (
            <Box key={item}>{item}</Box>
          ))}
        </div>

        <div className="space-y-4">
          <Box>Apps · Chat · Code · Agents · Dashboards</Box>
          <Box tone="green">Federated Query Layer / NexusIQ / Virtual Schema</Box>
          <Box tone="blue">Query Optimization & Planning</Box>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
            <p className="mb-4 text-sm font-black text-slate-800">
              Compute Layer / MPP Cluster
            </p>
            <div className="grid grid-cols-3 gap-3">
              {["Node 1", "Node 2", "Node N"].map((node) => (
                <Box key={node}>{node}</Box>
              ))}
            </div>
          </div>

          <Box tone="purple">Distributed Storage</Box>
        </div>

        <div className="space-y-3">
          <p className="text-center text-xs font-black text-slate-500">AI & Analytics</p>
          {aiApps.map((item) => (
            <Box key={item} tone="green">
              {item}
            </Box>
          ))}
        </div>
      </div>

      <div className="absolute -right-7 top-32 hidden rotate-[-8deg] text-2xl font-black leading-tight text-blue-600 xl:block">
        From Data
        <br />
        Silos to
        <br />
        AI-Native
        <br />
        Systems
      </div>
    </div>
  );
}