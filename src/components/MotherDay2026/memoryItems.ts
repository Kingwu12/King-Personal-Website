/**
 * 每条一页：编辑文案与 variant / rotate；照片路径见 memoryItems.json。
 * 图片必须是 `public/motherday2026/` 下的真实文件名（大小写与磁盘一致）。
 * 类型：`photo` | `note` | `divider`（章节小标签）；便签与 divider 不会打开灯箱。
 */

import rawMemoryItems from "./memoryItems.json";

export type PhotoVariant = "hero" | "wide" | "polaroid" | "small" | "tall";

export type MemoryPhotoItem = {
  id: number;
  type: "photo";
  image: string;
  title: string;
  date: string;
  description: string;
  variant: PhotoVariant;
  rotate: number;
};

export type MemoryNoteItem = {
  id: string;
  type: "note";
  text: string;
  rotate: number;
};

/** Tiny chapter label strip in the masonry flow. */
export type MemoryDividerItem = {
  id: string;
  type: "divider";
  text: string;
  rotate: number;
};

/** Discriminated union used by the gallery (narrowing on `type`). */
export type MemoryItem = MemoryPhotoItem | MemoryNoteItem | MemoryDividerItem;

/**
 * Flat row shape for JSON editing; photo rows use numeric `id`, notes use string ids.
 */
export type MemoryItemJsonRow = {
  id: string | number;
  type: "photo" | "note" | "divider";
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
