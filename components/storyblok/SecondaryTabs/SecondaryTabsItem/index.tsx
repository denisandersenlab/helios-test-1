'use client';

import { SecondaryTabsItemStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

export default function SecondaryTabsItem({ blok }: { blok: SecondaryTabsItemStoryblok }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.tab}>
          {blok.tabIcon?.[0] && (
            <StoryblokComponent blok={blok.tabIcon?.[0]} className={styles.tabIcon} />
          )}
          {blok.tabName}
        </div>
        {blok.contentTitle?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.contentTitle[0]} />
          </div>
        )}

        {blok.contentText?.[0] && (
          <div className={styles.text}>
            <StoryblokComponent blok={blok.contentText[0]} />
          </div>
        )}

        {blok.contentButton?.[0] && (
          <StoryblokComponent blok={blok.contentButton?.[0]} className={styles.button} />
        )}
      </div>

      {blok.contentImage?.[0] && (
        <StoryblokComponent blok={blok.contentImage?.[0]} className={styles.image} />
      )}
    </div>
  );
}
