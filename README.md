<h1 align="center">Print Images to Browser Console from Any Source ⚡️</h1>

<br>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/dmitru/console-log-img"/>
</p>
<br />

# What is it

**Tiny library to print images to browser console.**
**Think `console.log` but for images!**

It makes debugging & development of canvas or image-based apps and algorithms simplers.

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
  scale = 1
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
