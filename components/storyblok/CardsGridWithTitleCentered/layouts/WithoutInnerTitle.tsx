import { CardsGridWithTitleCenteredStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from '../styles.module.scss';
import clsx from 'clsx';

export function renderWithoutInnerTitleLayout(blok: CardsGridWithTitleCenteredStoryblok) {
  return (
    <>
      {!!blok.cards?.length && (
        <div className={clsx(styles.cardsGrid, styles.cardsGridNoInnerTitle)}>
          {blok.cards?.[0] && (
            <StoryblokComponent
              key={blok.cards?.[0]._uid}
              blok={blok.cards?.[0]}
              className={clsx(styles.card, styles.cardNoInnerTitle1)}
              layout="without-inner-title"
            />
          )}

          {blok.cards?.[1] && (
            <StoryblokComponent
              key={blok.cards?.[1]._uid}
              blok={blok.cards?.[1]}
              className={clsx(styles.card, styles.cardNoInnerTitle2)}
              layout="single-column"
            />
          )}

          {blok.cards?.[2] && (
            <StoryblokComponent
              key={blok.cards?.[2]._uid}
              blok={blok.cards?.[2]}
              className={clsx(styles.card, styles.cardNoInnerTitle3)}
              layout="without-inner-title"
            />
          )}

          {blok.cards?.[3] && (
            <StoryblokComponent
              key={blok.cards?.[3]._uid}
              blok={blok.cards?.[3]}
              className={clsx(styles.card, styles.cardNoInnerTitle4)}
              layout="single-column"
            />
          )}
        </div>
      )}
    </>
  );
}