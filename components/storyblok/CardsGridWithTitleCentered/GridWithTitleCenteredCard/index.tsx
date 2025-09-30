'use client';

import { GridWithTitleCenteredCardStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function GridWithTitleCenteredCard({
  blok,
  className,
  layout = 'single-column',
}: {
  blok: GridWithTitleCenteredCardStoryblok;
  className?: string;
  layout?: 'single-column' | 'two-column' | 'without-inner-title';
}) {
  const isTwoColumn = layout === 'two-column';

  if (isTwoColumn) {
    return (
      <div className={clsx(styles.card, className, styles.twoColumn)}>
        <div className={styles.content}>
          {blok.title && <h3 className={styles.title}>{blok.title}</h3>}

          {blok.text?.[0] && (
            <div className={styles.text}>
              <StoryblokComponent blok={blok.text[0]} />
            </div>
          )}
        </div>

        {blok.image?.[0] && (
          <div className={styles.imageWrapper}>
            <StoryblokComponent blok={blok.image[0]} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={clsx(styles.card, className, styles.singleColumn)}>
      {blok.image?.[0] && (
        <div
          className={clsx(styles.imageWrapper, {
            [styles.imageWrapperWithoutInnerTitle]: layout === 'without-inner-title',
          })}
        >
          <StoryblokComponent blok={blok.image[0]} />
        </div>
      )}

      <div
        className={clsx(styles.content, {
          [styles.contentWithoutInnerTitle]: layout === 'without-inner-title',
        })}
      >
        {blok.title && <h3 className={styles.title}>{blok.title}</h3>}

        {blok.text?.[0] && (
          <div className={styles.text}>
            <StoryblokComponent blok={blok.text[0]} />
          </div>
        )}
      </div>
    </div>
  );
}
