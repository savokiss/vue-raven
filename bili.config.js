const pkg = require('./package.json')

process.env.BABEL_ENV = 'main'

module.exports = {
  format: ['umd', 'umd-min'],
  banner: {
    name: pkg.name,
    version: pkg.version,
    year: '2018',
    author: pkg.author,
    license: pkg.license
  }
}
