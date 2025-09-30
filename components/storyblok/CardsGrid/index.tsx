'use client';

import { CardsGridStoryblok } from '@/src/generated/sb';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { getLinkIconCardLayout, getImageCardLayout } from './utils';

const MOBILE_SIZE = 500;

const GRID_TYPE: Record<NonNullable<CardsGridStoryblok['layout']>, string> = {
  'four-cards': styles.fourCards,
  'three-cards': styles.threeCards,
  'three-two-cards': styles.threeTwoCards,
  'two-three-cards': styles.twoThreeCards,
  'two-cards': styles.twoCards,
  'two-one-one-one-two-one': styles.twoOneOneOneTwoOne,
  'two-one-one-one-one-two': styles.twoOneOneOneOneTwo,
  'two-one-cards': styles.twoOneCards,
  'two-one-one-two': styles.twoOneOneTwo,
  'two-cards-max': styles.twoCardsMax,
  'one-card': styles.oneCard,
  'one-one-two': styles.oneOneTwo,
};

export default function CardsGrid({ blok }: { blok: CardsGridStoryblok }) {
  const [isMobile, setIsMobile] = useState(false);

  const wrapperStyles = {
    paddingTop: `${(isMobile ? blok.paddingTopMobile : blok.paddingTop) ?? 0}px`,
    paddingBottom: `${(isMobile ? blok.paddingBottomMobile : blok.paddingBottom) ?? 0}px`,
  };

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
      className={clsx(styles.wrapper, {
        [styles.gradientGreen]: blok.backgroundColor === 'gradient-green',
        [styles.green]: blok.backgroundColor === 'green',
      })}
      style={wrapperStyles}
      {...storyblokEditable(blok)}
    >
      <div className={styles.container}>
        {blok.title?.[0] && (
          <div
            className={clsx(
              blok.layout === 'two-one-one-two' ? styles.titleTwoOneOneTwo : styles.title,
              blok.layout === 'two-one-one-one-two-one' && styles.titleCompact,
            )}
          >
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}
        {blok.text?.[0] && (
          <div
            className={clsx(
              styles.text,
              blok.layout === 'two-one-one-one-two-one' && styles.textCompact,
            )}
          >
            <StoryblokComponent blok={blok.text[0]} />
          </div>
        )}
        {blok.subtitle?.[0] && (
          <div
            className={clsx(
              styles.subtitle,
              blok.layout === 'two-one-one-one-two-one' && styles.subtitleCompact,
            )}
          >
            <StoryblokComponent blok={blok.subtitle[0]} />
          </div>
        )}
        <div className={clsx(styles.content, blok.layout && GRID_TYPE[blok.layout])}>
          {blok.cards?.map((card, index) => {
            const isBanner = card.component === 'bannerCard';

            if (isBanner || card.component === 'iconCard') {
              return (
                <StoryblokComponent
                  blok={card}
                  className={clsx(styles.card, isBanner ? styles.banner : styles.iconCard)}
                  key={card._uid}
                  containerLayout={isBanner ? blok.layout : undefined}
                />
              );
            }

            if (card.component === 'linkIconCard') {
              const layout = getLinkIconCardLayout(blok.layout, index);

              return (
                <StoryblokComponent
                  blok={card}
                  className={clsx(styles.card, styles.iconCard)}
                  key={card._uid}
                  layout={layout}
                  containerLayout={blok.layout}
                />
              );
            }

            if (card.component === 'imageCard') {
              const layout = getImageCardLayout(blok.layout, index);

              return (
                <StoryblokComponent
                  blok={card}
                  className={clsx(styles.card, styles.imageCard)}
                  key={card._uid}
                  layout={layout}
                  containerLayout={blok.layout}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
