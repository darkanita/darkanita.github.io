// Resaltado mínimo de Python para las celdas de entrada.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const KW = /\b(from|import|as|for|in|def|return|if|else|True|False|None)\b/g;

export function py(src: string): string {
  return src
    .trim()
    .split('\n')
    .map((line) => {
      const [code, ...rest] = line.split('#');
      const comment = rest.length ? `<span class="c">#${esc(rest.join('#'))}</span>` : '';
      const parts = code.split(/("[^"]*")/g).map((chunk, i) =>
        i % 2
          ? `<span class="s">${esc(chunk)}</span>`
          : esc(chunk)
              .replace(KW, '<span class="k">$1</span>')
              .replace(/\b(\d+)\b/g, '<span class="n">$1</span>')
              .replace(/\.(\w+)\(/g, '.<span class="f">$1</span>(')
      );
      return parts.join('') + comment;
    })
    .join('\n');
}
