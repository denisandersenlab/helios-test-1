'use client';

import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import styles from './styles.module.css';

import type { ImageStoryblok } from '@/src/generated/sb';
import clsx from 'clsx';

type ImageBlockProps = {
  blok: ImageStoryblok;
  className?: string;
};

export default function ImageBlock({ blok, className }: ImageBlockProps) {
  if (!blok.asset?.filename) {
    return null;
  }

  return (
    <div {...storyblokEditable(blok)} className={clsx(styles.imageContainer, className)}>
      <Image
        src={blok.asset.filename}
        alt={blok.asset.alt || ''}
        width={blok.asset.width || 1200}
        height={blok.asset.height || 800}
        className={styles.image}
        title={blok.asset.title || undefined}
      />
    </div>
  );
}
