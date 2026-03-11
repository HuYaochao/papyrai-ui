import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
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
  plugins: [
    resolve()
  ]
};
