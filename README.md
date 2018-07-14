# vue-raven
[![npm (scoped with tag)](https://img.shields.io/npm/v/@ecg/vue-raven.svg)](https://npmjs.com/package/@ecg/vue-raven)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Using sentry -> raven.js in vue

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
  version: pkg.version // optional
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
          email: user.email, // omit  or must be email format
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
| version | `String` | `'not provided'` | Provide Your App Version |
| disableAutoReport | `Boolean` | `false` | Disable Auto Report In Vue |

## Lisence

MIT