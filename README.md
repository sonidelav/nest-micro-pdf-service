<h1 align="center">PDF Microservice</h1>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Is a HTML 2 PDF service powered by NestJS and Puppeteer (Headless Chrome)

# Installation

```bash
$ npm install
```

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Usage

## URL 2 PDF

```http
POST http://localhost:3000//pdf/render-url
```
```js
{
    "url": "https://www.google.gr",       // Url to navigate and print to pdf.
    "filename": "test.pdf",               // Name of file to download.
    "json": true,                         // false to force download stream file.
    "options": {
        "screen": false,                  // true for screen media and not print.
        "page": {
            "format": "A4",               // Paper Format (A0, A1, A2 ...).
            "landscape": false,           // Orientation.
            "height": null,               // Custom Height of Page.
            "width": null                 // Custom Width of Page.
        }
    }
}
```

## HTML 2 PDF

```http
POST http://localhost:3000//pdf/render-html
```

```js
{
    "html": "<h1>.....",                  // HTML print when DOMReady event trigged.
    "filename": "test.pdf",               // Name of file to download.
    "json": true,                         // false to force download stream file.
    "options": {
        "screen": false,                  // true for screen media and not print.
        "page": {
            "format": "A4",               // Paper Format (A0, A1, A2 ...).
            "landscape": false,           // Orientation.
            "height": null,               // Custom Height of Page.
            "width": null                 // Custom Width of Page.
        }
    }
}
```