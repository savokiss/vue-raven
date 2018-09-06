import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

const plugin = {
  install (Vue, options = {}) {
    const _options = Object.assign({
      dsn: options.dsn || '',
      env: options.env || 'production',
      version: options.version || '',
      disableReport: options.disableReport || false,
      disableVueReport: options.disableVueReport || false,
      config: {}
    }, options)

    if (_options.disableReport) {
      _options.dsn = ''
      console.log('Sentry has disabled')
    }

    Raven.config(_options.dsn, {
      environment: _options.env,
      release: _options.version,
      ..._options.config
    })

    if (!_options.disableVueReport) {
      Raven.addPlugin(RavenVue, Vue)
    }

    Raven.install()

    Vue.prototype.$raven = Raven
  }
}

export {
  Raven
}

export default plugin
