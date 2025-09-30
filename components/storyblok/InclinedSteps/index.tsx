'use client';

import { useEffect, useState } from 'react';
import { InclinedStepsStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';

export default function InclinedSteps({ blok }: { blok: InclinedStepsStoryblok }) {
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
      {blok.backgroundImage?.[0] && (
        <StoryblokComponent blok={blok.backgroundImage[0]} className={styles.image} />
      )}
      <div className={clsx(styles.textWrapper, blok.layout === 'top-title' && styles.centered)}>
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
      </div>

      <div className={styles.steps}>
        {blok.steps?.map((step, index) => (
          <StoryblokComponent
            className={styles.step}
            blok={step}
            key={step._uid}
            stepNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
