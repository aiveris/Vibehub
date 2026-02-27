"use client";

import { useState, useEffect } from "react";
import { Sparkles, Send, User, Clock } from "lucide-react";
import { getMockPrompts } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface Prompt {
    id: string;
    author: string;
    text: string;
    created_at: string;
}

export default function PromptsPage() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newPrompt, setNewPrompt] = useState({ author: "", text: "" });

    useEffect(() => {
        // Load mock data for now
        setPrompts(getMockPrompts());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPrompt.author || !newPrompt.text) return;

        const prompt: Prompt = {
            id: Math.random().toString(36).substr(2, 9),
            author: newPrompt.author,
            text: newPrompt.text,
            created_at: new Date().toISOString(),
        };

        setPrompts([prompt, ...prompts]);
        setNewPrompt({ author: "", text: "" });
        setIsFormOpen(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Sparkles className="text-primary" />
                        AI Promptai
                    </h1>
                    <p className="text-muted mt-2">
                        Dalinkis geriausiai veikiančiomis užklausomis.
                    </p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                    {isFormOpen ? "Atšaukti" : "Pridėti Promptą"}
                </button>
            </div>

            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className="glass p-6 rounded-3xl space-y-4 animate-in slide-in-from-top-4 duration-300"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted">Autorius</label>
                        <input
                            type="text"
                            value={newPrompt.author}
                            onChange={(e) =>
                                setNewPrompt({ ...newPrompt, author: e.target.value })
                            }
                            placeholder="Tavo vardas..."
                            className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted">Promptas</label>
                        <textarea
                            value={newPrompt.text}
                            onChange={(e) =>
                                setNewPrompt({ ...newPrompt, text: e.target.value })
                            }
                            placeholder="Įklijuok savo užklausą čia..."
                            className="w-full bg-background border border-border rounded-xl px-4 py-2 h-32 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
                    >
                        <Send className="w-4 h-4" />
                        Išsaugoti Promptą
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prompts.map((prompt) => (
                    <div
                        key={prompt.id}
                        className="glass p-6 rounded-3xl space-y-4 card-hover flex flex-col"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${prompt.author}`}
                                    alt={prompt.author}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm flex items-center gap-1">
                                    <User className="w-3 h-3 text-muted" />
                                    {prompt.author}
                                </h3>
                                <p className="text-[10px] text-muted flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(prompt.created_at).toLocaleDateString("lt-LT")}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed bg-white/5 p-4 rounded-2xl flex-grow font-mono">
                            "{prompt.text}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
