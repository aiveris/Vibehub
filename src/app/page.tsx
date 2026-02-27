import Link from "next/link";
import { Sparkles, Wrench, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Koduok su <span className="gradient-text">Vibe</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          „VibeHub“ – tavo asmeninė AI promptų ir programuotojo įrankių saugykla.
          Geriausios užklausos ir naudingiausios nuorodos vienoje vietoje.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/prompts"
          className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Sparkles className="w-5 h-5" />
          Naršyti Promptus
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/tools"
          className="px-8 py-4 glass text-white rounded-2xl font-semibold transition-all hover:bg-white/10 active:scale-95 flex items-center gap-2"
        >
          <Wrench className="w-5 h-5" />
          Rasti Įrankius
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 text-left">
        <div className="glass p-6 rounded-3xl space-y-3 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Atrinkti Promptai</h3>
          <p className="text-muted text-sm">
            Geriausios užklausos kodui generuoti, išbandytos kolegų programuotojų.
          </p>
        </div>
        <div className="glass p-6 rounded-3xl space-y-3 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Įrankių Katalogas</h3>
          <p className="text-muted text-sm">
            Visos naudingiausios bibliotekos, DB įrankiai ir dokumentacijos vienoje vietoje.
          </p>
        </div>
        <div className="glass p-6 rounded-3xl space-y-3 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
            <Github className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Atviras Kodas</h3>
          <p className="text-muted text-sm">
            Projektas kurtas bendruomenei. Dalinkis savo atradimais su kitais.
          </p>
        </div>
      </div>
    </div>
  );
}

function Github(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
