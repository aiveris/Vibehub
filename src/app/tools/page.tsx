"use client";

import { useState, useEffect } from "react";
import { Wrench, Plus, ExternalLink, Lightbulb, Link as LinkIcon } from "lucide-react";
import { getTools, addTool, type Tool } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface JokeResponse {
    joke?: string;
    setup?: string;
    delivery?: string;
    type: "single" | "twopart";
}

export default function ToolsPage() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [joke, setJoke] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newTool, setNewTool] = useState({ pavadinimas: "", aprasymas: "", url_nuoroda: "" });
    const [loadingJoke, setLoadingJoke] = useState(true);
    const [loadingTools, setLoadingTools] = useState(true);

    useEffect(() => {
        fetchTools();
        fetchJoke();
    }, []);

    const fetchTools = async () => {
        setLoadingTools(true);
        const data = await getTools();
        setTools(data);
        setLoadingTools(false);
    };

    const fetchJoke = async () => {
        setLoadingJoke(true);
        try {
            const res = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
            const data: JokeResponse = await res.json();
            if (data.type === "single") {
                setJoke(data.joke || "");
            } else {
                setJoke(`${data.setup} ... ${data.delivery}`);
            }
        } catch (error) {
            setJoke("Klaida užkraunant juokelį. Bet štai vienas: kodėl programuotojai nekenčia gamtos? Per daug bug'ų.");
        } finally {
            setLoadingJoke(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTool.pavadinimas || !newTool.url_nuoroda) return;

        try {
            await addTool(newTool);
            setNewTool({ pavadinimas: "", aprasymas: "", url_nuoroda: "" });
            setIsFormOpen(false);
            fetchTools(); // Refresh list
        } catch (error) {
            alert("Nepavyko išsaugoti įrankio.");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Wrench className="text-accent" />
                        Įrankių Katalogas
                    </h1>
                    <p className="text-muted mt-2">
                        Naudingos nuorodos ir resursai vienoje vietoje.
                    </p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2 self-start"
                >
                    {isFormOpen ? "Atšaukti" : (
                        <>
                            <Plus className="w-5 h-5" />
                            Pridėti Naują
                        </>
                    )}
                </button>
            </div>

            {/* Joke Section */}
            <div className="glass p-8 rounded-[2rem] bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/20 blur-3xl rounded-full" />
                <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 bg-accent/20 rounded-2xl text-accent">
                        <Lightbulb className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-accent/80">Programuotojo Juokelis</h4>
                        <p className="text-lg font-medium italic leading-relaxed">
                            {loadingJoke ? "Ieškoma juoko..." : `"${joke}"`}
                        </p>
                    </div>
                </div>
            </div>

            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className="glass p-6 rounded-3xl space-y-4 animate-in slide-in-from-top-4 duration-300"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted">Pavadinimas</label>
                            <input
                                type="text"
                                value={newTool.pavadinimas}
                                onChange={(e) =>
                                    setNewTool({ ...newTool, pavadinimas: e.target.value })
                                }
                                placeholder="Pvz: Tailwind UI"
                                className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted">URL Adresas</label>
                            <input
                                type="url"
                                value={newTool.url_nuoroda}
                                onChange={(e) =>
                                    setNewTool({ ...newTool, url_nuoroda: e.target.value })
                                }
                                placeholder="https://..."
                                className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted">Aprašymas</label>
                        <textarea
                            value={newTool.aprasymas}
                            onChange={(e) =>
                                setNewTool({ ...newTool, aprasymas: e.target.value })
                            }
                            placeholder="Trumpai apibūdink įrankį..."
                            className="w-full bg-background border border-border rounded-xl px-4 py-2 h-20 focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                    >
                        <Plus className="w-4 h-4" />
                        Išsaugoti Įrankį
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loadingTools ? (
                    <p className="col-span-full text-center py-12 text-muted">Kraunami įrankiai...</p>
                ) : tools.length === 0 ? (
                    <p className="col-span-full text-center py-12 text-muted">Kol kas įrankių nėra. Būk pirmas!</p>
                ) : (
                    tools.map((tool) => (
                        <a
                            key={tool.id}
                            href={tool.url_nuoroda}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass p-6 rounded-3xl space-y-4 card-hover group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent/10 transition-colors">
                                    <LinkIcon className="w-6 h-6" />
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                                    {tool.pavadinimas}
                                </h3>
                                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                                    {tool.aprasymas || "Nėra aprašymo."}
                                </p>
                            </div>
                            <div className="pt-2 text-[10px] font-mono text-muted uppercase tracking-widest truncate">
                                {new URL(tool.url_nuoroda).hostname}
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}

