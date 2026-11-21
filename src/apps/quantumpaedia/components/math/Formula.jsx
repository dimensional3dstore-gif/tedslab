import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Renders LaTeX with KaTeX. Falls back to a readable monospace form if a
 * string cannot be parsed, so a bad expression never breaks a page.
 */
export default function Formula({ tex, display = false, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        output: 'html',
      });
    } catch {
      return null;
    }
  }, [tex, display]);

  if (!html) {
    return <code className={`mono text-[13px] text-[#a8bcd3] ${className}`}>{tex}</code>;
  }

  return (
    <span
      className={`${display ? 'block w-full overflow-x-auto qp-scroll' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}