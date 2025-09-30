'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

import type { HeaderContactUsBannerStoryblok } from '@/src/generated/sb';

export default function HeaderContactUsBanner({ blok }: { blok: HeaderContactUsBannerStoryblok }) {
  return (
    <div className={styles.headerContactUsBanner} {...storyblokEditable(blok)}>
      {!!blok.title?.length && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} key={blok.title[0]._uid} />
        </div>
      )}

      {!!blok.text?.length && (
        <div className={styles.text}>
          <StoryblokComponent blok={blok.text[0]} key={blok.text[0]._uid} />
        </div>
      )}

      {!!blok.link?.length && (
        <div className={styles.link}>
          <StoryblokComponent blok={blok.link[0]} key={blok.link[0]._uid} />
        </div>
      )}
    </div>
  );
}
