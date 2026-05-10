/**
 * 每条一页：编辑文案与 variant / rotate；照片路径见 memoryItems.json。
 * 图片必须是 `public/motherday2026/` 下的真实文件名（大小写与磁盘一致），例如 `/motherday2026/IMG_0009.jpg`。
 * 当前共 28 条（24 张照片 + 4 张便签）；便签不会打开灯箱。
 * 若仓库里少于 24 张独立照片，JSON 里靠后的条目可以指向已有文件（路径重复），补齐后再改成新文件名即可。
 */

import rawMemoryItems from './memoryItems.json';

export type PhotoVariant = 'hero' | 'wide' | 'polaroid' | 'small' | 'tall';

export type MemoryPhotoItem = {
  id: number;
  type: 'photo';
  image: string;
  title: string;
  date: string;
  description: string;
  variant: PhotoVariant;
  rotate: number;
};

export type MemoryNoteItem = {
  id: string;
  type: 'note';
  text: string;
  rotate: number;
};

/** Discriminated union used by the gallery (narrowing on `type`). */
export type MemoryItem = MemoryPhotoItem | MemoryNoteItem;

/**
 * Flat row shape for JSON editing; photo rows use numeric `id`, notes use string ids.
 */
export type MemoryItemJsonRow = {
  id: string | number;
  type: 'photo' | 'note';
  image?: string;
  title?: string;
  date?: string;
  description?: string;
  variant?: PhotoVariant;
  rotate?: number;
  text?: string;
};

export const memoryItems = rawMemoryItems as MemoryItem[];

export type PhotoModalPayload = {
  id: string | number;
  image: string;
  title: string;
  date: string;
  description: string;
};
