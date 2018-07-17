/*!
 * @ecg/vue-raven v2.0.0
 * (c) 2018-present savokiss <jaynaruto@qq.com>
 * Released under the MIT License.
 */
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

var plugin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _options = Object.assign({
      dsn: options.dsn || '',
      version: options.version || '',
      disableReport: options.disableReport || false,
      disableVueReport: options.disableVueReport || false
    }, options);

    if (_options.disableReport) {
      _options.dsn = '';
      console.log('Sentry has disabled');
    }

    Raven.config(_options.dsn);

    if (!_options.disableVueReport) {
      Raven.addPlugin(RavenVue, Vue);
    }

    Raven.install();

    if (_options.version) {
      Raven.setRelease(_options.version);
    }

    Vue.prototype.$raven = Raven;
  }
};
plugin.Raven = Raven;

export default plugin;
