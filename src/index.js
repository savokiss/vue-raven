import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export default {
  install (Vue, options = {}) {
    const _options = Object.assign({
      dsn: options.dsn || '',
      version: options.version || 'not provided',
      disableReport: options.disableReport || false,
      disableAutoReport: options.disableAutoReport || false
    }, options)

    if (_options.disableReport) {
      _options.dsn = ''
      console.log('Sentry has disabled')
    }

    Raven.config(_options.dsn)

    if (!_options.disableAutoReport) {
      Raven.addPlugin(RavenVue, Vue)
    }

    Raven.install()

    Raven.setRelease(_options.version)

    Vue.prototype.$raven = Raven
  },
  Raven
}
