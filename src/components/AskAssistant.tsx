"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2, Sparkles } from "lucide-react";
import { mcpServer } from "@/lib/data";
import { trackAction } from "@/components/Analytics";

type Exchange = {
  question: string;
  answer?: string;
  sources?: { label: string; url: string }[];
  error?: string;
};

const SUGGESTIONS = [
  "Has Ashish led a team or mentored people?",
  "What's his notice period, and would he relocate?",
  "Which automation frameworks has he built?",
  "How does he use AI in testing?",
];

const ERRORS: Record<number, string> = {
  400: "Please ask a question between 3 and 400 characters.",
  429: "That's a lot of questions in a minute — give it a moment and try again.",
};

const ENDPOINT = mcpServer.remoteUrl ? `${mcpServer.remoteUrl}/ask` : null;

export function AskAssistant() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  async function ask(question: string) {
    const q = question.trim();
    if (!q || pending || !ENDPOINT) return;
    setPending(true);
    setExchanges((prev) => [{ question: q }, ...prev]);
    trackAction("ask", "Asked the assistant");

    let result: Exchange = { question: q };
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = (await res.json().catch(() => null)) as { answer?: string; sources?: Exchange["sources"] } | null;
      result =
        res.ok && data?.answer
          ? { question: q, answer: data.answer, sources: data.sources ?? [] }
          : { question: q, error: ERRORS[res.status] ?? "The assistant isn't available right now. Please try again later." };
    } catch {
      result = { question: q, error: "Couldn't reach the assistant. Check your connection and try again." };
    }
    setExchanges((prev) => [result, ...prev.slice(1)]);
    setPending(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    void ask(input.value);
    input.value = "";
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row" data-no-track>
        <label htmlFor={inputId} className="sr-only">
          Ask a question about Ashish
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          name="question"
          maxLength={400}
          required
          autoComplete="off"
          placeholder="Ask about Ashish's experience, skills, or availability…"
          className="min-h-11 flex-1 rounded-lg border border-border bg-background px-3 text-sm placeholder:text-subtle"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground hover:brightness-110 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
          {pending ? "Thinking…" : "Ask"}
        </button>
      </form>

      {exchanges.length === 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Suggested questions">
          {SUGGESTIONS.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => void ask(s)}
                data-no-track
                className="min-h-8 rounded-full border border-border bg-surface-2/60 px-3 text-left text-xs text-foreground hover:border-accent"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite" aria-busy={pending} className="mt-5 space-y-4">
        {exchanges.map((x, i) => (
          <article key={`${x.question}-${exchanges.length - i}`} className="rounded-lg border border-border bg-background p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">You asked</p>
            <p className="mt-1 text-sm font-medium text-foreground">{x.question}</p>
            {x.answer && (
              <>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-6 text-foreground">{x.answer}</p>
                {x.sources && x.sources.length > 0 && (
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span className="font-mono uppercase tracking-[0.06em] text-subtle">Sources</span>
                    {x.sources.map((s) => (
                      <a key={s.url} href={s.url} className="inline-flex min-h-6 items-center gap-1 text-accent hover:underline">
                        {s.label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ))}
                  </p>
                )}
              </>
            )}
            {x.error && <p className="mt-3 text-sm text-danger">{x.error}</p>}
            {!x.answer && !x.error && <p className="mt-3 text-sm text-muted">Thinking…</p>}
          </article>
        ))}
      </div>

      <p className="mt-4 text-xs text-subtle">
        AI-generated from this site&apos;s content only (Llama 3.3 on Cloudflare). It can make mistakes — the source
        links show where each answer comes from. Questions aren&apos;t stored.
      </p>
    </div>
  );
}
