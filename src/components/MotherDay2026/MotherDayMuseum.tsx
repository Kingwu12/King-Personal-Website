import classNames from 'classnames';
import Image from 'next/image';
import {
  type CSSProperties,
  memo,
  type ReactElement,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react';

import {
  memoryItems,
  type MemoryNoteItem,
  type MemoryPhotoItem,
  type PhotoModalPayload,
  type PhotoVariant,
} from './memoryItems';
import styles from './motherday2026.module.css';

const variantClass: Record<PhotoVariant, string> = {
  hero: styles.mumVariantHero,
  wide: styles.mumVariantWide,
  polaroid: styles.mumVariantPolaroid,
  small: styles.mumVariantSmall,
  tall: styles.mumVariantTall,
};

const ScrapbookPhotoButton = memo(function ScrapbookPhotoButton({
  item,
  onOpen,
}: {
  item: MemoryPhotoItem;
  onOpen: (p: PhotoModalPayload) => void;
}): ReactElement {
  const variant: PhotoVariant = item.variant ?? 'polaroid';
  const pin = typeof item.id === 'number' && item.id % 3 === 0;

  const imageSrc = item.image ?? '';
  const title = item.title ?? '';
  const date = item.date ?? '';

  const img = (
    <Image
      alt={`${title} 的照片`}
      className={styles.mumPhotoCover}
      fill
      sizes="(max-width: 767px) 45vw, 240px"
      src={imageSrc}
    />
  );

  const caption = (
    <div className={styles.mumCardCaption}>
      <span className={styles.mumCardTitle}>{title}</span>
      <span className={styles.mumCardDate}>{date}</span>
    </div>
  );

  let inner: ReactElement;

  switch (variant) {
    case 'hero':
      inner = (
        <>
          <div className={styles.mumAspectHero}>{img}</div>
          {caption}
        </>
      );
      break;
    case 'wide':
      inner = (
        <>
          <div className={styles.mumAspectWide}>{img}</div>
          {caption}
        </>
      );
      break;
    case 'tall':
      inner = (
        <>
          <div className={styles.mumAspectTall}>{img}</div>
          {caption}
        </>
      );
      break;
    case 'small':
      inner = (
        <>
          <div className={styles.mumAspectSmall}>{img}</div>
          {caption}
        </>
      );
      break;
    case 'polaroid':
      inner = (
        <div className={styles.mumPolaroidCard}>
          <div className={styles.mumAspectPolaroidImg}>{img}</div>
          <div className={styles.mumPolaroidCaptionBand}>{caption}</div>
        </div>
      );
      break;
  }

  return (
    <button
      className={classNames(
        styles.mumMemoryCard,
        variant !== 'polaroid' && styles.mumPhotoCardShell,
        variantClass[variant],
        pin && styles.mumMemoryCardPin,
      )}
      onClick={() =>
        onOpen({
          id: item.id,
          image: imageSrc,
          title,
          date,
          description: item.description ?? '',
        })
      }
      type="button">
      {inner}
    </button>
  );
});

ScrapbookPhotoButton.displayName = 'ScrapbookPhotoButton';

const ScrapbookNote = memo(function ScrapbookNote({item}: {item: MemoryNoteItem}): ReactElement {
  return (
    <div className={styles.mumNoteCard}>
      <p className={styles.mumNoteText}>{item.text ?? ''}</p>
    </div>
  );
});

ScrapbookNote.displayName = 'ScrapbookNote';

const MotherDayMuseum = memo(() => {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<PhotoModalPayload | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const open = useCallback((memory: PhotoModalPayload) => {
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
            <div className={styles.mumMuseumMasonry}>
              {memoryItems.map(item => (
                <div
                  className={styles.mumScrapbookItem}
                  key={`${item.type}-${item.id}`}
                  style={
                    {'--rotate': `${item.rotate ?? 0}deg`} as CSSProperties
                  }>
                  {item.type === 'photo' ? (
                    <ScrapbookPhotoButton item={item} onOpen={open} />
                  ) : (
                    <ScrapbookNote item={item} />
                  )}
                </div>
              ))}
            </div>
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
              <p className={styles.mumLetterSignoff}>爱你的儿子</p>
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
