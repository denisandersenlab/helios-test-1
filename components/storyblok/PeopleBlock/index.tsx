'use client';

import { PeopleBlockStoryblok } from '@/src/generated/sb';
import styles from './styles.module.scss';
import { StoryblokComponent } from '@storyblok/react';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type PeopleBlockProps = {
  blok: PeopleBlockStoryblok;
};

export default function PeopleBlock({ blok }: PeopleBlockProps) {
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
      <div
        className={clsx(styles.leftBlock, {
          [styles.withoutTopTag]: !blok.topTag?.[0],
        })}
      >
        <div>
          {blok.topTag?.[0] && (
            <StoryblokComponent blok={{ ...blok.topTag[0], text: '' }} className={styles.topTag}>
              {blok.topTag[0].text}
            </StoryblokComponent>
          )}
          {blok.title?.[0] && (
            <div
              className={clsx(styles.title, {
                [styles.onlyTitle]: !blok.topTag?.[0] && !blok.text?.[0],
              })}
            >
              <StoryblokComponent blok={blok.title[0]} />
            </div>
          )}
          {blok.text?.[0] && (
            <div className={styles.text}>
              <StoryblokComponent blok={blok.text[0]} />
            </div>
          )}
        </div>

        {blok.button?.map((button) => {
          return <StoryblokComponent key={button._uid} blok={button} className={styles.button} />;
        })}
      </div>

      {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
    </div>
  );
}
