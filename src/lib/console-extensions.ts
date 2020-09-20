/**
 * Adapted from dunxrion/console.image
 * Original created by Adrian Cooney
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Console {
    img: (
      source: string | ImageBitmap | OffscreenCanvas | HTMLCanvasElement,
      scale?: number
    ) => void;
  }
}

type Dimensions = { readonly w: number; readonly h: number };

/** Extends global console object with a new console.img method */
export const initConsoleLogImg = () => {
  /**
   * Display an image in the console.
   * @param  {any} source Source of the image: URI, Canvas, ImageBitmap, etc
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  console.img = (
    source:
      | string
      | ImageBitmap
      | HTMLImageElement
      | OffscreenCanvas
      | HTMLCanvasElement
      | CanvasRenderingContext2D,
    scale = 1
  ) => {
    if (typeof source === 'string') {
      printFromImageUri(source, scale);
    } else if (source instanceof HTMLImageElement) {
      printFromImageElement(source, scale);
    } else if (
      source instanceof HTMLCanvasElement ||
      source instanceof OffscreenCanvas ||
      source instanceof CanvasRenderingContext2D
    ) {
      printFromCanvas(source, scale);
    } else if (source instanceof ImageBitmap) {
      printFromImageBitmap(source, scale);
    } else {
      throw new Error(
        'unsupported source type, valid types are: string, Canvas or ImageBitmap'
      );
    }
  };

  const printFromImageUri = (url: string, scale = 1) => {
    const img = new Image();

    img.onload = () => {
      const dim = getImgStyle(img.width * scale, img.height * scale);
      printFromImgStyle(url, dim);
    };

    img.src = url;
    img.style.background = 'url(' + url + ')'; //Preload it again..
  };

  /**
   * Snapshot a canvas context and output it to the console.
   */
  const printFromCanvas = (
    source: OffscreenCanvas | HTMLCanvasElement | CanvasRenderingContext2D,
    scale = 1
  ) => {
    const canvas =
      source instanceof CanvasRenderingContext2D ? source.canvas : source;

    let c: HTMLCanvasElement | undefined;
    if ((canvas as HTMLCanvasElement).toDataURL) {
      // It's not an OffscreenCanvas
      c = canvas as HTMLCanvasElement;
    } else {
      const c2 = createCanvas({ w: canvas.width, h: canvas.height });
      const c2Ctx = c2.getContext('2d');
      c2Ctx.drawImage(canvas, 0, 0);
      c = c2;
    }
    const imageUrl = c.toDataURL();
    const width = canvas.width;
    const height = canvas.height;
    const dim = getImgStyle(width * scale, height * scale);

    printFromImgStyle(imageUrl, dim);
  };

  /**
   * Display an image in the console.
   * @param  {string} url The url of the image.
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  const printFromImageBitmap = async (bitmap: ImageBitmap, scale = 1) => {
    const canvas = createCanvas({ w: bitmap.width, h: bitmap.height });
    const ctx = canvas.getContext(
      'bitmaprenderer'
    ) as ImageBitmapRenderingContext;
    const bitmap2 = await createImageBitmap(bitmap);
    ctx.transferFromImageBitmap(bitmap2);
    console.img(ctx.canvas, scale);
  };

  const printFromImageElement = async (imgEl: HTMLImageElement, scale = 1) => {
    const bitmap = await createImageBitmap(imgEl);
    printFromImageBitmap(bitmap, scale);
  };
};

// Utils

type ImgStyle = ReturnType<typeof getImgStyle>;

/**
 * Since the console.log doesn't respond to the `display` style,
 * setting a width and height has no effect. In fact, the only styles
 * I've found it responds to is font-size, background-image and color.
 * To combat the image repeating, we have to get a create a font bounding
 * box so to speak with the unicode box characters.
 */

const getImgStyle = (width: number, height: number) => {
  return {
    width,
    height,
    string: '+',
    style:
      'font-size: 1px; padding: ' +
      Math.floor(height / 2) +
      'px ' +
      Math.floor(width / 2) +
      'px; line-height: ' +
      height +
      'px;',
  };
};

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
  );
};

const createCanvas = (size: Dimensions, elemId?: string): HTMLCanvasElement => {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;

  if (elemId != null) {
    canvas.setAttribute('id', `${elemId}`);
  }
  canvas.width = size.w;
  canvas.height = size.h;

  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = `${size.w}px`;
  canvas.style.height = `${size.h}px`;

  return canvas;
};
