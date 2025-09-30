'use client';

import { useEffect, useState } from 'react';
import { RoundedGreenBannerStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import clsx from 'clsx';

export default function RoundedGreenBanner({ blok }: { blok: RoundedGreenBannerStoryblok }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.wrapper, blok.layout === 'image-first' && styles.reverse)}
        style={{ marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px` }}
      >
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
        </div>
        <div className={styles.imageContent}>
          {blok.backgroundImage?.[0] && (
            <StoryblokComponent blok={blok.backgroundImage[0]} className={styles.image} />
          )}
          {blok.topText?.[0] && (
            <div className={styles.topText}>
              <StoryblokComponent blok={blok.topText[0]} />
            </div>
          )}
          {blok.bottomText?.[0] && (
            <div className={styles.bottomText}>
              <StoryblokComponent blok={blok.bottomText[0]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
