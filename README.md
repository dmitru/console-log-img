<h1 align="center">Print Images and Canvases to Browser Console ⚡️</h1>

<br>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/dmitru/console-log-img"/>
</p>
<br />

# What is it

**A tiny library to print images to browser console.** 

**Think `console.log` for images!**


The library extends the global `console` object with a new method:
```typescript
console.img(imageSource: string | ImageBitmap | Canvas | OffscreenCanvas | CanvasRenderingContext2D, scale?: number)
```


### Use Cases
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
import { initConsoleLogImg } from 'console-log-img'

// Run this once to initialize the library
initConsoleLogImg()

// ... later in the code ...

// Use with image URI:
const imageUri = 'https://openclipart.org/image/800px/5661'
console.img(imageUri)

// Use with a Canvas at 30% zoom
const canvas = document.getElementById('#my-canvas')
console.img(canvas, 0.3)
```
