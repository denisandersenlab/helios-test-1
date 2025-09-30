'use client';

import { CardsGridWithTitleCenteredStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { renderWithInnerTitleLayout } from './layouts/WithInnerTitle';
import { renderWithoutInnerTitleLayout } from './layouts/WithoutInnerTitle';

export default function CardsGridWithTitleCentered({
  blok,
}: {
  blok: CardsGridWithTitleCenteredStoryblok;
}) {
  const isWithoutInnerTitle = blok.layout === 'without-inner-title';

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.primary]: blok.backgroundColor === 'primary',
        [styles.transparent]: blok.backgroundColor === 'transparent',
      })}
    >
      <div className={styles.container}>
        {blok.mainTitle?.[0] && (
          <div className={styles.mainTitle}>
            <StoryblokComponent blok={blok.mainTitle[0]} />
          </div>
        )}

        {isWithoutInnerTitle
          ? renderWithoutInnerTitleLayout(blok)
          : renderWithInnerTitleLayout(blok)}
      </div>
    </div>
  );
}
