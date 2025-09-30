'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.css';

import type { StoryblokComponent as SBComponent } from '@/types/storyblok';
import { PageStoryblok } from '@/src/generated/sb';
import type { ISbStoryData } from 'storyblok';
import type { HeaderStoryblok, FooterStoryblok } from '@/src/generated/sb';

export default function Page({ blok }: { blok: PageStoryblok }) {
  return (
    <div {...storyblokEditable(blok)} className={styles.pageContainer}>
      {!!blok.header?.length && (
        <>
          {blok.header.map((headerItem, index) => {
            // Check if it's a resolved story object
            if (typeof headerItem !== 'string' && 'content' in headerItem) {
              const storyData = headerItem as ISbStoryData<HeaderStoryblok>;
              return (
                <StoryblokComponent
                  blok={storyData.content}
                  key={storyData.uuid || `header-${index}`}
                />
              );
            }
            // If it's still a string reference, it wasn't resolved
            console.warn('Header reference not resolved. Add "page.header" to resolveRelations.');
            return null;
          })}
        </>
      )}

      {blok.body?.map((nestedBlok: SBComponent) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}

      {!!blok.footer?.length && (
        <>
          {blok.footer.map((footerItem, index) => {
            // Check if it's a resolved story object
            if (typeof footerItem !== 'string' && 'content' in footerItem) {
              const storyData = footerItem as ISbStoryData<FooterStoryblok>;
              return (
                <StoryblokComponent
                  blok={storyData.content}
                  key={storyData.uuid || `footer-${index}`}
                />
              );
            }
            // If it's still a string reference, it wasn't resolved
            console.warn('Footer reference not resolved. Add "page.footer" to resolveRelations.');
            return null;
          })}
        </>
      )}
    </div>
  );
}
