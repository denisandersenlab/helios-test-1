'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { HorizontalCardsStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import styles from './styles.module.scss';

type HorizontalCardsProps = {
  blok: HorizontalCardsStoryblok;
};

export default function HorizontalCards({ blok }: HorizontalCardsProps) {
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
        backgroundColor: `${blok.backgroundColor}`,
        marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px`,
        paddingBottom: `${isMobile ? blok.paddingBottomMobile : blok.paddingBottom}px`,
        paddingTop: `${isMobile ? blok.paddingTopMobile : blok.paddingTop}px`,
      }}
    >
      <div className={styles.contentContainer}>
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

        <div className={styles.cards}>
          {blok.cards?.map((card) => (
            <div
              key={card._uid}
              style={{
                marginBottom: `${isMobile ? card.marginBottomMobile : card.marginBottom}px`,
              }}
              className={clsx(styles.card, {
                [styles.cardContentFirst]: card.layoutDirection === 'content-first',
              })}
            >
              <div
                className={clsx(styles.cardImage, {
                  [styles.cardImageProportion]: card.proportion === 'content-40',
                })}
              >
                {card.image?.[0] && <StoryblokComponent blok={card.image[0]} />}
              </div>
              <div
                className={clsx(styles.cardContent, {
                  [styles.cardContentProportion]: card.proportion === 'content-40',
                })}
              >
                {card.topText?.[0] && (
                  <div className={styles.cardTopText}>
                    <StoryblokComponent blok={card.topText[0]} />
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
                {card.button?.map((button) => {
                  return (
                    <StoryblokComponent
                      key={button._uid}
                      blok={button}
                      className={styles.cardButton}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
