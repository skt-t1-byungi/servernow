# servernow
Get server timestamp

## Install
```sh
npm i servernow
```

## Usage
```js
import servernow from 'servernow'

servernow().then(timestamp => {
    console.log(timestamp) // => This is your server timestamp.
})
```

## API
### servernow(url = '/')
Returns a promise that gets server time.

## License
MIT
