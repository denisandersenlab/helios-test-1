'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

import type { HeaderSidebarPopularLocationsStoryblok } from '@/src/generated/sb';

export default function HeaderSidebarPopularLocations({
  blok,
}: {
  blok: HeaderSidebarPopularLocationsStoryblok;
}) {
  return (
    <div className={styles.headerSidebarPopularLocations} {...storyblokEditable(blok)}>
      {blok.title && <h3 className={styles.title}>{blok.title}</h3>}

      {!!blok.link?.length && (
        <div className={styles.link}>
          {blok.link.map((linkBlok) => (
            <StoryblokComponent blok={linkBlok} key={linkBlok._uid} />
          ))}
        </div>
      )}
    </div>
  );
}
