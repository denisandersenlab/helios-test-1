'use client';

import { useEffect, useState } from 'react';
import { LandscapeBlockStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';

export default function LandscapeBlock({ blok }: { blok: LandscapeBlockStoryblok }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      style={{ marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px` }}
      className={styles.container}
    >
      {blok.title?.[0] && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}
      {blok.topText?.[0] && (
        <div className={styles.topText}>
          <StoryblokComponent blok={blok.topText[0]} />
        </div>
      )}
      <div className={styles.imageContent}>
        {blok.imageText?.[0] && (
          <div className={styles.imageText}>
            <StoryblokComponent blok={blok.imageText[0]} />
          </div>
        )}
        {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
      </div>
      <div className={styles.bottomContent}>
        {blok.leftText?.[0] && (
          <div className={styles.leftText}>
            <StoryblokComponent blok={blok.leftText[0]} />
          </div>
        )}
        {blok.rightText?.[0] && (
          <div className={styles.rightText}>
            <StoryblokComponent blok={blok.rightText[0]} />
          </div>
        )}
      </div>
    </div>
  );
}
