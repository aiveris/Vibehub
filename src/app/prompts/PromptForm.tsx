"use client";

import { useMemo } from "react";
import { Send, Sparkles } from "lucide-react";
import { useFormStatus } from "react-dom";

type CreatePromptAction = (formData: FormData) => Promise<void>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Send className="w-4 h-4" />
      {pending ? "Saugoma..." : "Išsaugoti Promptą"}
    </button>
  );
}

export function PromptForm({ action }: { action: CreatePromptAction }) {
  const formId = useMemo(
    () => `prompt-form-${Math.random().toString(36).slice(2)}`,
    []
  );

  return (
    <form
      id={formId}
      action={action}
      className="glass p-6 rounded-3xl space-y-4 animate-in slide-in-from-top-4 duration-300"
    >
      <div className="flex items-center gap-2 text-sm text-muted">
        <Sparkles className="w-4 h-4 text-primary" />
        Įrašas bus išsaugotas Supabase DB
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted" htmlFor={`${formId}-vardas`}>
          Vardas
        </label>
        <input
          id={`${formId}-vardas`}
          name="vardas"
          type="text"
          placeholder="Tavo vardas..."
          className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
          required
          minLength={1}
          maxLength={80}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-muted"
          htmlFor={`${formId}-prompt`}
        >
          Promptas
        </label>
        <textarea
          id={`${formId}-prompt`}
          name="prompto_tekstas"
          placeholder="Įklijuok savo užklausą čia..."
          className="w-full bg-background border border-border rounded-xl px-4 py-2 h-32 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
          required
          minLength={1}
          maxLength={4000}
        />
      </div>

      <SubmitButton />
    </form>
  );
}
