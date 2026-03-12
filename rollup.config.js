import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { readdirSync } from 'fs';
import { join } from 'path';

// Collect all component entry points for per-component builds
function getComponentEntries() {
  const entries = {};
  const componentDirs = [
    { dir: 'src/ai', prefix: '' },
    { dir: 'src/svg', prefix: '' },
    { dir: 'src/components/elements', prefix: '' },
    { dir: 'src/components/inputs', prefix: '' },
    { dir: 'src/components/navigation', prefix: '' },
    { dir: 'src/components/overlays', prefix: '' },
    { dir: 'src/components/layout', prefix: '' },
    { dir: 'src/components/data', prefix: '' },
  ];

  for (const { dir } of componentDirs) {
    const files = readdirSync(dir).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const name = file.replace('.js', '');
      entries[`components/${name}`] = join(dir, file);
    }
  }
  return entries;
}

const componentEntries = getComponentEntries();

// Bundle build (3 formats)
const bundleConfig = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/papyrai-ui.js',
      format: 'umd',
      name: 'PapyraiUI',
      sourcemap: true
    },
    {
      file: 'dist/papyrai-ui.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/papyrai-ui.min.js',
      format: 'umd',
      name: 'PapyraiUI',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [resolve()]
};

// Per-component ESM build (tree-shakeable)
const perComponentConfig = {
  input: componentEntries,
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].js',
    chunkFileNames: 'chunks/[name]-[hash].js'
  },
  plugins: [resolve()],
  external: ['lit']
};

export default [bundleConfig, perComponentConfig];
