'use client';

import { storyblokEditable, StoryblokRichText } from '@storyblok/react';
import styles from './styles.module.css';
import type { RichtextContentStoryblok } from '@/src/generated/sb';

export default function Richtext({ blok }: { blok: RichtextContentStoryblok }) {
  if (!blok.content) {
    return null;
  }

  // Cast to any to handle type mismatch between generated types and SDK types
  return (
    <div className={styles.richtext}>
      <StoryblokRichText {...storyblokEditable(blok)} doc={blok.content as any} />
    </div>
  );
}
