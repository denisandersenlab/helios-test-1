'use client';

import { useEffect, useState } from 'react';
import { BannerWithCardsStoryblok } from '@/src/generated/sb';
import clsx from 'clsx';
import { StoryblokComponent } from '@storyblok/react';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import styles from './styles.module.scss';

type BannerWithCardsProps = {
  blok: BannerWithCardsStoryblok;
};

export default function BannerWithCards({ blok }: BannerWithCardsProps) {
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
      style={{
        backgroundImage: `url(${blok.backgroundImage?.[0]?.asset?.filename})`,
        marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px`,
      }}
      className={styles.container}
    >
      <div className={styles.infoBlock}>
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
      </div>

      <div className={styles.cards}>
        {blok.cards?.map((card) => (
          <div
            key={card._uid}
            className={clsx(styles.card, {
              [styles.textCard]: !card.icon?.[0],
            })}
          >
            {card.icon?.[0] && (
              <div className={styles.cardIcon}>
                <StoryblokComponent blok={card.icon[0]} />
              </div>
            )}
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
        ))}
      </div>
    </div>
  );
}
