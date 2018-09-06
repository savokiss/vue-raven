/*!
 * @ecg/vue-raven v2.2.0
 * (c) 2018-present savokiss <jaynaruto@qq.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('raven-js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'raven-js'], factory) :
  (factory((global.vueRaven = {}),global.Raven));
}(this, (function (exports,Raven) { 'use strict';

  Raven = Raven && Raven.hasOwnProperty('default') ? Raven['default'] : Raven;

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

  /**
   * Vue.js 2.0 plugin
   *
   */

  function formatComponentName(vm) {
    if (vm.$root === vm) {
      return 'root instance';
    }
    var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
    return (
      (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '')
    );
  }

  function vuePlugin(Raven$$1, Vue) {
    Vue = Vue || window.Vue;

    // quit if Vue isn't on the page
    if (!Vue || !Vue.config) return;

    var _oldOnError = Vue.config.errorHandler;
    Vue.config.errorHandler = function VueErrorHandler(error, vm, info) {
      var metaData = {};

      // vm and lifecycleHook are not always available
      if (Object.prototype.toString.call(vm) === '[object Object]') {
        metaData.componentName = formatComponentName(vm);
        metaData.propsData = vm.$options.propsData;
      }

      if (typeof info !== 'undefined') {
        metaData.lifecycleHook = info;
      }

      Raven$$1.captureException(error, {
        extra: metaData
      });

      if (typeof _oldOnError === 'function') {
        _oldOnError.call(this, error, vm, info);
      }
    };
  }

  var vue = vuePlugin;

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
        Raven.addPlugin(vue, Vue);
      }

      Raven.install();
      Vue.prototype.$raven = Raven;
    }
  };

  exports.Raven = Raven;
  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
