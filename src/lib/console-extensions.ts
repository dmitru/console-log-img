/**
 * Adapted from dunxrion/console.image
 * Original created by Adrian Cooney
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Console {
    img: (
      source: string | ImageBitmap | OffscreenCanvas | HTMLCanvasElement,
      scale?: number,
      printDimensions?: boolean
    ) => void
  }
}

type Dimensions = { readonly w: number; readonly h: number }

type Opts = {
  printDimension?: boolean
}

const defaultOpts: Opts = {
  printDimension: true,
}

/** Extends global console object with a new console.img method */
export const initConsoleLogImg = (opts = defaultOpts) => {
  /**
   * Display an image in the console.
   * @param  {any} source Source of the image: URI, Canvas, ImageBitmap, etc
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  console.img = (
    /** Image to print */
    source:
      | string
      | ImageBitmap
      | HTMLImageElement
      | OffscreenCanvas
      | HTMLCanvasElement
      | CanvasRenderingContext2D,
    /** Scale factor */
    scale = 1,
    /** When true, prints image dimensions before the image */
    printDimensions = opts.printDimension
  ) => {
    if (typeof source === 'string') {
      printFromImageUri(source, scale, printDimensions)
    } else if (source instanceof HTMLImageElement) {
      printFromImageElement(source, scale, printDimensions)
    } else if (
      source instanceof HTMLCanvasElement ||
      source instanceof OffscreenCanvas ||
      source instanceof CanvasRenderingContext2D
    ) {
      printFromCanvas(source, scale, printDimensions)
    } else if (source instanceof ImageBitmap) {
      printFromImageBitmap(source, scale, printDimensions)
    } else {
      throw new Error(
        'unsupported source type, valid types are: string, Canvas or ImageBitmap'
      )
    }
  }

  const printFromImageUri = (
    url: string,
    scale = 1,
    printDimensions = opts.printDimension
  ) => {
    const img = new Image()

    img.onload = () => {
      const imgStyle = getImgStyle(img.width, img.height, scale)
      if (printDimensions) {
        printImageDimensions(imgStyle)
      }
      printFromImgStyle(url, imgStyle)
    }

    img.src = url
    img.style.background = 'url(' + url + ')' //Preload it again..
  }

  /**
   * Snapshot a canvas context and output it to the console.
   */
  const printFromCanvas = (
    source: OffscreenCanvas | HTMLCanvasElement | CanvasRenderingContext2D,
    scale = 1,
    printDimensions = opts.printDimension
  ) => {
    const canvas =
      source instanceof CanvasRenderingContext2D ? source.canvas : source

    let c: HTMLCanvasElement | undefined
    if ((canvas as HTMLCanvasElement).toDataURL) {
      // It's not an OffscreenCanvas
      c = canvas as HTMLCanvasElement
    } else {
      const c2 = createCanvas({ w: canvas.width, h: canvas.height })
      const c2Ctx = c2.getContext('2d')
      c2Ctx.drawImage(canvas, 0, 0)
      c = c2
    }
    const imageUrl = c.toDataURL()
    const width = canvas.width
    const height = canvas.height
    const imgStyle = getImgStyle(width, height, scale)

    if (printDimensions) {
      printImageDimensions(imgStyle)
    }

    printFromImgStyle(imageUrl, imgStyle)
  }

  /**
   * Display an image in the console.
   * @param  {string} url The url of the image.
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  const printFromImageBitmap = async (
    bitmap: ImageBitmap,
    scale = 1,
    printDimensions = opts.printDimension
  ) => {
    const canvas = createCanvas({ w: bitmap.width, h: bitmap.height })
    const ctx = canvas.getContext(
      'bitmaprenderer'
    ) as ImageBitmapRenderingContext
    const bitmap2 = await createImageBitmap(bitmap)
    ctx.transferFromImageBitmap(bitmap2)
    printFromCanvas(ctx.canvas, scale, printDimensions)
  }

  const printFromImageElement = async (
    imgEl: HTMLImageElement,
    scale = 1,
    printDimensions = opts.printDimension
  ) => {
    const bitmap = await createImageBitmap(imgEl)
    printFromImageBitmap(bitmap, scale, printDimensions)
  }
}

// Utils

/** Prints original image dimensions to the console */
const printImageDimensions = (style: ImgStyle) => {
  console.log(
    `Width = ${style.originalWidth}px, Height = ${style.originalHeight}px`
  )
}

type ImgStyle = ReturnType<typeof getImgStyle>

/**
 * Since the console.log doesn't respond to the `display` style,
 * setting a width and height has no effect. In fact, the only styles
 * I've found it responds to is font-size, background-image and color.
 * To combat the image repeating, we have to get a create a font bounding
 * box so to speak with the unicode box characters.
 */

const getImgStyle = (width: number, height: number, scale = 1) => {
  return {
    originalWidth: width,
    originalHeight: height,
    width: width * scale,
    height: height * scale,
    scale,
    string: '+',
    style:
      'font-size: 1px; padding: ' +
      Math.floor((height * scale) / 2) +
      'px ' +
      Math.floor((width * scale) / 2) +
      'px; line-height: ' +
      height * scale +
      'px;',
  }
}

const printFromImgStyle = (imgUrl: string, style: ImgStyle) => {
  console.log(
    '%c' + style.string,
    style.style +
      'background-image: url(' +
      imgUrl +
      '); background-size: ' +
      style.width +
      'px ' +
      style.height +
      'px; background-size: 100% 100%; background-repeat: norepeat; color: transparent;'
  )
}

const createCanvas = (size: Dimensions, elemId?: string): HTMLCanvasElement => {
  const canvas = document.createElement('canvas') as HTMLCanvasElement

  if (elemId != null) {
    canvas.setAttribute('id', `${elemId}`)
  }
  canvas.width = size.w
  canvas.height = size.h

  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = `${size.w}px`
  canvas.style.height = `${size.h}px`

  return canvas
}
