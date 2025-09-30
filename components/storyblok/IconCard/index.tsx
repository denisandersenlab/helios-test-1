'use client';

import { IconCardStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type IconCardProps = {
  blok: IconCardStoryblok;
  className?: string;
};

export default function IconCard({ blok, className }: IconCardProps) {
  return (
    <div
      className={clsx(
        styles.container,
        {
          [styles.green]: blok.backgroundColor === 'green',
          [styles.lightGreen]: blok.backgroundColor === 'light-green',
          [styles.secondary]: blok.layout === 'secondary',
        },
        className,
      )}
    >
      <div className={clsx(blok.layout === 'row-title' && styles.header)}>
        {blok.icon?.[0] && <StoryblokComponent blok={blok.icon[0]} className={styles.icon} />}
        {blok.title?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}
      </div>
      {blok.text?.[0] && (
        <div className={styles.text}>
          <StoryblokComponent blok={blok.text[0]} />
        </div>
      )}
    </div>
  );
}
