/**
 * Adapted from dunxrion/console.image
 * Original created by Adrian Cooney
 */
export const initConsoleLogImg = (console: Console) => {
  /**
   * Since the console.log doesn't respond to the `display` style,
   * setting a width and height has no effect. In fact, the only styles
   * I've found it responds to is font-size, background-image and color.
   * To combat the image repeating, we have to get a create a font bounding
   * box so to speak with the unicode box characters.
   */
  function getBox(
    width: number,
    height: number
  ): { readonly string: string; readonly style: string } {
    return {
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
  }

  /**
   * Display an image in the console.
   * @param  {string} url The url of the image.
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  console.image = (url: string, scale = 1) => {
    const img = new Image();

    img.onload = () => {
      const dim = getBox(img.width * scale, img.height * scale);
      console.log(
        '%c' + dim.string,
        dim.style +
          'background-image: url(' +
          url +
          '); background-size: ' +
          img.width * scale +
          'px ' +
          img.height * scale +
          'px; background-size: 100% 100%; background-repeat: norepeat; color: transparent;'
      );
    };

    img.src = url;
    img.style.background = 'url(' + url + ')'; //Preload it again..
  };

  /**
   * Snapshot a canvas context and output it to the console.
   */
  console.screenshot = (
    canvas: OffscreenCanvas | HTMLCanvasElement,
    scale = 1
  ) => {
    let c: HTMLCanvasElement | undefined;
    if ((c as HTMLCanvasElement).toDataURL) {
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
    const dim = getBox(width * scale, height * scale);

    console.log(
      '%c' + dim.string,
      dim.style +
        'background-image: url(' +
        imageUrl +
        '); background-size: ' +
        width * scale +
        'px ' +
        height * scale +
        'px;  background-size: 100% 100%; background-repeat: norepeat; color: transparent;'
    );
  };

  /**
   * Display an image in the console.
   * @param  {string} url The url of the image.
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  console.image = (url: string, scale = 1) => {
    scale = scale || 1;
    const img = new Image();

    img.onload = () => {
      const dim = getBox(img.width * scale, img.height * scale);
      console.log(
        '%c' + dim.string,
        dim.style +
          'background: url(' +
          url +
          '); background-size: ' +
          img.width * scale +
          'px ' +
          img.height * scale +
          'px;  background-size: 100% 100%; background-repeat: norepeat; color: transparent;'
      );
    };

    img.src = url;
  };

  /**
   * Display an image in the console.
   * @param  {string} url The url of the image.
   * @param  {int} scale Scale factor on the image
   * @return {null}
   */
  console.bitmap = async (bitmap: ImageBitmap, scale = 1) => {
    const canvas = createCanvas({ w: bitmap.width, h: bitmap.height });
    const ctx = canvas.getContext(
      'bitmaprenderer'
    ) as ImageBitmapRenderingContext;
    const bitmap2 = await createImageBitmap(bitmap);
    ctx.transferFromImageBitmap(bitmap2);
    console.screenshot(ctx.canvas, scale);
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Console {
    screenshot: (
      canvas: OffscreenCanvas | HTMLCanvasElement,
      scale?: number
    ) => void;
    bitmap: (bitmap: ImageBitmap, scale?: number) => void;
    image: (src: string, scale?: number) => void;
  }
}

type Dimensions = { readonly w: number; readonly h: number };

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
