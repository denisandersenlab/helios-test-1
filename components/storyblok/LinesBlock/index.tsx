'use client';

import { LinesBlockStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

type LinesBlockProps = {
  blok: LinesBlockStoryblok;
};

export default function LinesBlock({ blok }: LinesBlockProps) {
  return (
    <div className={styles.container}>
      <div className={styles.infoBlock}>
        <div className={styles.info}>
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
          {blok.button?.map((button) => {
            return <StoryblokComponent key={button._uid} blok={button} className={styles.button} />;
          })}
        </div>
        {blok.smallImage?.[0] && (
          <StoryblokComponent blok={blok.smallImage[0]} className={styles.smallImage} />
        )}
      </div>
      {blok.bigImage?.[0] && <StoryblokComponent blok={blok.bigImage[0]} />}
    </div>
  );
}
