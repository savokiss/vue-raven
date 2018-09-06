# vue-raven
[![npm (scoped with tag)](https://img.shields.io/npm/v/@ecg/vue-raven.svg)](https://npmjs.com/package/@ecg/vue-raven)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![dependencies](https://img.shields.io/david/savokiss/vue-raven.svg)]()

Using sentry's `raven.js` in vue

## Installation

```bash
$ npm i @ecg/vue-raven
```

## Usage

### Configure
Configure your dsn first: [Sentry DSN](https://docs.sentry.io/quickstart/#configure-the-dsn)

```js
import Vue from 'vue'
import VueRaven from '@ecg/vue-raven'
import pkg from '../package.json'

Vue.use(VueRaven, {
  dsn: 'https://<key>@sentry.io/project', // or your custom public dsn
  version: pkg.version, // optional
})
```

### Manual Report

- In `.vue` file

```js
// some-component.vue
export default {
  methods: {
    onSubmit () {
      try {
        Form.submit(/* data */)
      } catch (err) {
        this.$raven.captureException(err)
        // this.$raven.captureMessage('msg')
      }
    }
  }
}
```

- In `.js` file

```js
// api.js
import { Raven } from '@ecg/vue-raven'
// your service
export default {
  login (params) {
    return api.get(url, params).then(res => {
      if(res.ok) {
        const user = res.data.user
        // set user context
        // the context will be send with error report
        Raven.setUserContext({
          id: user.id
          username: user.username,
          email: user.email, // omit or must be valid email
          // you can provided extra context here 
        })
      }
      return res
    })
  }
}
```

## Options

| Option  | Type | Default  | Info |
| ------------- | ------------- | ------------- | ------------- |
| dsn  | `String` | `''` | The Data Source Name |
| env  | `String` | `'production'` | The Environment Name |
| version | `String` | `''` | Provide Your App Version |
| disableReport | `Boolean` | `false` | Disable All Report In Your App, You Can Use `process.env.NODE_ENV === 'development'` For Development |
| disableVueReport | `Boolean` | `false` | Disable Auto Report In Vue |
| config | `Boolean` | `Object` | Extra config for sentry |

## Related Projects
- [raven-js](https://github.com/getsentry/raven-js)
- [vue-raven](https://github.com/anteriovieira/vue-raven)

## Lisence

MIT