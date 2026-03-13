import { ImageManager } from 'easy-email-core';

const defaultImagesMap = {
  IMAGE_59:
    'about:blank',
  AttributePanel_01:
    'about:blank',
  AttributePanel_02:
    'about:blank',
  AttributePanel_03:
    'about:blank',
};

ImageManager.add(defaultImagesMap);

export function getImg(name: keyof typeof defaultImagesMap) {
  return ImageManager.get(name);
}
