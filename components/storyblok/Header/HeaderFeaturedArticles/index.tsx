'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';

import type { HeaderFeaturedArticlesStoryblok } from '@/src/generated/sb';

export default function HeaderFeaturedArticles({
  blok,
}: {
  blok: HeaderFeaturedArticlesStoryblok;
}) {
  return (
    <div className={styles.headerFeaturedArticles} {...storyblokEditable(blok)}>
      {blok.title && <h3 className={styles.title}>{blok.title}</h3>}

      {!!blok.articles?.length && (
        <div className={styles.articles}>
          {blok.articles.map((article, index) => (
            <div key={index} className={styles.article}>
              {/* Article content will be rendered here based on the article structure */}
              {JSON.stringify(article)}
            </div>
          ))}
        </div>
      )}

      {!!blok.link?.length && (
        <div className={styles.link}>
          {blok.link.map((linkBlok) => (
            <StoryblokComponent blok={linkBlok} key={linkBlok._uid} />
          ))}
        </div>
      )}
    </div>
  );
}
