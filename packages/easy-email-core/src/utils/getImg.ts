import { ImageManager } from './ImageManager';

// Generic placeholder — consumers should override via ImageManager.add()
const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#f0f0f0"/><text x="300" y="200" text-anchor="middle" dominant-baseline="central" fill="#999" font-family="sans-serif" font-size="18">Placeholder</text></svg>'
)}`;

const defaultImagesMap = {
  IMAGE_01: PLACEHOLDER,
  IMAGE_02: PLACEHOLDER,
  IMAGE_03: PLACEHOLDER,
  IMAGE_04: PLACEHOLDER,
  IMAGE_59: PLACEHOLDER,
  IMAGE_09: PLACEHOLDER,
  IMAGE_10: PLACEHOLDER,
  IMAGE_15: PLACEHOLDER,
  IMAGE_16: PLACEHOLDER,
  IMAGE_17: PLACEHOLDER,
  IMAGE_31: PLACEHOLDER,
};

ImageManager.add(defaultImagesMap);
export function getImg(name: keyof typeof defaultImagesMap) {
  return ImageManager.get(name);
}
