'use client';

import { VerticalTabsBottomBannerStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

export default function VerticalTabsBottomBanner({
  blok,
}: {
  blok: VerticalTabsBottomBannerStoryblok;
}) {
  return (
    <div className={styles.wrapper}>
      {blok.title && <h3 className={styles.title}>{blok.title}</h3>}

      {blok.buttons?.length && (
        <div className={styles.buttons}>
          {blok.buttons.map((button) => (
            <StoryblokComponent key={button._uid} blok={button} />
          ))}
        </div>
      )}
    </div>
  );
}
