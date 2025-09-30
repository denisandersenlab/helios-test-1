'use client';

import { storyblokEditable } from '@storyblok/react';
import Link from 'next/link';
import styles from './styles.module.css';

import type { ButtonStoryblok } from '@/src/generated/sb';
import { PlayIcon } from '@/icons/PlayIcon';
import clsx from 'clsx';
import { ChevronLinkIcon } from '@/icons/ChevronLinkIcon';

function getLinkClasses(variant?: string): string {
  switch (variant) {
    case 'primary':
      return styles.buttonPrimary;
    // Add more variants here as needed
    case 'secondary':
      return styles.buttonSecondary;
    case 'arrow':
      return styles.buttonArrow;
    default:
      return '';
  }
}

type ButtonProps = {
  blok: ButtonStoryblok;
  className?: string;
};

export default function Button({ blok, className }: ButtonProps) {
  if (!blok.link) {
    return null;
  }

  const isInternalLink = blok.link.linktype === 'story';
  const href = blok.link.cached_url || blok.link.url || '#';

  const linkClasses = clsx(getLinkClasses(blok.variant), className);
  const linkContent = blok.text || 'Link';

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className={linkClasses}
        title={blok.link.title}
        {...storyblokEditable(blok)}
      >
        {blok.variant === 'secondary' && (
          <div className={styles.iconWrapper}>
            <PlayIcon />
          </div>
        )}
        {linkContent}
        {blok.variant === 'arrow' && <ChevronLinkIcon />}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={blok.link.target || '_self'}
      rel={blok.link.rel || (blok.link.target === '_blank' ? 'noopener noreferrer' : undefined)}
      className={linkClasses}
      title={blok.link.title}
      {...storyblokEditable(blok)}
    >
      {linkContent}
    </a>
  );
}
