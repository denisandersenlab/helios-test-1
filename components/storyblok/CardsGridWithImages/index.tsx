'use client';

import { CardsGridWithImagesStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

function checkIsHorizontal(num: number) {
  return num % 4 === 1 || num % 4 === 0;
}

const MOBILE_SIZE = 500;

const GRID_TYPE: Record<NonNullable<CardsGridWithImagesStoryblok['layout']>, string> = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
};

export default function CardsGridWithImages({ blok }: { blok: CardsGridWithImagesStoryblok }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_SIZE}px)`);
    setIsMobile(mq.matches);
    const handler = (e: { matches: boolean | ((prevState: boolean) => boolean) }) =>
      setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ marginBottom: `${(isMobile ? blok.marginBottomMobile : blok.marginBottom) ?? 0}px` }}
    >
      {blok.title?.[0] && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}
      <div className={clsx(styles.content, blok.layout && GRID_TYPE[blok.layout])}>
        {blok.cards?.map((card, index) => {
          const isHorizontal = blok.layout === 'vertical' || checkIsHorizontal(index + 1);
          return (
            <StoryblokComponent
              blok={card}
              className={clsx(
                styles.card,
                isHorizontal ? styles.cardHorizontal : styles.cardVertical,
              )}
              key={card._uid}
              layout={isHorizontal ? 'horizontal' : 'vertical'}
            />
          );
        })}
      </div>
    </div>
  );
}
