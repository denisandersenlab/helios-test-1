'use client';

import {
  BlockTypes,
  storyblokEditable,
  StoryblokRichText,
} from '@storyblok/react';
import styles from './styles.module.scss';
import type { TitleStoryblok } from '@/src/generated/sb';

const titleStyles = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
  default: styles.default,
};

const titleResolver = {
  [BlockTypes.HEADING]: (node: any) => {
    const level = node.attrs?.level || 1;
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const className = titleStyles[Tag as keyof typeof titleStyles] || titleStyles.default;

    return <Tag className={className}>{node.children}</Tag>;
  },
};

export default function Title({ blok }: { blok: TitleStoryblok }) {
  if (!blok.content) {
    return null;
  }

  // Cast to any to handle type mismatch between generated types and SDK types
  return (
    <StoryblokRichText {...storyblokEditable(blok)} doc={blok.content as any} resolvers={titleResolver as any} />
  );
}
