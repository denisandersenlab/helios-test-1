'use client';

import { useEffect, useState } from 'react';
import { BannerWithBackgroundStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';

export default function BannerWithBackground({ blok }: { blok: BannerWithBackgroundStoryblok }) {
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
        className={styles.wrapper}
        style={{
          marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px`,
          backgroundImage: `url('${blok.backgroundImage?.[0]?.asset?.filename}')`,
        }}
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
          {blok.bottomCard?.[0] && (
            <StoryblokComponent blok={blok.bottomCard[0]} className={styles.card} />
          )}
        </div>
      </div>
    </div>
  );
}
