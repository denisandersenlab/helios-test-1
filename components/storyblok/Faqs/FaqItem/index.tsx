'use client';

import styles from './styles.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { StoryblokComponent } from '@storyblok/react';
import { FaqItemStoryblok } from '@/src/generated/sb';
import { ChevronIcon } from '@/icons/ChevronIcon';

type FaqItemProps = {
  question: FaqItemStoryblok;
  answer: FaqItemStoryblok;
};

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.container} onClick={() => setIsOpen(!isOpen)}>
      <button type="button" className={styles.question}>
        <div
          className={clsx(styles.questionTitle, {
            [styles.questionTitleActive]: isOpen,
          })}
        >
          <StoryblokComponent blok={question} />
        </div>
        <span className={styles.arrowIconWrapper}>
          <ChevronIcon
            className={clsx(styles.arrowIcon, {
              [styles.closedQuestion]: !isOpen,
            })}
          />
        </span>
      </button>
      {isOpen && (
        <div className={styles.answer} onClick={(e) => e.stopPropagation()}>
          <StoryblokComponent blok={answer} />
        </div>
      )}
    </div>
  );
}
