'use client';

import { LearnMoreStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

type LearnMoreProps = {
  blok: LearnMoreStoryblok;
};

export default function LearnMore({ blok }: LearnMoreProps) {
  return (
    <div
      style={{ backgroundImage: `url(${blok.mainBackgroundImage?.[0]?.asset?.filename})` }}
      className={styles.mainBackgroundImage}
    >
      <div
        style={{
          backgroundImage: `url(${blok.secondaryBackgroundImage?.[0]?.asset?.filename})`,
        }}
        className={styles.secondaryBackgroundImage}
      >
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
        {blok.buttons?.map((button) => {
          return <StoryblokComponent key={button._uid} blok={button} className={styles.button} />;
        })}
      </div>
    </div>
  );
}
