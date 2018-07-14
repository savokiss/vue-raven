import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

const plugin = {
  install (Vue, options = {}) {
    const _options = Object.assign({
      dsn: options.dsn || '',
      version: options.version || '',
      disableReport: options.disableReport || false,
      disableVueReport: options.disableVueReport || false
    }, options)

    if (_options.disableReport) {
      _options.dsn = ''
      console.log('Sentry has disabled')
    }

    Raven.config(_options.dsn)

    if (!_options.disableVueReport) {
      Raven.addPlugin(RavenVue, Vue)
    }

    Raven.install()

    if (_options.version) {
      Raven.setRelease(_options.version)
    }

    Vue.prototype.$raven = Raven
  }
}

plugin.Raven = Raven

export default plugin
