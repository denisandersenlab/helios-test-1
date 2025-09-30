'use client';

import { VerticalTabsAccordionStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import { useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function VerticalTabsAccordion({ blok }: { blok: VerticalTabsAccordionStoryblok }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={clsx(styles.trigger, {
          [styles.open]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.title}>{blok.title}</span>
        <svg
          className={clsx(styles.icon, { [styles.rotated]: isOpen })}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && blok.content?.[0] && (
        <div className={styles.content}>
          <StoryblokComponent blok={blok.content[0]} />
        </div>
      )}
    </div>
  );
}
