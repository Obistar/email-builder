import { ImageManager } from 'easy-email-core';

const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#f0f0f0"/><text x="300" y="200" text-anchor="middle" dominant-baseline="central" fill="#999" font-family="sans-serif" font-size="18">Placeholder</text></svg>'
)}`;

const defaultImagesMap = {
  IMAGE_59: PLACEHOLDER,
};

ImageManager.add(defaultImagesMap);

export function getImg(name: keyof typeof defaultImagesMap) {
  return ImageManager.get(name);
}
