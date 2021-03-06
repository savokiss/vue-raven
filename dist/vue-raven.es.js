/*!
 * @ecg/vue-raven v2.2.0
 * (c) 2018-present savokiss <jaynaruto@qq.com>
 * Released under the MIT License.
 */
import Raven from 'raven-js';
export { default as Raven } from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var plugin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _options = _extends({
      dsn: options.dsn || '',
      env: options.env || 'production',
      version: options.version || '',
      disableReport: options.disableReport || false,
      disableVueReport: options.disableVueReport || false,
      config: {}
    }, options);

    if (_options.disableReport) {
      _options.dsn = '';
      console.log('Sentry has disabled');
    }

    Raven.config(_options.dsn, _objectSpread({
      environment: _options.env,
      release: _options.version
    }, _options.config));

    if (!_options.disableVueReport) {
      Raven.addPlugin(RavenVue, Vue);
    }

    Raven.install();
    Vue.prototype.$raven = Raven;
  }
};

export default plugin;
