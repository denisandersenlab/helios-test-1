'use client';

import { useEffect, useState } from 'react';
import { NestedBannerStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import clsx from 'clsx';

export default function NestedBanner({ blok }: { blok: NestedBannerStoryblok }) {
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
        className={clsx(styles.wrapper, blok.contentPosition === 'right' && styles.reverse)}
        style={{
          marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px`,
          backgroundImage: `url('${blok.backgroundImage?.[0]?.asset?.filename}')`,
        }}
      >
        <div className={clsx(styles.content, blok.layout === 'transparent' && styles.transparent)}>
          {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
          <div className={clsx(styles.textWrapper, !!blok.button?.[0] && styles.withButton)}>
            {blok.topText?.[0] && (
              <div className={styles.topText}>
                <StoryblokComponent blok={blok.topText[0]} />
              </div>
            )}
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
            {blok.button?.[0] && (
              <StoryblokComponent blok={blok.button[0]} className={styles.button} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
