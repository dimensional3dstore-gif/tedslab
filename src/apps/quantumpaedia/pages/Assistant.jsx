import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Send, Sparkles, Trash2, Loader2, AlertTriangle, BookOpen, ChevronDown } from 'lucide-react';
import { Panel, Chip, PageHeader } from '@/components/common/Kit';
import { base44 } from '@/api/base44Client';
import { articles } from '@/data/articles';

const KEY = 'quantumpaedia.assistant.v1';

const LEVELS = [
  { key: 'beginner', label: 'Beginner' },
  { key: 'intermediate', label: 'Intermediate' },
  { key: 'advanced', label: 'Advanced' },
  { key: 'mathematical', label: 'Mathematical' }
];

const PROMPTS = [
  'Explain entanglement without using the word spooky.',
  'Derive the uncertainty relation from the commutator.',
  'How does a Bell test rule out local hidden variables?',
  'Why does a quantum computer need error correction?'
];

const systemPrompt = (level, context) => `You are the Quantum AI Assistant inside Quantumpaedia, a scientific reference system for quantum physics, quantum mathematics and quantum research.

Answer level: ${level}. ${
  level === 'beginner'
    ? 'Use plain language, short sentences and concrete analogies. Avoid formalism unless essential.'
    : level === 'intermediate'
    ? 'Use standard undergraduate physics vocabulary and give the key equations with symbol definitions.'
    : level === 'advanced'
    ? 'Use graduate-level terminology, state assumptions, and give precise mathematical formulation.'
    : 'Prioritise formal derivation: define the Hilbert space, operators and assumptions, then carry the algebra through step by step.'
}${context ? `\n\nThe reader is currently studying the article "${context}". Use it as context.` : ''}

Requirements:
- Clearly label claims as established physics, theoretical proposal, interpretation-dependent, or speculative.
- Never invent citations, DOIs, numerical measurements or publication details. If you are unsure of a specific reference, say so instead.
- Use Unicode mathematics (ψ, ħ, ⟨ ⟩, Σ, ∫, √) on their own lines. Do not use LaTeX delimiters.
- Prefer short paragraphs and bullet lists. End with a one-line summary.`;

export default function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [level, setLevel] = useState('intermediate');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;
    setError('');
    const next = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const answer = await base44.integrations.Core.InvokeLLM({
        prompt: `${systemPrompt(level, context)}\n\nConversation so far:\n${next
          .slice(-6)
          .map((m) => `${m.role === 'user' ? 'Reader' : 'Assistant'}: ${m.content}`)
          .join('\n')}\n\nReader question: ${question}`,
      });
      setMessages([...next, { role: 'assistant', content: typeof answer === 'string' ? answer : JSON.stringify(answer) }]);
    } catch (e) {
      setError('The assistant could not be reached. Check the app’s AI integration and try again.');
      setMessages(next);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([]);
    setError('');
  };

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Quantum AI"
        title="Scientific Assistant Console"
        description="Ask for explanations at four levels of depth, with equations, comparisons and derivations. Answers are labelled as established physics, theoretical proposal, interpretation-dependent, or speculative."
        meta={<Chip as="span">connected AI integration</Chip>}
        actions={
          messages.length > 0 && (
            <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--qp-accent)]/25 px-3 py-1.5 text-[11px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/60">
              <Trash2 className="h-3 w-3" /> Clear console
            </button>
          )
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <Panel className="flex h-[620px] flex-col overflow-hidden p-0">
          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--qp-accent)]/10 px-3 py-2">
            <Chip as="span" className="border-[var(--qp-accent)]/30 text-[#d9c8ff]"><Sparkles className="h-2.5 w-2.5" /> console</Chip>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#5f7893]">level</span>
              {LEVELS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => setLevel(l.key)}
                  className={`rounded-full border px-2 py-0.5 text-[9.5px] transition-colors ${
                    level === l.key ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/12 text-[#d6f3ff]' : 'border-transparent text-[#7088a5] hover:text-[#c3d6e8]'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto qp-scroll p-3.5">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--qp-accent)]/30 bg-[var(--qp-accent)]/10">
                  <Sparkles className="h-5 w-5 text-[#c9b2ff]" />
                </span>
                <p className="mt-3 text-[13px] font-medium text-[#eaf4ff]">Ask a scientific question</p>
                <p className="mt-1 max-w-sm text-[11px] leading-relaxed text-[#7088a5]">
                  Set the explanation level, optionally attach an article as context, and ask about concepts, equations or
                  experiments.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => send(p)}
                      className="rounded-full border border-[var(--qp-accent)]/15 px-2.5 py-1 text-[10px] text-[#a8bcd3] hover:border-[var(--qp-accent)]/45 hover:text-[#f0f6ff]"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[86%] rounded-xl px-3 py-2 ${
                    m.role === 'user'
                      ? 'border border-[var(--qp-accent)]/25 bg-[var(--qp-accent)]/10 text-[#e4f6ff]'
                      : 'border border-[var(--qp-accent)]/10 bg-[#071729]/80 text-[#b6c8dc]'
                  }`}
                >
                  {m.role === 'user' ? (
                    <p className="whitespace-pre-wrap text-[12px] leading-relaxed">{m.content}</p>
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mt-1.5 text-[12px] leading-[1.75] first:mt-0">{children}</p>,
                        ul: ({ children }) => <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12px]">{children}</ul>,
                        ol: ({ children }) => <ol className="mt-1.5 list-decimal space-y-1 pl-4 text-[12px]">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="text-[#eaf4ff]">{children}</strong>,
                        h3: ({ children }) => <h3 className="mt-2.5 text-[12.5px] font-semibold text-[#f0f6ff]">{children}</h3>,
                        code: ({ children }) => <code className="mono rounded bg-[#04121f] px-1 py-0.5 text-[11px] text-[#9fd8ff]">{children}</code>
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-[11px] text-[#7088a5]">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--qp-accent)]" /> composing a response…
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-[#ff8fa3]/30 bg-[#ff8fa3]/8 px-3 py-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff9db0]" />
                <p className="text-[10.5px] leading-relaxed text-[#ffc3ce]">{error}</p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="border-t border-[var(--qp-accent)]/10 p-2.5"
          >
            <div className="flex items-end gap-2 rounded-xl border border-[var(--qp-accent)]/18 bg-[#071729] px-3 py-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Ask about a concept, equation or experiment…"
                className="max-h-28 w-full resize-none bg-transparent text-[12px] leading-relaxed text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--qp-accent)] text-[#04121f] transition-opacity disabled:opacity-40"
                aria-label="Send question"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </Panel>

        <aside className="space-y-3.5">
          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Article context</p>
            </div>
            <div className="relative mt-2">
              <select
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full appearance-none rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 pr-7 text-[11px] text-[#d6e9f8] focus:outline-none"
              >
                <option value="">No article attached</option>
                {articles.map((a) => (
                  <option key={a.slug} value={a.title}>{a.title}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2 h-3 w-3 text-[#7088a5]" />
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-1.5">How answers are labelled</p>
            <ul className="space-y-1.5 text-[10.5px] leading-relaxed text-[#8fa8c2]">
              <li><span className="text-[#4ade80]">Established</span> — supported by reproducible experiment.</li>
              <li><span className="text-[var(--qp-accent)]">Theoretical</span> — a consistent proposal, not yet tested.</li>
              <li><span className="text-[#c9b2ff]">Interpretation</span> — depends on which reading of the formalism you adopt.</li>
              <li><span className="text-[#ffb15c]">Speculative</span> — outside mainstream consensus.</li>
            </ul>
            <div className="qp-hairline my-2.5" />
            <p className="text-[10px] leading-relaxed text-[#7088a5]">
              Responses come from the app’s configured AI integration. Verify any numerical value or citation against the
              primary literature before use.
            </p>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Try the laboratory</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              Concepts are easier to internalise when you can turn the parameters yourself.
            </p>
            <div className="mt-2 space-y-1">
              {[
                { label: 'Superposition', to: '/laboratory/superposition' },
                { label: 'Entanglement', to: '/laboratory/entanglement' },
                { label: 'Circuit builder', to: '/laboratory/circuit-builder' }
              ].map((l) => (
                <Link key={l.to} to={l.to} className="block rounded-md px-2 py-1 text-[11px] text-[#c3d6e8] hover:bg-[#102b4b]/60 hover:text-[#f0f6ff]">
                  {l.label}
                </Link>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}