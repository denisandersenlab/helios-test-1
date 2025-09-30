'use client';

import { useState } from 'react';
import { TabsStoryblok } from '@/src/generated/sb';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function Tabs({ blok }: { blok: TabsStoryblok }) {
  const [activeTab, setActiveTab] = useState(0);

  const activeTabData = blok.tabs?.[activeTab];

  return (
    <div className={styles.container} {...storyblokEditable(blok)}>
      {blok.title?.[0] && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}

      {blok.tabs?.length && (
        <div className={styles.tabsSection}>
          <div className={styles.tabsNavWrapper}>
            <div className={styles.tabsNav}>
              {blok.tabs.map((tab, index) => (
                <button
                  key={tab._uid}
                  className={clsx(styles.tabButton, {
                    [styles.active]: index === activeTab,
                  })}
                  onClick={() => setActiveTab(index)}
                  type="button"
                  data-tab-index={index}
                >
                  {tab.tabIcon?.[0] && (
                    <div className={styles.tabIcon}>
                      <StoryblokComponent blok={tab.tabIcon[0]} />
                    </div>
                  )}
                  {tab.tabTitle?.[0] && (
                    <div className={styles.tabTitle}>
                      <StoryblokComponent blok={tab.tabTitle[0]} />
                    </div>
                  )}
                  {/* Desktop content positioning - inside button */}
                  <div
                    className={clsx(styles.tabItemWrapper, styles.desktopContent, {
                      [styles.placementRight]: tab.contentPlacement === 'right',
                    })}
                  >
                    {index === activeTab && <StoryblokComponent blok={tab} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile content positioning - outside navigation */}
          {activeTabData && (
            <div
              className={clsx(styles.tabItemWrapper, styles.mobileContent, {
                [styles.placementRight]: activeTabData.contentPlacement === 'right',
              })}
            >
              <StoryblokComponent blok={activeTabData} />
            </div>
          )}

          {/* Background image wrapper */}
          <div className={styles.tabContentWrapper}>
            {activeTabData?.contentBackgroundImage?.[0] && (
              <div className={styles.backgroundImage}>
                <StoryblokComponent blok={activeTabData.contentBackgroundImage[0]} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
