# Logging GCP

> Logging data to Logging GCP

## Enviromemnt
``` 
NodeJS: >= 8.x.x
NPM: 6.14.x 
```


## Install

```bash
npm i logging-gcp
```

## Usage

```javascript
const logger = require('logging-gcp').init({
  keyFilename: <path-key-file>.json,
  logName: <log name to GCP Logging>
});


//Logging with type info
logger.info('Logging information data to gcp');

//Logging with type warning
logger.warning('Logging warning message to gcp');

//Logging with type error
logger.error('Logging error message to gcp');
 ```

## License 
[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master

## Author
truonganhvo