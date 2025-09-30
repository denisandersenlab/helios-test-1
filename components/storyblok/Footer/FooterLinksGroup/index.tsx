'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './styles.module.scss';
import type { FooterLinksGroupStoryblok, FooterLinkStoryblok } from '@/src/generated/sb';

function FooterLink({ blok }: { blok: FooterLinkStoryblok }) {
  if (!blok.link?.[0]) {
    return null;
  }

  return (
    <div {...storyblokEditable(blok)} className={styles.footerLinkItem}>
      <StoryblokComponent blok={blok.link[0]} className={styles.link} />
    </div>
  );
}

function groupLinksByType(links: FooterLinkStoryblok[]) {
  const grouped: Record<string, FooterLinkStoryblok[]> = {};
  const ungrouped: FooterLinkStoryblok[] = [];

  links.forEach((link) => {
    if (link.groupingType) {
      if (!grouped[link.groupingType]) {
        grouped[link.groupingType] = [];
      }
      grouped[link.groupingType].push(link);
    } else {
      ungrouped.push(link);
    }
  });

  return { grouped, ungrouped };
}

export default function FooterLinksGroup({ blok }: { blok: FooterLinksGroupStoryblok }) {
  if (!blok.links?.length) {
    return (
      <div {...storyblokEditable(blok)} className={styles.linksGroup}>
        {blok.groupTitle && <h4 className={styles.groupTitle}>{blok.groupTitle}</h4>}
      </div>
    );
  }

  const { grouped, ungrouped } = groupLinksByType(blok.links);

  return (
    <div {...storyblokEditable(blok)} className={styles.linksGroup}>
      {blok.groupTitle && <h4 className={styles.groupTitle}>{blok.groupTitle}</h4>}

      {/* Render ungrouped links first */}
      {ungrouped.length > 0 && (
        <ul className={styles.linksList}>
          {ungrouped.map((link) => (
            <li key={link._uid}>
              <FooterLink blok={link} />
            </li>
          ))}
        </ul>
      )}

      {/* Render grouped links with their group titles */}
      {Object.entries(grouped).map(([groupType, groupLinks]) => (
        <div key={groupType} className={styles.linkSection}>
          <h5 className={styles.subGroupTitle}>{groupType}</h5>
          <ul className={styles.linksList}>
            {groupLinks.map((link) => (
              <li key={link._uid}>
                <FooterLink blok={link} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
