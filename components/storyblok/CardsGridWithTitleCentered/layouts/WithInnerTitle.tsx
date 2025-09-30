import { CardsGridWithTitleCenteredStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from '../styles.module.scss';
import clsx from 'clsx';

export function renderWithInnerTitleLayout(blok: CardsGridWithTitleCenteredStoryblok) {
  return (
    <>
      {blok.innerTitle?.[0] && (
        <div className={styles.innerTitle}>
          <StoryblokComponent blok={blok.innerTitle[0]} />
        </div>
      )}

      {(!!blok.cards?.length || blok.innerTitle?.[0]) && (
        <div className={styles.cardsGrid}>
          {blok.cards?.[0] && (
            <StoryblokComponent
              key={blok.cards?.[0]._uid}
              blok={blok.cards?.[0]}
              className={clsx(styles.card, styles.card1)}
              layout="two-column"
            />
          )}

          {blok.cards?.[1] && (
            <StoryblokComponent
              key={blok.cards?.[1]._uid}
              blok={blok.cards?.[1]}
              className={clsx(styles.card, styles.card2)}
              layout="single-column"
            />
          )}

          {blok.cards?.[2] && (
            <StoryblokComponent
              key={blok.cards?.[2]._uid}
              blok={blok.cards?.[2]}
              className={clsx(styles.card, styles.card3)}
              layout="single-column"
            />
          )}

          {blok.innerTitle?.[0] && (
            <div className={styles.secondaryTitle}>
              <StoryblokComponent blok={blok.innerTitle[0]} />
            </div>
          )}

          {blok.cards?.[3] && (
            <StoryblokComponent
              key={blok.cards?.[3]._uid}
              blok={blok.cards?.[3]}
              className={clsx(styles.card, styles.card4)}
              layout="two-column"
            />
          )}
        </div>
      )}
    </>
  );
}