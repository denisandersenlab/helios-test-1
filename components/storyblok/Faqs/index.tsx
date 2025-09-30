'use client';

import { useEffect, useState } from 'react';
import { FaqsStoryblok } from '@/src/generated/sb';
import styles from './styles.module.scss';
import FaqItem from '@/components/storyblok/Faqs/FaqItem';
import { StoryblokComponent } from '@storyblok/react';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';

type FaqsProps = {
  blok: FaqsStoryblok;
};

export default function Faqs({ blok }: FaqsProps) {
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
          {blok.image?.[0] && <StoryblokComponent blok={blok.image?.[0]} />}
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}
      <div className={styles.questionsList}>
        {blok.listItems?.map((item, index) => (
          <FaqItem key={index} question={item.question?.[0]} answer={item.answer?.[0]} />
        ))}
      </div>
      {blok.button?.map((button) => {
        return <StoryblokComponent key={button._uid} blok={button} className={styles.button} />;
      })}
    </div>
  );
}
