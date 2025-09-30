'use client';

import clsx from 'clsx';
import { StoryblokComponent } from '@storyblok/react';
import { AccordionTabsItemStoryblok } from '@/src/generated/sb';
import styles from './styles.module.scss';

type AccordionTabsItemProps = {
  tab: AccordionTabsItemStoryblok;
  activeTab: AccordionTabsItemStoryblok;
  onChangeTabAction: (newTab: AccordionTabsItemStoryblok) => void;
};

export default function AccordionTabsItem({
  activeTab,
  onChangeTabAction,
  tab,
}: AccordionTabsItemProps) {
  const isOpen = tab._uid === activeTab._uid;
  const isTabWithIcon = tab.icon?.[0];

  return (
    <div
      className={clsx(styles.container, {
        [styles.containerWithIcon]: isTabWithIcon,
      })}
      onClick={() => onChangeTabAction(tab)}
    >
      <div
        className={clsx(styles.accordionItem, {
          [styles.accordionWithIcon]: isTabWithIcon,
        })}
      >
        {tab.icon?.[0] && (
          <div className={styles.iconWrapper}>
            <StoryblokComponent blok={tab.icon[0]} className={styles.icon} />
          </div>
        )}
        <button
          type="button"
          className={clsx(styles.title, {
            [styles.titleClose]: !isOpen,
          })}
        >
          <StoryblokComponent blok={tab.title?.[0]} />
        </button>
        {isOpen && (
          <div className={styles.text} onClick={(e) => e.stopPropagation()}>
            <StoryblokComponent blok={tab.text?.[0]} />
          </div>
        )}
      </div>

      {tab.image?.[0] && isOpen && (
        <div
          className={clsx(styles.imageWrapper, {
            [styles.imageWrapperWithIcon]: isTabWithIcon,
          })}
        >
          <StoryblokComponent blok={tab.image[0]} className={styles.image} />
        </div>
      )}
      <div
        className={clsx(styles.separator, {
          [styles.separatorOpen]: isOpen,
          [styles.separatorWithIcon]: isTabWithIcon,
        })}
      />
    </div>
  );
}
