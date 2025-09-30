'use client';

import { useEffect, useRef, useState } from 'react';
import { SecondaryTabsStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import { ArrowIcon } from '@/icons/ArrowIcon';

export default function SecondaryTabs({ blok }: { blok: SecondaryTabsStoryblok }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(true);

  const scrollToRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  const activeTab = blok.tabs?.[activeTabIndex];

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setHasScroll(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    checkScroll();

    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolledToEnd(el.scrollLeft + 1 >= el.scrollWidth - el.clientWidth);
    };

    el.addEventListener('scroll', handleScroll);

    return () => el.removeEventListener('scroll', handleScroll);
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

      <div className={styles.tabsWrapper}>
        <div className={styles.tabs} ref={scrollRef}>
          {blok.tabs?.map((tab, index) => (
            <button
              key={tab._uid}
              className={clsx(styles.tab, {
                [styles.active]: index === activeTabIndex,
              })}
              onClick={() => setActiveTabIndex(index)}
              type="button"
              role="tab"
              data-tab-index={index}
            >
              <span className={styles.tabName}>{tab.tabName}</span>
            </button>
          ))}
        </div>
        {hasScroll && !scrolledToEnd && (
          <button className={styles.scrollButton} onClick={scrollToRight}>
            <ArrowIcon className={styles.arrowIcon} />
          </button>
        )}
      </div>

      <div className={styles.tabContent}>
        {activeTab && <StoryblokComponent blok={activeTab} />}
      </div>
    </div>
  );
}
