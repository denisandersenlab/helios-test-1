'use client';

import { LogosCarouselStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

export default function LogosCarousel({ blok }: { blok: LogosCarouselStoryblok }) {
  return (
    <div className={styles.container}>
      {blok.title && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}
      <div className={styles.listWrapper}>
        <div className={styles.list}>
          {blok.logos?.map((logo) => {
            return <StoryblokComponent key={logo._uid} blok={logo} className={styles.logo} />;
          })}
        </div>
      </div>
    </div>
  );
}
