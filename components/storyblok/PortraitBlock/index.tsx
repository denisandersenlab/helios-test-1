'use client';

import { useEffect, useState } from 'react';
import { PortraitBlockStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';

export default function PortraitBlock({ blok }: { blok: PortraitBlockStoryblok }) {
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
      className={clsx(styles.container, blok.layout === 'centered' && styles.centered)}
    >
      {blok.title?.[0] && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}
      <div className={styles.wrapper}>
        {blok.leftText?.[0] && (
          <div className={styles.leftText}>
            <StoryblokComponent blok={blok.leftText[0]} />
          </div>
        )}
        {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
        {blok.rightText?.[0] && (
          <div className={styles.rightText}>
            <StoryblokComponent blok={blok.rightText[0]} />
          </div>
        )}
      </div>
    </div>
  );
}
