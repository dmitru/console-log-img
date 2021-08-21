<h1 align="center">Print Images to Browser Console from Any Source ⚡️</h1>
<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/dmitru/console-log-img"/>
</p>
<br/>

<a href="https://imgur.com/06122Fq"><img src="https://i.imgur.com/06122Fq.gif" title="source: imgur.com" /></a>

# What is it

It extends `window.console` to allow you print Canvases and images from various sources.

[VIEW DEMO](https://codesandbox.io/s/console-log-img-test-bti64)

### Use-cases

To help develop visual algorithms: generative design and art, image processing, etc.

This library extends the global `console` object with a new method to print an image from one of the many supported sources:

```typescript
console.img(
  imgSource:
    | string
    | HTMLImageElement
    | OffscreenCanvas
    | ImageBitmap
    | HTMLCanvasElement
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D
  scale = 1,
  printDimensions = true,
)
```

### Features

- ✅ supports many image source types: HTMLCanvasElement, OffscreenCanvas, Image elements, ImageBitmap, image URIs
- ✅ works in WebWorkers with OffscreenCanvas
- ✅ zero dependencies
- ✅ it's tiny!
- ✅ written in TypeScript

# Usage

```typescript
import { initConsoleLogImg } from 'console-log-img';

// Run this once to initialize the library
initConsoleLogImg({
  // Optionally, disable image dimensions logging (enabled by default)
  printDimensions: true,
});

// ... later in the code ...

// Print an image from a URI, at original size
console.img('https://openclipart.org/image/800px/5661');

// Print a Canvas at 30% zoom, also log canvas dimensions
const canvas = document.getElementById('my-canvas');
console.img(canvas, 0.3, true);

// Print a CanvasRenderingContext2D
const ctx = canvas.getContext('2d');
console.img(ctx, 0.5);

// Print an ImageBitmap at 100% zoom
const bitmap = await createImageBitmap(canvas);
console.img(bitmap, 1);

// Print an Image DOM element
const imgEl = document.getElementById('my-img');
console.img(imgEl);
```

# Install

```
npm i --save console-log-img
```

Or with Yarn:

```
yarn add console-log-img
```

# Acknowledgements & Thanks

- Source code was adapted from dunxrion/console.image
- Original created by Adrian Cooney

# Used By

Using console-log-img? Open an issue to add your company or project to this list.

- [Inkarnate](https://inkarnate.com)
