export function Header() {
  const navItems = ["Home", "Work", "Notes", "Library", "Series", "Videos", "About"];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-sm">
            Y
          </div>

          <div className="text-xl font-black tracking-[-0.05em] text-slate-950">
            Yuvaraj
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 xl:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="hover:text-blue-600">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 text-sm font-black text-slate-700 lg:flex">
          <a href="#">in</a>
          <a href="#">GH</a>
          <a href="#">YT</a>
          <a
            href="#contact"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-white shadow-sm shadow-blue-600/20"
          >
            Contact →
          </a>
        </div>
      </div>
    </header>
  );
}