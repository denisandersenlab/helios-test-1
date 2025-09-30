'use client';

import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { CardsRowStoryblok } from '@/src/generated/sb';
import { useEffect, useState } from 'react';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import clsx from 'clsx';
import Button from '@/components/storyblok/Button';

type CardsRowProps = {
  blok: CardsRowStoryblok;
};

export default function CardsRow({ blok }: CardsRowProps) {
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
      className={styles.mainContainer}
    >
      <div className={styles.headBlock}>
        {blok.title?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}
        {blok.layout === 'default' && (
          <div className={styles.descriptionWrapper}>
            <div className={styles.description}>
              {blok.text?.[0] && (
                <div className={styles.text}>
                  <StoryblokComponent blok={blok.text[0]} />
                </div>
              )}
              {blok.button?.map((button) => {
                return (
                  <StoryblokComponent key={button._uid} blok={button} className={styles.button} />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardsContainer}>
        {blok.cards?.map((card) => {
          return (
            <div
              key={card._uid}
              style={{
                background: `linear-gradient(180deg, #FFFFFF 35%, ${card.gradientColor} 170%)`,
              }}
              className={clsx(styles.card, {
                [styles.cardReverse]: card.layout === 'bottom-content',
              })}
            >
              <div className={styles.cardInfo}>
                <div>
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
                {card.button?.map((button) => {
                  return <Button key={button._uid} blok={button} className={styles.cardButton} />;
                })}
              </div>

              <div
                className={clsx(styles.cardImageWrapper, {
                  [styles.cardImageWrapperReverse]: card.layout === 'bottom-content',
                })}
              >
                {card.image?.[0] && (
                  <StoryblokComponent blok={card.image[0]} className={styles.cardImage} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {blok.layout === 'bottom-content' && (
        <div className={styles.descriptionBottomWrapper}>
          <div className={styles.description}>
            {blok.text?.[0] && (
              <div className={styles.text}>
                <StoryblokComponent blok={blok.text[0]} />
              </div>
            )}
            {blok.button?.map((button) => {
              return (
                <StoryblokComponent key={button._uid} blok={button} className={styles.button} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
