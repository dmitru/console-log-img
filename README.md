<h1 align="center">Print Images to Browser Console from Any Source ⚡️</h1>

<br>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/dmitru/console-log-img"/>
</p>
<br />

# What is it

**Tiny library to print images to browser console.**
**Think `console.log` but for images!**

- supports many image source: Image elements, Canvas, 2D Context, ImageBitmap, URIs
- zero dependencies
- tiny
- written in TypeScript

This library extends the global `console` object with a new method:

```typescript
console.img(
  imgSource:
    | string
    | ImageBitmap
    | HTMLImageElement
    | OffscreenCanvas
    | HTMLCanvasElement
    | CanvasRenderingContext2D,
  scale = 1
)
```

# Use Cases

- Simplify debugging & development of canvas-based apps and algorithms

### Features

- zero dependencies
- it's tiny!
- written in TypeScript
- supports a variety of image sources: image URIs, Canvas, Canvas2DRenderingContext, ImageBitmap

# Install

```
npm i --save console-log-img
```

Or with Yarn:

```
yarn add console-log-img
```

# Usage

```typescript
import { initConsoleLogImg } from 'console-log-img';

// Run this once to initialize the library
initConsoleLogImg();

// ... later in the code ...

// Use with image URI, original size
console.img('https://openclipart.org/image/800px/5661');

// Use with a Canvas, 30% zoom
const canvas = document.getElementById('my-canvas');
console.img(canvas, 0.3);

// Use with CanvasRenderingContext2D
const ctx = canvas.getContext('2d');
console.img(ctx, 0.5);

// Use with an ImageBitmap
const bitmap = await createImageBitmap(canvas);
console.img(bitmap);

// Use with an Image DOM element
const imgEl = document.getElementById('my-img');
console.img(imgEl);
```

# Acknowledges & thanks

- Source code was adapted from dunxrion/console.image
- Original created by Adrian Cooney

# Users

- [Inkarnate](https://inkarnate.com)
- [WordCloudy](https://wordcloudy.com)
