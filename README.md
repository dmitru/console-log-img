<h1 align="center">Print Images to Browser Console from Any Source ⚡️</h1>
<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/dmitru/console-log-img"/>
</p>
<br/>

<a href="https://imgur.com/06122Fq"><img src="https://i.imgur.com/06122Fq.gif" title="source: imgur.com" /></a>

# What is it

**Tiny library to print images to browser console.**
**Think `console.log` but for images!**

[VIEW DEMO](https://codesandbox.io/s/console-log-img-test-bti64)

It makes development and debugging of canvas or image-based apps and algorithms a lot easier and more enjoyable. Really, who doesn't like images in the console? 😃

This library extends the global `console` object with a new method:

```typescript
console.img(
  imgSource:
    | string
    | HTMLImageElement
    | ImageBitmap
    | OffscreenCanvas
    | HTMLCanvasElement
    | CanvasRenderingContext2D,
  scale = 1,
  printDimensions = true,
)
```

### Features

- ✅ supports many image source: Image elements, Canvas, 2D Context, ImageBitmap, image URIs
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

# Acknowledges & Thanks

- Source code was adapted from dunxrion/console.image
- Original created by Adrian Cooney

# Used By

Using console-log-img? Open an issue to add your company or project to this list.

- [Inkarnate](https://inkarnate.com)
- [WordCloudy](https://wordcloudy.com)
