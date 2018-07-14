import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export default {
  install (Vue, options = {}) {
    const _options = Object.assign({
      dsn: options.dsn || '',
      version: options.version || 'not provided',
      disableAutoReport: options.disableAutoReport || false
    }, options)

    Raven.config(_options.dsn)

    if (!_options.disableAutoReport) {
      Raven.addPlugin(RavenVue, Vue)
    }

    Raven.install()

    Vue.prototype.$raven = Raven
  }
}

export {
  Raven
}
