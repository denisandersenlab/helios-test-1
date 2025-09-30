'use client';

import { GetStartedStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

export default function GetStarted({ blok }: { blok: GetStartedStoryblok }) {
  const backgroundStyles = blok.backgroundImage?.[0]
    ? { backgroundImage: `url('${blok.backgroundImage?.[0]?.asset?.filename}')` }
    : {};

  return (
    <div className={styles.container}>
      {blok.title?.[0] && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}
      {blok.text?.[0] && (
        <div className={styles.text}>
          <StoryblokComponent blok={blok.text[0]} />
        </div>
      )}
      <div className={styles.wrapper} style={backgroundStyles}>
        <div className={styles.content}>
          {blok.ListItems?.map((item, index) => {
            const num = index + 1;
            const markerText = num < 10 ? `0${num}` : `${num}`;

            return (
              <div className={styles.listItem} key={item._uid}>
                <span className={styles.listItemMarker}>{markerText}</span>
                <StoryblokComponent blok={item} />
              </div>
            );
          })}
          <div className={styles.contentFooter}>
            {blok.button?.[0] && (
              <StoryblokComponent blok={blok.button[0]} className={styles.button} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
