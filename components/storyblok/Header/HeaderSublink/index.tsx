'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import Link from 'next/link';
import styles from './styles.module.scss';

import type { HeaderSublinkStoryblok } from '@/src/generated/sb';

export default function HeaderSublink({
  blok,
  isMobile = false,
}: {
  blok: HeaderSublinkStoryblok;
  isMobile?: boolean;
}) {
  const linkClassName = isMobile ? styles.mobileHeaderSublink : styles.headerSublink;
  if (!blok.link) {
    return (
      <div className={linkClassName} {...storyblokEditable(blok)}>
        {!!blok.icon?.length && (
          <div className={styles.icon}>
            {blok.icon.map((iconBlok) => (
              <StoryblokComponent blok={iconBlok} key={iconBlok._uid} />
            ))}
          </div>
        )}
        <div className={styles.content}>
          {blok.title && <span className={styles.title}>{blok.title}</span>}
          {blok.subtitle && <span className={styles.subtitle}>{blok.subtitle}</span>}
        </div>
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
      <div className={styles.content}>
        {blok.title && <span className={styles.title}>{blok.title}</span>}
        {blok.subtitle && <span className={styles.subtitle}>{blok.subtitle}</span>}
      </div>
    </>
  );

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className={linkClassName}
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
      className={linkClassName}
      title={blok.link.title}
      {...storyblokEditable(blok)}
    >
      {content}
    </a>
  );
}
