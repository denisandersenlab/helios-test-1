'use client';

import { InclinedStepsItemStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { CheckmarkIcon } from '@/icons/CheckmarkIcon';

export default function InclinedStepsItem({
  blok,
  stepNumber,
  className,
}: {
  blok: InclinedStepsItemStoryblok;
  stepNumber: number;
  className?: string;
}) {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <span className={styles.stepNumber}>{stepNumber}</span>
        <div className={styles.headerContent}>
          {blok.title?.[0] && (
            <div className={styles.title}>
              <StoryblokComponent blok={blok.title[0]} />
            </div>
          )}

          {blok.topText?.[0] && (
            <div className={styles.text}>
              <StoryblokComponent blok={blok.topText[0]} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <div>
          {blok.points?.map((point) => (
            <div className={styles.listItem} key={point._uid}>
              <CheckmarkIcon />
              <StoryblokComponent blok={point} />
            </div>
          ))}
        </div>
        {blok.logos?.[0] && blok.button?.[0] && (
          <div className={styles.footer}>
            {blok.logos?.map((point) => (
              <StoryblokComponent key={point._uid} blok={point} className={styles.logo} />
            ))}
            {blok.button?.[0] && (
              <StoryblokComponent blok={blok.button?.[0]} className={styles.button} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
