/**
 * 每条一页：编辑文案与 variant / rotate；照片路径为 `/motherday2026/photo{n}.jpg`。
 * 当前共 28 条（24 张照片 + 4 张便签）；便签不会打开灯箱。
 */

export type PhotoVariant = 'hero' | 'wide' | 'polaroid' | 'small' | 'tall';

/** 用户要求的扁平字段；照片与便签用 discriminated union，便于类型收窄。 */
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

export type MemoryItem = MemoryPhotoItem | MemoryNoteItem;

const R = [-4, 3, -2, 4, -1, 2, -3, 5, -2, 3, -4, 1, -3, 4, -1, 2, -5, 3, -2, 4, -1, 3, -2, 5] as const;

const V: PhotoVariant[] = [
  'hero',
  'wide',
  'polaroid',
  'small',
  'tall',
  'hero',
  'polaroid',
  'wide',
  'small',
  'tall',
  'hero',
  'wide',
  'polaroid',
  'small',
  'tall',
  'hero',
  'wide',
  'polaroid',
  'small',
  'tall',
  'hero',
  'wide',
  'polaroid',
  'small',
];

const titles = [
  '小时候',
  '家门口',
  '放学',
  '背影',
  '晚饭',
  '雨天',
  '唠叨',
  '周末',
  '阳台',
  '厨房',
  '长大',
  '电话',
  '小事',
  '合影',
  '旅行',
  '愿望',
  '下次见',
  '旧时光',
  '叮嘱',
  '灯光',
  '礼物',
  '空白页',
  '以后',
  '谢谢你',
] as const;

const dates = [
  '很久以前',
  '一直',
  '某天',
  '那年',
  '傍晚',
  '有一次',
  '平时',
  '偶尔',
  '午后',
  '夜里',
  '后来',
  '最近',
  '想起',
  '某一天',
  '想去',
  '认真想',
  '下次',
  '翻看',
  '记得',
  '深夜',
  '今年',
  '留给以后',
  '慢慢来',
  '每一天',
] as const;

const descriptions = [
  '小时候很多事情我都不懂，只知道你一直在我身边。',
  '家门口那张垫子，踩上去就很安心。',
  '放学路上最想听到的，是你问我一句累不累。',
  '有时候只记得你的背影，却很清楚那是守护。',
  '一桌家常饭，其实很费心力。',
  '雨天接送不容易，我现在才懂。',
  '以前嫌烦，后来才明白那是担心。',
  '不忙的时候一起待着，就很好。',
  '晒被子、浇花，日子就这样一天天过去。',
  '油烟和香气，其实就是家的味道。',
  '长大以后才慢慢明白，当妈妈不容易。',
  '听到你的声音，就知道你是不是累了。',
  '有些小事你可能忘了，但我还记得。',
  '想把以后的合影也一张张放进这里。',
  '以后想带你去更多地方走走。',
  '希望你少操心一点，多一点自己的时间。',
  '下次见面想多聊一会儿。',
  '翻相册时会突然想起当时的温度。',
  '你说过的那些话，后来我才听懂。',
  '夜里亮着的那盏灯，会让人安心睡觉。',
  '这份礼物很小，但心意是真的。',
  '这一格留给还没拍到的照片。',
  '我会继续努力，让你少操心。',
  '谢谢你一直在。',
] as const;

function buildPhotos(): MemoryPhotoItem[] {
  return Array.from({length: 24}, (_, i) => ({
    id: i + 1,
    type: 'photo' as const,
    image: `/motherday2026/photo${i + 1}.jpg`,
    title: titles[i],
    date: dates[i],
    description: descriptions[i],
    variant: V[i % V.length],
    rotate: R[i % R.length],
  }));
}

/** 24 张照片 + 4 张便签，均布插入 */
export const memoryItems: MemoryItem[] = (() => {
  const photos = buildPhotos();
  const notes: MemoryNoteItem[] = [
    {id: 'note-1', type: 'note', text: '有些话平时没说，但都在这里。', rotate: -2},
    {id: 'note-2', type: 'note', text: '谢谢你一直在。', rotate: 3},
    {id: 'note-3', type: 'note', text: '这些小事，我后来才懂。', rotate: -1},
    {id: 'note-4', type: 'note', text: '以后慢慢补上更多照片。', rotate: 2},
  ];

  const out: MemoryItem[] = [];
  const chunk = 6;
  let pi = 0;
  let ni = 0;
  while (pi < photos.length || ni < notes.length) {
    for (let k = 0; k < chunk && pi < photos.length; k++) {
      out.push(photos[pi]);
      pi++;
    }
    if (ni < notes.length) {
      out.push(notes[ni]);
      ni++;
    }
  }
  return out;
})();

export type PhotoModalPayload = {
  id: string | number;
  image: string;
  title: string;
  date: string;
  description: string;
};
