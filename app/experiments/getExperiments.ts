import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface Experiment {
  id: string;
  path: string;
}

const NEXTJS_EXPERIMENTS = ['006', '012', '013', '026', '027', '028'];

const NAMED_EXPERIMENTS: Experiment[] = [
  { id: '030', path: '/experiments/flowers' },
];

export function getExperiments(): Experiment[] {
  const staticDir = join(process.cwd(), 'public', 'static');

  try {
    const entries = readdirSync(staticDir);

    const staticExperiments = entries
      .filter((entry) => {
        if (!/^\d{3}$/.test(entry)) return false;
        const fullPath = join(staticDir, entry);
        if (!statSync(fullPath).isDirectory()) return false;
        return existsSync(join(fullPath, 'index.html'));
      })
      .map((dir) => ({
        id: dir,
        path: NEXTJS_EXPERIMENTS.includes(dir)
          ? `/experiments/${dir}`
          : `/static/${dir}/index.html`,
      }));

    const appDir = join(process.cwd(), 'app', 'experiments');
    const nextjsOnly = NEXTJS_EXPERIMENTS
      .filter((id) => !staticExperiments.find((e) => e.id === id))
      .filter((id) => existsSync(join(appDir, id, 'page.tsx')))
      .map((id) => ({ id, path: `/experiments/${id}` }));

    const named = NAMED_EXPERIMENTS.filter((exp) => {
      const slug = exp.path.replace(/^\/experiments\//, '');
      return existsSync(join(appDir, slug, 'page.tsx'));
    });

    return [...staticExperiments, ...nextjsOnly, ...named].sort((a, b) =>
      a.id.localeCompare(b.id),
    );
  } catch (error) {
    console.error('Error reading experiments directory:', error);
    return [];
  }
}
