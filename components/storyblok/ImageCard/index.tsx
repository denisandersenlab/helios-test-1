'use client';

import { ImageCardStoryblok } from '@/src/generated/sb';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type ImageCardProps = {
  blok: ImageCardStoryblok;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'vertical-reverse';
  containerLayout?:
    | 'two-one-one-one-two-one'
    | 'three-two-cards'
    | 'two-one-one-one-one-two'
    | 'two-cards'
    | 'three-cards'
    | 'two-cards-max'
    | 'one-card';
};

export default function ImageCard({
  blok,
  className,
  layout = 'horizontal',
  containerLayout,
}: ImageCardProps) {
  const layoutStyles = {
    vertical: styles.vertical,
    'vertical-reverse': styles.verticalReverse,
    horizontal: styles.horizontal,
  };

  return (
    <div
      className={clsx(
        styles.container,
        layoutStyles[layout],

        // Compact padding for specific container layouts
        (containerLayout === 'two-one-one-one-two-one' ||
          containerLayout === 'three-two-cards' ||
          containerLayout === 'two-one-one-one-one-two' ||
          containerLayout === 'two-cards' ||
          containerLayout === 'three-cards') &&
          styles.compactPadding,

        // Horizontal compact styling
        (containerLayout === 'two-one-one-one-two-one' || containerLayout === 'three-two-cards') &&
          layout === 'horizontal' &&
          styles.horizontalCompact,

        // Vertical reverse compact styling
        containerLayout === 'two-one-one-one-two-one' &&
          layout === 'vertical-reverse' &&
          styles.verticalReverseCompact,

        // Vertical reverse square styling
        (containerLayout === 'three-two-cards' ||
          containerLayout === 'two-one-one-one-one-two' ||
          containerLayout === 'two-cards' ||
          containerLayout === 'three-cards') &&
          layout === 'vertical-reverse' &&
          styles.verticalReverseSquare,

        // Two cards max specific styling
        containerLayout === 'two-cards-max' && styles.twoCardsMax,

        // One card specific styling
        containerLayout === 'one-card' && styles.oneCard,

        className,
      )}
      {...storyblokEditable(blok)}
    >
      <div className={styles.content}>
        {blok.title?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}
        {blok.text?.map((textItem) => (
          <div key={textItem._uid} className={styles.text}>
            <StoryblokComponent blok={textItem} />
          </div>
        ))}
      </div>
      {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
    </div>
  );
}
