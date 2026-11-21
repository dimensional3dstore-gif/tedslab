import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

const FORMATS = (article) => ({
  APA: `${article.author}. (${article.updated.slice(0, 4)}). ${article.title}. Quantumpaedia.`,
  Chicago: `${article.author}. "${article.title}." Quantumpaedia, ${article.updated}.`,
  BibTeX: `@misc{quantumpaedia_${article.slug},
  title = {${article.title}},
  author = {${article.author}},
  year = {${article.updated.slice(0, 4)}},
  howpublished = {Quantumpaedia, ${article.category}},
  note = {Accessed ${new Date().toISOString().slice(0, 10)}}
}`,
  Plain: `${article.title}. Quantumpaedia — ${article.category}. Last updated ${article.updated}.`
});

export default function CitationDialog({ article, onClose }) {
  const [copied, setCopied] = useState('');

  const copy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('');
    }
  };

  const formats = FORMATS(article);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#03101f]/75 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="qp-panel w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--qp-accent)]/12 px-4 py-3">
          <div>
            <p className="qp-label">Cite this article</p>
            <p className="mt-1 text-[12.5px] text-[#eaf4ff]">{article.title}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded p-1 text-[#7088a5] hover:text-[#f0f6ff]" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2.5 p-4">
          {Object.entries(formats).map(([key, value]) => (
            <div key={key} className="rounded-lg border border-[var(--qp-accent)]/12 bg-[#071729]/70 p-2.5">
              <div className="flex items-center justify-between">
                <span className="qp-label">{key}</span>
                <button
                  type="button"
                  onClick={() => copy(key, value)}
                  className="flex items-center gap-1 text-[10px] text-[var(--qp-accent)] hover:underline"
                >
                  {copied === key ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied === key ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="mono mt-1.5 whitespace-pre-wrap break-words text-[10.5px] leading-relaxed text-[#a8bcd3]">{value}</pre>
            </div>
          ))}
          <p className="text-[10px] leading-relaxed text-[#5f7893]">
            Quantumpaedia entries are editorial summaries of published science. Cite the primary references listed under the
            References tab for research use.
          </p>
        </div>
      </div>
    </div>
  );
}