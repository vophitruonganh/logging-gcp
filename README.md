<h1 align="center">Welcome to Logging GCP 👋</h1>
<p>
  <a href="https://github.com/vophitruonganh/logging-gcp#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/vophitruonganh/logging-gcp/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/vophitruonganh/logging-gcp/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://camo.githubusercontent.com/75ffcd07adcea9708fdbaf7ec105191431de498d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d79656c6c6f772e737667" />
  </a>
</p>

> Logging to GCP with winston

## Enviromemnt

``` sh
NodeJS: >= 8.x.x
NPM: 6.14.x
```

## Install

```sh
npm install logging-gcp
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



## Author

👤  **Truong Anh Vo** ([@vophitruonganh](https://github.com/vophitruonganh))

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License 
Copyright © 2020 - [Truong Anh Vo](https://github.com/vophitruonganh).<br />
This project is [MIT](https://github.com/vophitruonganh/logging-gcp/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_