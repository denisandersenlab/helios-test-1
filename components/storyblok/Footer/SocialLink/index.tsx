'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.scss';
import type { SocialLinkStoryblok } from '@/src/generated/sb';

export default function SocialLink({ blok }: { blok: SocialLinkStoryblok }) {
  const link = blok.link?.[0];

  if (!link || !link.link) {
    return null;
  }

  const href = link.link.cached_url || link.link.url || '#';
  const target = link.link.target || '_blank';
  const rel = link.link.rel || (target === '_blank' ? 'noopener noreferrer' : undefined);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      title={link.link.title}
      className={styles.socialLink}
      {...storyblokEditable(blok)}
    >
      {blok.icon?.[0] && <StoryblokComponent blok={blok.icon[0]} className={styles.icon} />}
    </a>
  );
}
