'use client';

import { TabsItemStoryblok } from '@/src/generated/sb';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function TabsItem({ blok }: { blok: TabsItemStoryblok }) {
  const contentPlacement = blok.contentPlacement || 'left';

  return (
    <div
      className={clsx(styles.tabsItem, {
        [styles.placementLeft]: contentPlacement === 'left',
        [styles.placementRight]: contentPlacement === 'right',
      })}
      {...storyblokEditable(blok)}
    >
      <div className={styles.content}>
        {blok.contentTitle?.[0] && (
          <div className={styles.contentTitle}>
            <StoryblokComponent blok={blok.contentTitle[0]} />
          </div>
        )}

        {blok.contentText?.[0] && (
          <div className={styles.contentText}>
            <StoryblokComponent blok={blok.contentText[0]} />
          </div>
        )}

        {blok.contentButtons?.length && (
          <div className={styles.contentButtons}>
            {blok.contentButtons.map((button) => (
              <StoryblokComponent key={button._uid} blok={button} className={styles.button} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
