# servernow
Get server timestamp

[![npm](https://flat.badgen.net/npm/v/servernow)](https://www.npmjs.com/package/servernow)
[![license](https://flat.badgen.net/github/license/skt-t1-byungi/servernow)](https://github.com/skt-t1-byungi/clearall/blob/master/LICENSE)


## Install
### npm
```sh
npm i servernow
```
### browser esm
```html
<script type="module">
    import servernow from 'https://unpkg.com/servernow/dist/index.modern.js'

    /* ... */
</script>
```

## Example
```js
import servernow from 'servernow'

servernow().then(t => console.log(t)) // => This is your server timestamp.
```

## API
### servernow(url?, opts?)
Returns a promise that gets server timestamp.

#### url
Request url to get server time. Default is `/`.

#### opts
- `ignoreCache` - Ignore cache and force a request to server.

## License
MIT
