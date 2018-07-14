# vue-raven
Using sentry -> raven.js in vue

## Installation

```bash
$ npm i @savo/vue-raven
```

## Usage

### Configure
Configure your dsn first: [Sentry DSN](https://docs.sentry.io/quickstart/#configure-the-dsn)

```js
import Vue from 'vue'
import VueRaven from '@savo/vue-raven'
import pkg from '../package.json'

Vue.use(VueRaven, {
  dsn: 'https://<key>@sentry.io/project', // or your custom public dsn
  version: pkg.version // optional
})
```

### Manual Report

- In vue file

```vue
// some-component
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

- In js file

```js
// api.js
import { Raven } from '@savo/vue-raven'
// your service
export default {
  login (params) {
    return api.get(url, params).then(res => {
      if(res.ok) {
        const user = res.data.user
        // set user context
        // the context will be send with error report
        Raven.setUser({
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
| dsn  | `String` | `null` | The Data Source Name |
| version | `String` | `not provided` | Provide your app version |
| disableAutoReport | `Boolean` | `false` | Disable auto report in vue |

## Lisence

MIT