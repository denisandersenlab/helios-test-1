'use client';

import { LinkIconCardStoryblok } from '@/src/generated/sb';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type LinkIconCardProps = {
  blok: LinkIconCardStoryblok;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'vertical-reverse';
  containerLayout?: string;
};

export default function LinkIconCard({
  blok,
  className,
  layout = 'horizontal',
  containerLayout,
}: LinkIconCardProps) {
  const layoutStyles = {
    horizontal: styles.horizontal,
    vertical: styles.vertical,
    'vertical-reverse': styles.verticalReverse,
  };

  return (
    <div
      className={clsx(
        styles.container,
        layoutStyles[layout],
        containerLayout === 'two-one-one-two' && styles.twoOneOneTwo,
        className,
      )}
      {...storyblokEditable(blok)}
    >
      {layout === 'vertical' || layout === 'vertical-reverse' ? (
        <>
          {blok.icon?.[0] && (
            <div className={styles.icon}>
              <StoryblokComponent blok={blok.icon[0]} />
            </div>
          )}
          <div className={styles.content}>
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
            {blok.link?.[0] && (
              <div className={styles.link}>
                <StoryblokComponent blok={blok.link[0]} />
              </div>
            )}
          </div>
          {blok.image?.[0] && (
            <div className={styles.image}>
              <StoryblokComponent blok={blok.image[0]} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.content}>
            {blok.icon?.[0] && (
              <div className={styles.icon}>
                <StoryblokComponent blok={blok.icon[0]} />
              </div>
            )}
            <div className={styles.contentWrapper}>
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
              {blok.link?.[0] && (
                <div className={styles.link}>
                  <StoryblokComponent blok={blok.link[0]} />
                </div>
              )}
            </div>
          </div>
          {blok.image?.[0] && (
            <div className={styles.image}>
              <StoryblokComponent blok={blok.image[0]} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
