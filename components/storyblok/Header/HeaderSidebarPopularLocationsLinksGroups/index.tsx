'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

import type { HeaderSidebarPopularLocationsLinksGroupsStoryblok } from '@/src/generated/sb';

export default function HeaderSidebarPopularLocationsLinksGroups({
  blok,
}: {
  blok: HeaderSidebarPopularLocationsLinksGroupsStoryblok;
}) {
  return (
    <div className={styles.headerSidebarPopularLocationsLinksGroups} {...storyblokEditable(blok)}>
      {blok.groupName && <h4 className={styles.groupName}>{blok.groupName}</h4>}

      {!!blok.links?.length && blok.links.length > 0 && (
        <div className={styles.links}>
          {blok.links.map((linkBlok) => (
            <StoryblokComponent blok={linkBlok} key={linkBlok._uid} />
          ))}
        </div>
      )}
    </div>
  );
}
