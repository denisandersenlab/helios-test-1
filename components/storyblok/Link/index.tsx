'use client';

import { storyblokEditable } from '@storyblok/react';
import NextLink from 'next/link';
import styles from './styles.module.css';

import type { LinkStoryblok } from '@/src/generated/sb';
import { ReactNode } from 'react';
import clsx from 'clsx';

type LinkProps = {
  blok: LinkStoryblok;
  className?: string;
  children?: ReactNode;
};

export default function Link({ blok, className, children }: LinkProps) {
  if (!blok.link) {
    return null;
  }

  const isInternalLink = blok.link.linktype === 'story';
  const href = blok.link.cached_url || blok.link.url || '#';
  const linkText = blok.text || '';

  if (isInternalLink) {
    return (
      <NextLink
        href={href}
        title={blok.link.title}
        {...storyblokEditable(blok)}
        className={clsx(styles.link, className)}
      >
        {children}
        {linkText}
      </NextLink>
    );
  }

  return (
    <a
      href={href}
      target={blok.link.target || '_self'}
      rel={blok.link.rel || (blok.link.target === '_blank' ? 'noopener noreferrer' : undefined)}
      title={blok.link.title}
      {...storyblokEditable(blok)}
      className={clsx(styles.link, className)}
    >
      {children}
      {linkText}
    </a>
  );
}
