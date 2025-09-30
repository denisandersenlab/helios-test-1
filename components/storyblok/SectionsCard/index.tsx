'use client';

import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { SectionsCardStoryblok } from '@/src/generated/sb';
import { useEffect, useState } from 'react';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import clsx from 'clsx';

type SectionsCardProps = {
  blok: SectionsCardStoryblok;
};

export default function SectionsCard({ blok }: SectionsCardProps) {
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
      {blok.text?.[0] && (
        <div className={styles.text}>
          <StoryblokComponent blok={blok.text[0]} />
        </div>
      )}
      <div className={styles.sections}>
        {blok.sections?.map((section) => {
          return (
            <div key={section._uid} className={styles.section}>
              {section.icon?.[0] && (
                <StoryblokComponent blok={section.icon[0]} className={styles.icon} />
              )}
              {section.title?.[0] && (
                <div className={styles.sectionTitle}>
                  <StoryblokComponent blok={section.title[0]} />
                </div>
              )}
              {section.text?.[0] && (
                <div
                  className={clsx(
                    styles.sectionText,
                    section.layout === 'listColumns' && styles.flexList,
                  )}
                >
                  <StoryblokComponent blok={section.text[0]} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
