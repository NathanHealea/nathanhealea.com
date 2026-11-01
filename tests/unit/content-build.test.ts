import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '../..');
const astroBin = join(projectRoot, 'node_modules', 'astro', 'bin', 'astro.mjs');

function copyProject(): string {
  const dir = mkdtempSync(join(tmpdir(), 'content-build-'));
  for (const file of ['package.json', 'tsconfig.json']) {
    cpSync(join(projectRoot, file), join(dir, file));
  }
  cpSync(join(projectRoot, 'astro.config.mjs'), join(dir, 'astro.config.project.mjs'));
  // Without its own cacheDir, astro sync writes through the node_modules symlink into the real project's cache.
  writeFileSync(
    join(dir, 'astro.config.mjs'),
    "import config from './astro.config.project.mjs';\nexport default { ...config, cacheDir: './.astro-test-cache' };\n",
  );
  cpSync(join(projectRoot, 'src'), join(dir, 'src'), { recursive: true });
  symlinkSync(join(projectRoot, 'node_modules'), join(dir, 'node_modules'), 'dir');
  return dir;
}

function astroSync(cwd: string) {
  const result = spawnSync(process.execPath, [astroBin, 'sync'], { cwd, encoding: 'utf8' });
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

describe('content build', () => {
  it('syncs an unmodified copy of the project', () => {
    const dir = copyProject();
    try {
      const { status, output } = astroSync(dir);
      expect(status, output).toBe(0);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 60_000);

  it('build fails naming file and field for a malformed entry', () => {
    const dir = copyProject();
    try {
      const entry = join(dir, 'src', 'content', 'projects', 'placeholder-alpha.md');
      expect(existsSync(entry), 'src/content/projects/placeholder-alpha.md not found').toBe(true);

      const original = readFileSync(entry, 'utf8');
      const withoutTitle = original
        .split('\n')
        .filter((line) => !line.startsWith('title:'))
        .join('\n');
      expect(withoutTitle, 'placeholder-alpha.md has no title: line to remove').not.toBe(original);
      writeFileSync(entry, withoutTitle);

      const { status, output } = astroSync(dir);
      expect(status, output).not.toBe(0);
      expect(output).toContain('placeholder-alpha');
      expect(output).toMatch(/title.*Required/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 60_000);
});
