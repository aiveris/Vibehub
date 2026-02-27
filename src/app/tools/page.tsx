"use client";

import { useState, useEffect } from "react";
import { Wrench, Plus, ExternalLink, Lightbulb, User, Link as LinkIcon } from "lucide-react";
import { getMockTools } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface Tool {
    id: string;
    title: string;
    description: string;
    url: string;
}

interface Advice {
    slip: {
        id: number;
        advice: string;
    };
}

export default function ToolsPage() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [advice, setAdvice] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newTool, setNewTool] = useState({ title: "", description: "", url: "" });
    const [loadingAdvice, setLoadingAdvice] = useState(true);

    useEffect(() => {
        setTools(getMockTools());
        fetchAdvice();
    }, []);

    const fetchAdvice = async () => {
        setLoadingAdvice(true);
        try {
            const res = await fetch("https://api.adviceslip.com/advice");
            const data: Advice = await res.json();
            setAdvice(data.slip.advice);
        } catch (error) {
            setAdvice("Klaida užkraunant patarimą. Bet štai vienas: visada daryk commit'us dažnai!");
        } finally {
            setLoadingAdvice(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTool.title || !newTool.url) return;

        const tool: Tool = {
            id: Math.random().toString(36).substr(2, 9),
            ...newTool,
        };

        setTools([tool, ...tools]);
        setNewTool({ title: "", description: "", url: "" });
        setIsFormOpen(false);
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

            {/* Advice Section */}
            <div className="glass p-8 rounded-[2rem] bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/20 blur-3xl rounded-full" />
                <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 bg-accent/20 rounded-2xl text-accent">
                        <Lightbulb className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-accent/80">Programuotojo Patarimas</h4>
                        <p className="text-lg font-medium italic leading-relaxed">
                            {loadingAdvice ? "Ieškoma išminties..." : `"${advice}"`}
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
                                value={newTool.title}
                                onChange={(e) =>
                                    setNewTool({ ...newTool, title: e.target.value })
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
                                value={newTool.url}
                                onChange={(e) =>
                                    setNewTool({ ...newTool, url: e.target.value })
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
                            value={newTool.description}
                            onChange={(e) =>
                                setNewTool({ ...newTool, description: e.target.value })
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
                {tools.map((tool) => (
                    <a
                        key={tool.id}
                        href={tool.url}
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
                                {tool.title}
                            </h3>
                            <p className="text-sm text-muted leading-relaxed line-clamp-2">
                                {tool.description || "Nėra aprašymo."}
                            </p>
                        </div>
                        <div className="pt-2 text-[10px] font-mono text-muted uppercase tracking-widest truncate">
                            {new URL(tool.url).hostname}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
