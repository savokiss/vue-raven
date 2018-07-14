import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

process.env.BABEL_ENV = 'main'

export default {
  input: 'src/index.js',
  output: {
    name: 'emitter',
    file: pkg.main,
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    uglify()
  ]
}
