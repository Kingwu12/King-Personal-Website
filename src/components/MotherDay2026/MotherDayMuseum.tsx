import classNames from "classnames";
import Image from "next/image";
import {
  type CSSProperties,
  memo,
  type ReactElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  type MemoryDividerItem,
  memoryItems,
  type MemoryNoteItem,
  type MemoryPhotoItem,
  type PhotoModalPayload,
  type PhotoVariant,
} from "./memoryItems";
import styles from "./motherday2026.module.css";

const variantClass: Record<PhotoVariant, string> = {
  hero: styles.mumVariantHero,
  wide: styles.mumVariantWide,
  polaroid: styles.mumVariantPolaroid,
  small: styles.mumVariantSmall,
  tall: styles.mumVariantTall,
};

const tapePositionClass = [
  styles.mumTapeCenter,
  styles.mumTapeLeft,
  styles.mumTapeDiagonal,
] as const;

/** Occasional tiny handwritten labels on cards — not every slot. */
const getScrapLabelForPhotoId = (id: number): string | undefined =>
  ["", "留下", "", "记得", "", "家", ""][id % 7] || undefined;

const ScrapbookPhotoButton = memo(function ScrapbookPhotoButton({
  item,
  onOpen,
}: {
  item: MemoryPhotoItem;
  onOpen: (p: PhotoModalPayload) => void;
}): ReactElement {
  const variant: PhotoVariant = item.variant ?? "polaroid";
  const pin = typeof item.id === "number" && item.id % 3 === 0;
  const tapeClass = tapePositionClass[item.id % tapePositionClass.length];
  const scrap = getScrapLabelForPhotoId(item.id);

  const imageSrc = item.image ?? "";
  const title = item.title ?? "";
  const date = item.date ?? "";

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
    case "hero":
      inner = (
        <>
          <div className={styles.mumAspectHero}>{img}</div>
          {caption}
        </>
      );
      break;
    case "wide":
      inner = (
        <>
          <div className={styles.mumAspectWide}>{img}</div>
          {caption}
        </>
      );
      break;
    case "tall":
      inner = (
        <>
          <div className={styles.mumAspectTall}>{img}</div>
          {caption}
        </>
      );
      break;
    case "small":
      inner = (
        <>
          <div className={styles.mumAspectSmall}>{img}</div>
          {caption}
        </>
      );
      break;
    case "polaroid":
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
        variant !== "polaroid" && styles.mumPhotoCardShell,
        variantClass[variant],
        tapeClass,
        pin && styles.mumMemoryCardPin,
      )}
      onClick={() =>
        onOpen({
          id: item.id,
          image: imageSrc,
          title,
          date,
          description: item.description ?? "",
        })
      }
      type="button"
    >
      {inner}
      {scrap ? (
        <span
          className={classNames(
            styles.mumScrapLabel,
            variant === "polaroid" && styles.mumScrapLabelPolaroid,
          )}
        >
          {scrap}
        </span>
      ) : null}
    </button>
  );
});

ScrapbookPhotoButton.displayName = "ScrapbookPhotoButton";

const ScrapbookNote = memo(function ScrapbookNote({
  item,
}: {
  item: MemoryNoteItem;
}): ReactElement {
  return (
    <div className={styles.mumNoteCard}>
      <span aria-hidden className={styles.mumNoteHeart}>
        ♡
      </span>
      <p className={styles.mumNoteText}>{item.text ?? ""}</p>
    </div>
  );
});

ScrapbookNote.displayName = "ScrapbookNote";

const ScrapbookDivider = memo(function ScrapbookDivider({
  item,
}: {
  item: MemoryDividerItem;
}): ReactElement {
  return (
    <div className={styles.mumChapterStrip}>
      <span className={styles.mumChapterStripInner}>{item.text}</span>
    </div>
  );
});

ScrapbookDivider.displayName = "ScrapbookDivider";

const FloatingMemoryParticles = memo(
  function FloatingMemoryParticles(): ReactElement {
    const glyphs = [
      "♡",
      "✦",
      "·",
      "心",
      "♡",
      "✦",
      "·",
      "♡",
      "✦",
      "心",
      "·",
      "♡",
    ] as const;
    return (
      <div
        aria-hidden
        className={classNames(
          styles.floatingMemoryParticles,
          "floating-memory-particles",
        )}
      >
        {glyphs.map((g, i) => (
          <span
            className={styles.floatingMemoryParticle}
            key={`fp-${i}`}
            style={{"--fp-i": i} as CSSProperties}
          >
            {g}
          </span>
        ))}
      </div>
    );
  },
);

FloatingMemoryParticles.displayName = "FloatingMemoryParticles";

type TransitionStage = "idle" | "opening" | "done";

const MEMORY_HEART_PATH =
  "M250 410 C120 310 45 230 70 135 C88 65 170 45 250 130 C330 45 412 65 430 135 C455 230 380 310 250 410 Z";

const OPENING_DURATION_MS = 3200;

/** Very faint hearts only on the intro screen */
const INTRO_AMBIENT_HEARTS = [
  {g: "♡", top: "16%", left: "11%", delay: "0s", dur: "24s"},
  {g: "♥", top: "22%", left: "79%", delay: "-4s", dur: "26s"},
  {g: "心", top: "44%", left: "8%", delay: "-8s", dur: "22s"},
  {g: "♡", top: "58%", left: "82%", delay: "-2s", dur: "28s"},
  {g: "♡", top: "72%", left: "18%", delay: "-12s", dur: "25s"},
  {g: "♥", top: "34%", left: "44%", delay: "-6s", dur: "30s"},
  {g: "♡", top: "12%", left: "62%", delay: "-10s", dur: "23s"},
] as const;

const staggerClass = [
  styles.mumScrapStagger0,
  styles.mumScrapStagger1,
  styles.mumScrapStagger2,
  styles.mumScrapStagger3,
  styles.mumScrapStagger4,
] as const;

const BG_MUSIC_SRC = "/motherday2026/background-music.mp3";
const BG_MUSIC_VOLUME = 0.28;

const MotherDayMuseum = memo(() => {
  const [hasEntered, setHasEntered] = useState(false);
  const [transitionStage, setTransitionStage] =
    useState<TransitionStage>("idle");
  const [musicMuted, setMusicMuted] = useState(false);
  const [active, setActive] = useState<PhotoModalPayload | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const introEnterLockRef = useRef(false);
  const openingTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const revealComplete = transitionStage === "done";

  const open = useCallback((memory: PhotoModalPayload) => {
    setActive(memory);
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  const handleIntroEnter = useCallback(() => {
    if (transitionStage !== "idle" || introEnterLockRef.current) {
      return;
    }
    introEnterLockRef.current = true;
    const audio = audioRef.current;
    if (audio) {
      audio.volume = BG_MUSIC_VOLUME;
      void audio.play().catch(() => {});
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setHasEntered(true);

    if (reduceMotion) {
      setTransitionStage("done");
      return;
    }

    setTransitionStage("opening");
    const timerId = window.setTimeout(() => {
      setTransitionStage("done");
      openingTimerRef.current = null;
    }, OPENING_DURATION_MS);
    openingTimerRef.current = timerId as number;
  }, [transitionStage]);

  useEffect(
    () => () => {
      if (openingTimerRef.current !== null) {
        window.clearTimeout(openingTimerRef.current);
      }
    },
    [],
  );

  const toggleBackgroundMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.volume = BG_MUSIC_VOLUME;
    if (musicMuted) {
      void audio.play().catch(() => {});
      setMusicMuted(false);
    } else {
      audio.pause();
      setMusicMuted(true);
    }
  }, [musicMuted]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close]);

  return (
    <div className={classNames(styles.mumRoot, styles.mumSans)} lang="zh-Hans">
      <audio loop preload="auto" ref={audioRef} src={BG_MUSIC_SRC} />

      <FloatingMemoryParticles />

      {transitionStage === "opening" ? (
        <div aria-hidden className={styles.memoryOpeningTransition}>
          <div className={styles.memoryWarmGlow} />

          <svg className={styles.memoryHeartSvg} viewBox="0 0 500 460">
            <path
              className={styles.memoryHeartPath}
              d={MEMORY_HEART_PATH}
              pathLength={1600}
            />
          </svg>

          <div className={styles.memoryHeartFill} />

          <div className={styles.memoryPhotoBurst}>
            <span
              className={classNames(
                styles.memoryMiniPhoto,
                styles.memoryMiniPhotoA,
              )}
            />
            <span
              className={classNames(
                styles.memoryMiniPhoto,
                styles.memoryMiniPhotoB,
              )}
            />
            <span
              className={classNames(
                styles.memoryMiniPhoto,
                styles.memoryMiniPhotoC,
              )}
            />
            <span
              className={classNames(
                styles.memoryMiniPhoto,
                styles.memoryMiniPhotoD,
              )}
            />
            <span
              className={classNames(
                styles.memoryMiniPhoto,
                styles.memoryMiniPhotoE,
              )}
            />
            <span
              className={classNames(
                styles.memoryMiniPhoto,
                styles.memoryMiniPhotoF,
              )}
            />
          </div>

          <div className={styles.memoryOpeningCopy}>
            <p>打开回忆</p>
            <small>慢慢看</small>
          </div>
        </div>
      ) : null}

      <section
        aria-hidden={entered}
        className={classNames(
          styles.mumIntro,
          entered && styles.mumIntroHidden,
        )}
      >
        <div aria-hidden className={styles.mumIntroAmbientHearts}>
          {INTRO_AMBIENT_HEARTS.map((h, i) => (
            <span
              className={styles.mumIntroAmbientHeart}
              key={`intro-ambient-${i}`}
              style={
                {
                  "--iah-delay": h.delay,
                  "--iah-dur": h.dur,
                  left: h.left,
                  top: h.top,
                } as CSSProperties
              }
            >
              {h.g}
            </span>
          ))}
        </div>
        <h1 className={styles.mumIntroTitle}>给妈妈</h1>
        <p className={styles.mumIntroSubtitle}>
          一些照片，一些回忆，还有一些平时没怎么说出口的话。
        </p>
        <button
          className={styles.mumIntroBtn}
          disabled={transitionStage !== "idle"}
          onClick={handleIntroEnter}
          type="button"
        >
          打开看看
        </button>
      </section>

      <main
        className={classNames(
          styles.mumMuseum,
          entered && styles.mumMuseumVisible,
        )}
        hidden={!entered}
      >
        <div className={styles.mumMuseumInner}>
          <header className={styles.mumMuseumHeader}>
            <h2 className={styles.mumMuseumHeading}>回忆</h2>
            <p className={styles.mumMuseumHandLine}>
              一些没有认真整理过，但舍不得删掉的照片。
            </p>
            <p className={styles.mumMuseumLede}>点一下照片，可以放大看。</p>
            <span aria-hidden className={styles.mumMuseumHeart}>
              <span className={styles.mumMuseumHeartPulse}>♡</span>
            </span>
          </header>

          <div aria-hidden className={styles.mumPaperDivider} />

          <div className={styles.mumCollageWall}>
            <div className={styles.mumMuseumMasonry}>
              {memoryItems.map((item, index) => (
                <div
                  className={classNames(
                    styles.mumScrapbookItem,
                    staggerClass[index % staggerClass.length],
                  )}
                  key={`${item.type}-${item.id}`}
                  style={
                    {
                      "--rotate": `${item.rotate ?? 0}deg`,
                      "--fade-delay": `${Math.min(index, 24) * 0.045}s`,
                    } as CSSProperties
                  }
                >
                  {item.type === "photo" ? (
                    <ScrapbookPhotoButton item={item} onOpen={open} />
                  ) : item.type === "note" ? (
                    <ScrapbookNote item={item} />
                  ) : (
                    <ScrapbookDivider item={item} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div aria-hidden className={styles.mumPaperDividerSoft} />

          <section className={styles.mumLetter} id="letter">
            <h2 className={styles.mumLetterTitle}>在你关掉之前</h2>
            <div className={styles.mumLetterBody}>
              <p>妈妈：</p>
              <p>母亲节快乐。</p>
              <p>今年没有买什么很贵的礼物，所以做了这个小网站给你。</p>
              <p>
                里面放了一些以前的照片。很多照片其实都很普通，但是翻出来的时候，还是会想起很多以前的事情。
              </p>
              <p>
                我平时不太会说这些话，但我知道你一直很辛苦，也一直很照顾我们。
              </p>
              <p>谢谢你这么多年一直支持我、包容我，也谢谢你一直在我身边。</p>
              <p>我现在还有很多地方要做好，也希望以后能让你少操心一点。</p>
              <p>这个网站我以后会继续慢慢加照片，就当成一个小相册。</p>
              <p>母亲节快乐。</p>
              <p className={styles.mumLetterSignoff}>我爱你。</p>
              <p className={styles.mumLetterSignoff}>你的儿子</p>
            </div>
          </section>
        </div>
      </main>

      {active ? (
        <div
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          aria-modal
          className={styles.mumLightbox}
          role="dialog"
        >
          <button
            aria-label="关掉"
            className={styles.mumLightboxScrim}
            onClick={close}
            type="button"
          />
          <div className={styles.mumLightboxGlow} />
          <div className={styles.mumLightboxLayer}>
            <div className={styles.mumLightboxTop}>
              <button
                className={styles.mumLightboxClose}
                onClick={close}
                type="button"
              >
                关掉
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
                <span aria-hidden className={styles.mumLightboxTitleHeart}>
                  ♡
                </span>
                {active.title}
              </h2>
              <p className={styles.mumLightboxCaptionText} id={descriptionId}>
                {active.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {entered ? (
        <button
          aria-label={musicMuted ? "开启背景音乐" : "关闭背景音乐"}
          className={styles.mumMusicToggle}
          onClick={toggleBackgroundMusic}
          type="button"
        >
          {musicMuted ? "音乐开" : "音乐关"}
        </button>
      ) : null}
    </div>
  );
});

MotherDayMuseum.displayName = "MotherDayMuseum";

export default MotherDayMuseum;
