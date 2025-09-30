'use client';

import { useState } from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import ArrowIcon from './ArrowIcon';
import ChevronIcon from './ChevronIcon';

import type { HeaderLinkStoryblok } from '@/src/generated/sb';

interface HeaderLinkProps {
  blok: HeaderLinkStoryblok;
  isMobile?: boolean;
  isSubmenuOpen?: boolean;
  onMobileSubmenuToggle?: () => void;
}

export default function HeaderLink({
  blok,
  isMobile = false,
  isSubmenuOpen = false,
  onMobileSubmenuToggle,
}: HeaderLinkProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const hasMultipleGroups = blok.sublinksGroups && blok.sublinksGroups.length > 1;
  const hasSublinks = blok.sublinksGroups && blok.sublinksGroups.length > 0;

  // Mobile version
  if (isMobile) {
    return (
      <div
        className={clsx(styles.mobileHeaderLink, isSubmenuOpen && styles.open)}
        {...storyblokEditable(blok)}
      >
        <button className={styles.mobileLinkToggle} onClick={onMobileSubmenuToggle}>
          {blok.title && <span className={styles.mobileLinkTitle}>{blok.title}</span>}
          {hasSublinks && (
            <span className={styles.mobileLinkArrow}>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </button>

        {hasSublinks && isSubmenuOpen && (
          <div className={styles.mobileSubmenu}>
            {blok.sublinksGroups?.map((groupBlok) => (
              <StoryblokComponent
                blok={groupBlok}
                key={groupBlok._uid}
                isMobile={true}
                bottomLink={blok.bottomLink}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className={styles.headerLink} {...storyblokEditable(blok)}>
      <div className={styles.linkWrapper}>
        {blok.title && <span className={styles.title}>{blok.title}</span>}
      </div>

      {!!blok.sublinksGroups?.length && (
        <div className={clsx(styles.dropdown, hasMultipleGroups && styles.hasMultipleGroups)}>
          {hasMultipleGroups ? (
            <>
              <div className={styles.groupsList}>
                {blok.sublinksGroups?.map((groupBlok, index) => (
                  <button
                    key={groupBlok._uid}
                    className={clsx(styles.groupTitle, index === activeGroupIndex && styles.active)}
                    onMouseEnter={() => setActiveGroupIndex(index)}
                  >
                    {groupBlok.groupTitle || `Group ${index + 1}`}
                    {index === activeGroupIndex && <ArrowIcon />}
                  </button>
                ))}
                <div className={styles.divider} />
                <div className={styles.bottomLinks}>
                  {blok.bottomLink?.map((linkBlok) => (
                    <div key={linkBlok._uid} className={styles.bottomLinkItem}>
                      <StoryblokComponent blok={linkBlok} />
                      <ChevronIcon />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.groupContent}>
                {blok.sublinksGroups[activeGroupIndex] && (
                  <StoryblokComponent
                    blok={blok.sublinksGroups[activeGroupIndex]}
                    hasMultipleGroups={true}
                  />
                )}
              </div>
            </>
          ) : (
            blok.sublinksGroups?.map((groupBlok) => (
              <StoryblokComponent
                blok={groupBlok}
                key={groupBlok._uid}
                hasMultipleGroups={false}
                bottomLink={blok.bottomLink}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
