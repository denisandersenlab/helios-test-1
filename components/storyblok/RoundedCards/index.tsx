'use client';

import { useEffect, useState } from 'react';
import { RoundedCardsStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import styles from './styles.module.scss';
import clsx from 'clsx';

type RoundedCardsProps = {
  blok: RoundedCardsStoryblok;
};

export default function RoundedCards({ blok }: RoundedCardsProps) {
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

      <div className={styles.cards}>
        {blok.cards?.map((card) => (
          <div
            key={card._uid}
            className={clsx(styles.card, {
              [styles.cardContentReverse]: card.layout === 'content-first',
              [styles.cardPartlyRounded]: blok.layout === 'partly-rounded',
            })}
          >
            {card.image?.[0] && (
              <div className={styles.cardImage}>
                <StoryblokComponent blok={card.image[0]} />
              </div>
            )}
            <div className={styles.cardInfo}>
              {card.title?.[0] && (
                <div className={styles.cardTitle}>
                  <StoryblokComponent blok={card.title[0]} />
                </div>
              )}
              {card.text?.[0] && (
                <div className={styles.cardText}>
                  <StoryblokComponent blok={card.text[0]} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
