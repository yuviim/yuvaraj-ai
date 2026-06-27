import { notes } from "@/data/site";

export function LatestNotes() {
  return (
    <section id="notes" className="mx-auto max-w-[1500px] px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-[-0.04em]">
          Latest Architecture Notes
        </h2>
        <a href="#" className="text-sm font-black text-blue-600">
          View all notes →
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {notes.map((note) => (
          <article
            key={note}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-5 h-28 rounded-2xl border border-slate-200 bg-blue-50" />
            <h3 className="min-h-16 text-base font-black leading-tight">
              {note}
            </h3>
            <p className="mt-5 text-xs font-semibold text-slate-500">
              Architecture Note · June 2026
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}