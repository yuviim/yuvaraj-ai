import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { LatestNotes } from "@/components/home/LatestNotes";
import { ArchitectureSections } from "@/components/home/ArchitectureSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-950">
      <Header />
      <Hero />
      <ArchitectureSections />
      <LatestNotes />
    </main>
  );
}