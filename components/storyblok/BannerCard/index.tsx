'use client';

import { BannerCardStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

const CARD_TYPE: Record<NonNullable<BannerCardStoryblok['layout']>, string> = {
  column: styles.column,
  'split-v1': styles.splitV1,
  'split-v2': styles.splitV2,
  'two-rows': styles.twoRows,
  'image-outset': styles.imageOutset,
  'highlighted-button': styles.highlightedButton,
  'right-button': styles.rightButton,
};

type BannerCardProps = {
  blok: BannerCardStoryblok;
  className?: string;
};

export default function BannerCard({ blok, className }: BannerCardProps) {
  const backgroundStyles = blok.backgroundImage?.[0]
    ? {
        backgroundImage: `url('${blok.backgroundImage?.[0]?.asset?.filename}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
      }
    : {};

  return (
    <div
      className={clsx(
        styles.container,
        {
          [styles.green]: blok.backgroundColor === 'green',
          [styles.lightGreen]: blok.backgroundColor === 'light-green',
        },
        blok.layout && CARD_TYPE[blok.layout],
        className,
      )}
      style={backgroundStyles}
    >
      {blok.icon?.[0] && <StoryblokComponent blok={blok.icon[0]} className={styles.icon} />}
      {blok.title?.[0] && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}
      {blok.text?.[0] && (
        <div className={styles.text}>
          <StoryblokComponent blok={blok.text[0]} />
        </div>
      )}
      {blok.button?.[0] && (
        <div className={styles.buttonWrapper}>
          {blok.layout === 'highlighted-button' && <div className={styles.buttonDecor}></div>}
          <StoryblokComponent blok={blok.button[0]} className={styles.button} />
        </div>
      )}
      {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
    </div>
  );
}
