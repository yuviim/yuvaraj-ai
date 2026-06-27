import { featuredWork } from "@/data/site";

export function FeaturedWork() {
  return (
    <section id="work" className="mx-auto max-w-[1500px] px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-[-0.04em]">
          Selected Engineering Work
        </h2>
        <a href="#" className="text-sm font-black text-blue-600">
          View all work →
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {featuredWork.map((work) => (
          <article
            key={work.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                ▧
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {work.label}
              </span>
            </div>

            <h3 className="text-2xl font-black tracking-[-0.045em]">
              {work.title}
            </h3>

            <p className="mt-4 min-h-28 text-sm leading-6 text-slate-600">
              {work.description}
            </p>

            <a href="#" className="mt-6 inline-block text-sm font-black text-blue-600">
              Explore →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}