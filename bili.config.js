const pkg = require('./package.json')

process.env.BABEL_ENV = 'main'

module.exports = {
  format: ['umd', 'umd-min', 'es'],
  exports: 'named', // disable rollup warning for mixed exports
  globals: { // for umd build && bili will add those to external
    'raven-js': 'Raven'
  },
  banner: {
    name: pkg.name,
    version: pkg.version,
    year: '2018',
    author: pkg.author,
    license: pkg.license
  }
}
