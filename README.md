<h1 align="center">PDF Microservice</h1>
<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://github.com/GoogleChrome/puppeteer" target="_blank"><img src="https://developers.google.com/web/tools/images/puppeteer.png" width="80" alt="puppeteer" /></a>
</p>

## Description

Is a HTML 2 PDF service powered by NestJS and Puppeteer (Headless Chrome)

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Usage

### URL 2 PDF

```http
POST http://localhost:3000/pdf/render-url
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

### HTML 2 PDF

```http
POST http://localhost:3000/pdf/render-html
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
