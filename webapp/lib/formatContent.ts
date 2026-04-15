/**
 * Transforms plain or lightly formatted text from admin panel
 * into premium HTML for the service detail page.
 *
 * Rules:
 * - Already-HTML content (contains tags) is passed through with minor enhancements
 * - Plain text is split into paragraphs by double-newline or period-chains
 * - Lines starting with "- " or "• " become checkmark list items
 * - Lines starting with "# " or all-uppercase become section headings
 * - Short standalone lines are treated as sub-headings
 * - Wraps blocks in semantic HTML for Tailwind's prose to style
 */
export function formatServiceContent(raw: string | null | undefined): string {
  if (!raw || raw.trim() === '') {
    return '<p class="text-slate-500 italic">Bu hizmet için detaylı içerik yakında eklenecektir.</p>';
  }

  const trimmed = raw.trim();

  // If content already has rich HTML tags, just enhance it
  const hasRichHTML = /<(h[1-6]|ul|ol|blockquote|table|div|section)/i.test(trimmed);
  if (hasRichHTML) {
    return enhanceExistingHTML(trimmed);
  }

  // If content has basic <p> or <br> but nothing else, still process it
  const strippedHTML = trimmed.replace(/<[^>]+>/g, '').trim();
  const textToProcess = strippedHTML.length > 0 ? strippedHTML : trimmed;

  return transformPlainText(textToProcess);
}

function enhanceExistingHTML(html: string): string {
  // Add spacing classes to existing lists
  let enhanced = html;
  enhanced = enhanced.replace(/<li>/g, '<li class="flex items-start gap-3 mb-3">');
  return enhanced;
}

function transformPlainText(text: string): string {
  // Split by double newlines first to get paragraphs
  const rawBlocks = text.split(/\n\s*\n/).filter(b => b.trim() !== '');

  // If there's only one block, try to split long text by sentences
  let blocks: string[];
  if (rawBlocks.length <= 1 && text.length > 300) {
    blocks = splitBySentences(text);
  } else if (rawBlocks.length <= 1) {
    // Try splitting by single newlines
    blocks = text.split('\n').filter(b => b.trim() !== '');
  } else {
    blocks = rawBlocks;
  }

  const htmlParts: string[] = [];
  let currentListItems: string[] = [];

  for (const block of blocks) {
    const trimBlock = block.trim();

    // Check if it's a list item
    if (isListItem(trimBlock)) {
      currentListItems.push(extractListText(trimBlock));
      continue;
    }

    // Flush any pending list items
    if (currentListItems.length > 0) {
      htmlParts.push(renderCheckList(currentListItems));
      currentListItems = [];
    }

    // Check if it's a heading-like line
    if (isHeading(trimBlock)) {
      htmlParts.push(`<h2>${escapeHtml(trimBlock.replace(/^#+\s*/, ''))}</h2>`);
      continue;
    }

    // Regular paragraph - possibly split long ones
    if (trimBlock.length > 500) {
      const subParagraphs = splitBySentences(trimBlock);
      for (const sp of subParagraphs) {
        htmlParts.push(`<p>${escapeHtml(sp.trim())}</p>`);
      }
    } else {
      htmlParts.push(`<p>${escapeHtml(trimBlock)}</p>`);
    }
  }

  // Flush remaining list items
  if (currentListItems.length > 0) {
    htmlParts.push(renderCheckList(currentListItems));
  }

  // If result is too short / thin, add a subtle accent
  if (htmlParts.length <= 2 && text.length > 100) {
    // Add a highlight box for the first paragraph
    const first = htmlParts.shift() || '';
    htmlParts.unshift(
      `<div class="bg-slate-50 border-l-4 border-red-500 rounded-r-xl px-6 py-5 mb-8 not-prose">
        <p class="text-slate-700 leading-relaxed text-base md:text-lg font-light m-0">${first.replace(/<\/?p>/g, '')}</p>
      </div>`
    );
  }

  return htmlParts.join('\n');
}

function isListItem(line: string): boolean {
  return /^[-•●►✓✔→]\s+/.test(line) || /^\d+[.)]\s+/.test(line);
}

function extractListText(line: string): string {
  return line.replace(/^[-•●►✓✔→]\s+/, '').replace(/^\d+[.)]\s+/, '').trim();
}

function isHeading(line: string): boolean {
  if (line.startsWith('#')) return true;
  if (line.length < 60 && line === line.toUpperCase() && line.length > 3) return true;
  if (line.length < 50 && line.endsWith(':')) return true;
  return false;
}

function renderCheckList(items: string[]): string {
  const listItems = items.map(item =>
    `<li class="flex items-start gap-3 text-slate-600">
      <svg class="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      <span>${escapeHtml(item)}</span>
    </li>`
  ).join('\n');

  return `<ul class="space-y-3 my-8 list-none pl-0">${listItems}</ul>`;
}

function splitBySentences(text: string): string[] {
  // Split at sentence boundaries but keep minimum ~2-3 sentences per block
  const sentences = text.split(/(?<=[.!?])\s+/);
  const blocks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    current += (current ? ' ' : '') + sentence;
    // Create new block every 2-3 sentences or 200+ chars
    if (current.length > 200 || (current.split(/[.!?]/).length > 3)) {
      blocks.push(current);
      current = '';
    }
  }
  if (current.trim()) {
    blocks.push(current);
  }

  return blocks;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
