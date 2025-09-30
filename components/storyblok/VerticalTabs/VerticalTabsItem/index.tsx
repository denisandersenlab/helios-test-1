'use client';

import { VerticalTabsItemStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

export default function VerticalTabsItem({ blok }: { blok: VerticalTabsItemStoryblok }) {
  return (
    <div className={styles.wrapper}>
      {blok.content && (
        <div className={styles.content}>
          {blok.content.map((contentItem) => (
            <div key={contentItem._uid} className={styles.contentItem}>
              <StoryblokComponent blok={contentItem} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
