'use client';

import { useEffect, useState } from 'react';
import { GreenBannerStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import clsx from 'clsx';

export default function GreenBanner({ blok }: { blok: GreenBannerStoryblok }) {
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
        className={clsx(
          styles.wrapper,
          blok.layout === 'big' && styles.big,
          blok.layout === 'with-image' && styles.withImage,
          blok.layout === 'half-content' && styles.halfContent,
        )}
        style={{
          marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px`,
          backgroundImage: blok.backgroundImage?.[0]
            ? `url('${blok.backgroundImage[0].asset?.filename}')`
            : 'linear-gradient(218.88deg, #005A48 8.17%, #003630 77.68%)',
        }}
      >
        <div className={styles.content}>
          {!!blok.greenText?.length && <span className={styles.greenText}>{blok.greenText}</span>}
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
        {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
      </div>
    </div>
  );
}
