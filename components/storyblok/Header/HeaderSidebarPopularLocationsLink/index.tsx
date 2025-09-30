'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import Link from 'next/link';
import styles from './styles.module.scss';

import type { HeaderSidebarPopularLocationsLinkStoryblok } from '@/src/generated/sb';

export default function HeaderSidebarPopularLocationsLink({
  blok,
}: {
  blok: HeaderSidebarPopularLocationsLinkStoryblok;
}) {
  if (!blok.link) {
    return (
      <div className={styles.headerSidebarPopularLocationsLink} {...storyblokEditable(blok)}>
        {!!blok.icon?.length && (
          <div className={styles.icon}>
            {blok.icon.map((iconBlok) => (
              <StoryblokComponent blok={iconBlok} key={iconBlok._uid} />
            ))}
          </div>
        )}
        {blok.text && <span className={styles.text}>{blok.text}</span>}
      </div>
    );
  }

  const isInternalLink = blok.link.linktype === 'story';
  const href = blok.link.cached_url || blok.link.url || '#';

  const content = (
    <>
      {!!blok.icon?.length && (
        <div className={styles.icon}>
          {blok.icon.map((iconBlok) => (
            <StoryblokComponent blok={iconBlok} key={iconBlok._uid} />
          ))}
        </div>
      )}
      {blok.text && <span className={styles.text}>{blok.text}</span>}
    </>
  );

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className={styles.headerSidebarPopularLocationsLink}
        title={blok.link.title}
        {...storyblokEditable(blok)}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={blok.link.target || '_self'}
      rel={blok.link.rel || (blok.link.target === '_blank' ? 'noopener noreferrer' : undefined)}
      className={styles.headerSidebarPopularLocationsLink}
      title={blok.link.title}
      {...storyblokEditable(blok)}
    >
      {content}
    </a>
  );
}
