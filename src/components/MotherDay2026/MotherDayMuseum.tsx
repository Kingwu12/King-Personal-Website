import classNames from 'classnames';
import Image from 'next/image';
import {type CSSProperties,memo, useCallback, useEffect, useId, useState} from 'react';

import styles from './motherday2026.module.css';

export type MemoryVariant = 'polaroid' | 'wide' | 'small' | 'note';
export type MemoryAlign = 'left' | 'right' | 'center';

/** 编辑回忆：更换 `public/motherday2026/` 下的图片路径，并调整文案与 variant / rotate / align。 */
export type MotherDayMemory = {
  id: number;
  image: string;
  title: string;
  date: string;
  description: string;
  variant: MemoryVariant;
  rotate: number;
  align: MemoryAlign;
};

const variantClass: Record<MemoryVariant, string> = {
  polaroid: styles.mumVariantPolaroid,
  wide: styles.mumVariantWide,
  small: styles.mumVariantSmall,
  note: styles.mumVariantNote,
};

const alignClass: Record<MemoryAlign, string> = {
  left: styles.mumCollageAlignLeft,
  right: styles.mumCollageAlignRight,
  center: styles.mumCollageAlignCenter,
};

/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  回忆数据：改图片路径、文案，以及 variant / rotate / align 控制版式与旋转 ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */
const memories: MotherDayMemory[] = [
  {
    id: 1,
    image: '/motherday2026/photo1.jpg',
    title: '小时候',
    date: '很久以前',
    description: '小时候很多事情我都不懂，只知道你一直在我身边。现在回头看，才发现那时候你做了很多。',
    variant: 'polaroid',
    rotate: -3,
    align: 'left',
  },
  {
    id: 2,
    image: '/motherday2026/photo2.jpg',
    title: '家',
    date: '一直',
    description: '很多时候家就是很普通的日子，吃饭、聊天、被你提醒这个那个。但这些东西其实一直都很重要。',
    variant: 'wide',
    rotate: 2,
    align: 'right',
  },
  {
    id: 3,
    image: '/motherday2026/photo3.jpg',
    title: '长大以后',
    date: '后来',
    description: '长大以后才慢慢明白，当妈妈其实不容易。以前觉得很多事情理所当然，现在知道不是。',
    variant: 'small',
    rotate: -1,
    align: 'center',
  },
  {
    id: 4,
    image: '/motherday2026/photo4.jpg',
    title: '一些小事',
    date: '平时',
    description: '有些事可能你自己都不记得了，但我会记得。比如做饭、接送、提醒我、担心我，还有很多很小的事。',
    variant: 'polaroid',
    rotate: 3,
    align: 'right',
  },
  {
    id: 5,
    image: '/motherday2026/photo5.jpg',
    title: '像你的地方',
    date: '现在',
    description: '我有时候也会发现自己有些地方挺像你的，比如认真、固执、操心，还有不太会直接说软话。',
    variant: 'wide',
    rotate: -2,
    align: 'left',
  },
  {
    id: 6,
    image: '/motherday2026/photo6.jpg',
    title: '以后',
    date: '慢慢来',
    description: '我现在还有很多地方没做好，但我会继续努力。希望以后能让你少操点心，也让你更放心一点。',
    variant: 'polaroid',
    rotate: 1,
    align: 'center',
  },
];

const MotherDayMuseum = memo(() => {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<MotherDayMemory | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const open = useCallback((memory: MotherDayMemory) => {
    setActive(memory);
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active, close]);

  return (
    <div className={classNames(styles.mumRoot, styles.mumSans)} lang="zh-Hans">
      <section
        aria-hidden={entered}
        className={classNames(styles.mumIntro, entered && styles.mumIntroHidden)}>
        <h1 className={styles.mumIntroTitle}>给妈妈</h1>
        <p className={styles.mumIntroSubtitle}>一些照片，一些回忆，还有一些平时没怎么说出口的话。</p>
        <button className={styles.mumIntroBtn} onClick={() => setEntered(true)} type="button">
          进去看看
        </button>
      </section>

      <main
        className={classNames(styles.mumMuseum, entered && styles.mumMuseumVisible)}
        hidden={!entered}>
        <div className={styles.mumMuseumInner}>
          <header className={styles.mumMuseumHeader}>
            <h2 className={styles.mumMuseumHeading}>回忆</h2>
            <p className={styles.mumMuseumLede}>点一下照片，可以放大看。</p>
          </header>

          <div aria-hidden className={styles.mumPaperDivider} />

          <div className={styles.mumCollageWall}>
            {memories.map(memory => (
              <div
                className={classNames(styles.mumCollageItem, alignClass[memory.align])}
                key={memory.id}
                style={
                  {
                    '--memory-rotate': `${memory.rotate}deg`,
                    zIndex: memory.id,
                  } as CSSProperties
                }>
                <button
                  className={classNames(
                    styles.mumMemoryCard,
                    variantClass[memory.variant],
                    memory.id % 2 === 0 && styles.mumMemoryCardPin,
                  )}
                  onClick={() => open(memory)}
                  type="button">
                  {memory.variant === 'polaroid' || memory.variant === 'note' ? (
                    <span className={styles.mumPolaroidShell}>
                      <span className={styles.mumPolaroidPhoto}>
                        <Image
                          alt={`${memory.title} 的照片`}
                          className={styles.mumPolaroidImg}
                          fill
                          sizes="(max-width: 767px) 78vw, 380px"
                          src={memory.image}
                        />
                      </span>
                      <span className={styles.mumPolaroidCaption}>
                        <span className={styles.mumPolaroidTitle}>{memory.title}</span>
                        <span className={styles.mumPolaroidDate}>{memory.date}</span>
                      </span>
                    </span>
                  ) : null}

                  {memory.variant === 'wide' ? (
                    <span className={styles.mumWideShell}>
                      <span className={styles.mumWidePhoto}>
                        <Image
                          alt={`${memory.title} 的照片`}
                          className={styles.mumWideImg}
                          fill
                          sizes="(max-width: 767px) 88vw, 640px"
                          src={memory.image}
                        />
                      </span>
                      <span className={styles.mumWideNote}>
                        <span className={styles.mumWideNoteTitle}>{memory.title}</span>
                        <span className={styles.mumWideNoteDate}>{memory.date}</span>
                      </span>
                    </span>
                  ) : null}

                  {memory.variant === 'small' ? (
                    <span className={styles.mumSmallShell}>
                      <span className={styles.mumSmallPhoto}>
                        <Image
                          alt={`${memory.title} 的照片`}
                          className={styles.mumSmallImg}
                          fill
                          sizes="(max-width: 767px) 68vw, 280px"
                          src={memory.image}
                        />
                      </span>
                      <span className={styles.mumSmallCaption}>
                        <span className={styles.mumSmallTitle}>{memory.title}</span>
                        <span className={styles.mumSmallDate}>{memory.date}</span>
                      </span>
                    </span>
                  ) : null}
                </button>
              </div>
            ))}
          </div>

          <div aria-hidden className={styles.mumPaperDividerSoft} />

          <section className={styles.mumLetter} id="letter">
            <h2 className={styles.mumLetterTitle}>在你关掉之前</h2>
            <div className={styles.mumLetterBody}>
              <p>亲爱的妈妈：</p>
              <p>母亲节快乐。</p>
              <p>
                我平时可能不太会好好说这些话，也经常忙自己的事情，学习、工作、想未来，脑子里总有很多乱七八糟的东西。
              </p>
              <p>但我想让你知道，你为我做的很多事，我其实都记得。</p>
              <p>
                小时候很多事情我不懂，觉得吃饭、接送、提醒、担心、照顾，好像都是很自然的事。现在长大了，才慢慢明白，这些都不是理所当然的。
              </p>
              <p>很多时候，你的爱不是说出来的，而是每天一点一点做出来的。</p>
              <p>
                谢谢你一直支持我、包容我、照顾我，也谢谢你在我还没那么成熟的时候，一直没有放弃我。
              </p>
              <p>
                我现在还有很多地方做得不够好，但我会继续努力。希望以后能让你少操一点心，也让你越来越放心。
              </p>
              <p>
                这个小网站，是我今年给你的母亲节礼物。它现在还只是第一版，以后我会继续往里面加新的照片和回忆。
              </p>
              <p className={styles.mumLetterSignoff}>我爱你。</p>
              <p className={styles.mumLetterSignoff}>King</p>
            </div>
            <p className={styles.mumLetterFootnote}>以后我会继续往这里加新的照片和回忆。</p>
          </section>
        </div>
      </main>

      {active ? (
        <div
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          aria-modal
          className={styles.mumLightbox}
          role="dialog">
          <button
            aria-label="关闭"
            className={styles.mumLightboxScrim}
            onClick={close}
            type="button"
          />
          <div className={styles.mumLightboxLayer}>
            <div className={styles.mumLightboxTop}>
              <button className={styles.mumLightboxClose} onClick={close} type="button">
                关闭
              </button>
              <p className={styles.mumLightboxDate}>{active.date}</p>
            </div>
            <div className={styles.mumLightboxStage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`${active.title} 的照片`}
                className={styles.mumLightboxImg}
                decoding="async"
                src={active.image}
              />
            </div>
            <div className={styles.mumLightboxCaption}>
              <h2 className={styles.mumLightboxCaptionTitle} id={titleId}>
                {active.title}
              </h2>
              <p className={styles.mumLightboxCaptionText} id={descriptionId}>
                {active.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});

MotherDayMuseum.displayName = 'MotherDayMuseum';

export default MotherDayMuseum;
