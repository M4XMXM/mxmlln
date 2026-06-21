import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Raw-markdown view of the design system, served at /system.md for agents and
 * LLMs (the /system route only renders HTML). Mirrors how app/system/page.tsx
 * reads the source: same file, frontmatter lifted into a title heading.
 */
export const dynamic = 'force-static';

export function GET() {
  const filePath = path.join(process.cwd(), 'content', 'system.mdx');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const title = (data.title as string | undefined) ?? 'Design System';
  const body = `# ${title}\n\n${content.trim()}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
