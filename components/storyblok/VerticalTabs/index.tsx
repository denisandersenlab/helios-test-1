'use client';

import { VerticalTabsStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import { useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function VerticalTabs({ blok }: { blok: VerticalTabsStoryblok }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {blok.title?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.tabsList}>
            {blok.tabs?.map((tab, index) => (
              <button
                key={tab._uid}
                className={clsx(styles.tabButton, {
                  [styles.active]: activeTab === index,
                })}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {blok.tabs?.[activeTab] && <StoryblokComponent blok={blok.tabs[activeTab]} />}
          </div>
        </div>
        {blok.bottomBanner?.[0] && (
          <div className={styles.bottomBanner}>
            <div className={styles.bottomBannerSide} />
            <StoryblokComponent blok={blok.bottomBanner[0]} />
          </div>
        )}
      </div>
    </div>
  );
}
