# servernow
Get server timestamp in browser.

[![npm](https://flat.badgen.net/npm/v/servernow)](https://www.npmjs.com/package/servernow)
[![license](https://flat.badgen.net/github/license/skt-t1-byungi/servernow)](https://github.com/skt-t1-byungi/clearall/blob/master/LICENSE)


## Install
### npm
```
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
### servernow(options?)
Returns a promise that gets server timestamp.

#### options
#### url
Request url to get server time. Default is `location.href`.

##### cache
If `false`, ignore cache and force a request to server. Default is `true`.

##### margin
If the time difference between server and browser is smaller than this number, just use the browser time. Default is `1000`ms

##### offsetOnly
If `true`, returns the time difference between server and browser. Default is `false`.

```js
servernow({ offsetOnly: true }).then(offset => {
    new Date(Date.now() + offset) // => Date object based on server time.
})
```

## License
MIT
