'use client';

import { useEffect, useState } from 'react';
import { AccordionTabsItemStoryblok, AccordionTabsStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import TabItem from '@/components/storyblok/AccordionTabs/AccordionTabsItem';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import styles from './styles.module.scss';

type AccordionTabsProps = {
  blok: AccordionTabsStoryblok;
};

export default function AccordionTabs({ blok }: AccordionTabsProps) {
  const [activeTab, setActiveTab] = useState(blok.tabs?.[0]);
  const [isMobile, setIsMobile] = useState(false);

  const onChangeTabAction = (newTab: AccordionTabsItemStoryblok) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      style={{ marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px` }}
      className={styles.container}
    >
      {blok.title?.[0] && (
        <div className={styles.title}>
          <StoryblokComponent blok={blok.title[0]} />
        </div>
      )}

      <div className={styles.tabs}>
        {activeTab &&
          blok.tabs?.map((tab) => (
            <TabItem
              key={tab._uid}
              tab={tab}
              activeTab={activeTab}
              onChangeTabAction={onChangeTabAction}
            />
          ))}
      </div>
    </div>
  );
}
