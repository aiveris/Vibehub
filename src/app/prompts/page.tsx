import { revalidatePath } from "next/cache";
import { Sparkles, User, Clock } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { PromptForm } from "./PromptForm";

type PromptRow = {
    id: number;
    vardas: string;
    prompto_tekstas: string;
    created_at: string;
};

export default async function PromptsPage() {
    async function createPrompt(formData: FormData) {
        "use server";

        const vardas = String(formData.get("vardas") ?? "").trim();
        const prompto_tekstas = String(formData.get("prompto_tekstas") ?? "").trim();

        if (!vardas || !prompto_tekstas) return;

        const supabase = createSupabaseServerClient();
        const { error } = await supabase
            .from("prompts")
            .insert({ vardas, prompto_tekstas });

        if (error) {
            throw new Error(error.message);
        }

        revalidatePath("/prompts");
    }

    let prompts: PromptRow[] = [];
    let loadError: string | null = null;

    try {
        const supabase = createSupabaseServerClient();
        const { data, error } = await supabase
            .from("prompts")
            .select("id, vardas, prompto_tekstas, created_at")
            .order("created_at", { ascending: false });

        if (error) {
            loadError = error.message;
        } else {
            prompts = (data ?? []) as PromptRow[];
        }
    } catch (e) {
        loadError = e instanceof Error ? e.message : "Unknown error";
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Sparkles className="text-primary" />
                        AI Promptai
                    </h1>
                    <p className="text-muted mt-2">Dalinkis geriausiai veikiančiomis užklausomis.</p>
                </div>
            </div>

            {loadError ? (
                <div className="glass p-6 rounded-3xl border border-red-500/30">
                    <div className="font-bold">Nepavyko prisijungti prie Supabase</div>
                    <div className="text-sm text-muted mt-2">{loadError}</div>
                    <div className="text-xs text-muted mt-4">
                        Patikrink `.env.local` (NEXT_PUBLIC_SUPABASE_URL ir bent vieną raktą:
                        SUPABASE_SERVICE_ROLE_KEY arba NEXT_PUBLIC_SUPABASE_ANON_KEY) ir ar Supabase
                        lentelė `prompts` sukurta.
                    </div>
                </div>
            ) : (
                <PromptForm action={createPrompt} />
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
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                                        prompt.vardas
                                    )}`}
                                    alt={prompt.vardas}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm flex items-center gap-1">
                                    <User className="w-3 h-3 text-muted" />
                                    {prompt.vardas}
                                </h3>
                                <p className="text-[10px] text-muted flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(prompt.created_at).toLocaleDateString("lt-LT")}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed bg-white/5 p-4 rounded-2xl flex-grow font-mono">
                            "{prompt.prompto_tekstas}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
