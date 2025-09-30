'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import type { FooterStoryblok } from '@/src/generated/sb';
import { distributeGroupsIntoColumns, getMaxColumnsForBreakpoint } from './functions';

export default function Footer({ blok }: { blok: FooterStoryblok }) {
  const [maxColumns, setMaxColumns] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setMaxColumns(getMaxColumnsForBreakpoint());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columnizedGroups = useMemo(
    () =>
      blok.linksGroups?.length ? distributeGroupsIntoColumns(blok.linksGroups, maxColumns) : [],
    [blok.linksGroups, maxColumns],
  );

  return (
    <footer {...storyblokEditable(blok)} className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.mainColumn}>
            {blok.logo?.[0] && (
              <div className={styles.logo}>
                <StoryblokComponent blok={blok.logo[0]} />
              </div>
            )}
            {blok.logoSubText && <p className={styles.logoSubText}>{blok.logoSubText}</p>}
            {blok.mainColumnLinksTitle && (
              <h3 className={styles.linksTitle}>{blok.mainColumnLinksTitle}</h3>
            )}
            {!!blok.mainColumnLinksPrimary?.length && (
              <div className={styles.linksPrimary}>
                {blok.mainColumnLinksPrimary.map((link) => (
                  <StoryblokComponent key={link._uid} blok={link} className={styles.footerLink} />
                ))}
              </div>
            )}
            {!!blok.mainColumnLinksSecondary?.length && (
              <div className={styles.linksSecondary}>
                {blok.mainColumnLinksSecondary.map((link) => (
                  <StoryblokComponent key={link._uid} blok={link} className={styles.footerLink} />
                ))}
              </div>
            )}
            {blok.emailInput?.[0] && <StoryblokComponent blok={blok.emailInput[0]} />}
            {!!blok.socials?.length && (
              <div className={styles.socials}>
                {blok.socials.map((social) => (
                  <StoryblokComponent key={social._uid} blok={social} />
                ))}
              </div>
            )}
          </div>

          {!!columnizedGroups?.length && (
            <div className={styles.linksGroupsSection}>
              {columnizedGroups.map((column, columnIndex) => (
                <div key={columnIndex} className={styles.linksColumn}>
                  {column.map((group) => (
                    <StoryblokComponent key={group._uid} blok={group} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.bottomSection}>
          {!!blok.sertificates?.length && (
            <div className={styles.certificates}>
              {blok.sertificates.map((cert) => (
                <StoryblokComponent key={cert._uid} blok={cert} className={styles.certificate} />
              ))}
            </div>
          )}

          {!!blok.settingsLinks?.length && (
            <div className={styles.settingsLinks}>
              {blok.settingsLinks.map((link) => (
                <StoryblokComponent key={link._uid} blok={link} className={styles.settingsLink} />
              ))}
            </div>
          )}
        </div>
      </div>

      {blok.copyright && <p className={styles.copyright}>{blok.copyright}</p>}
    </footer>
  );
}
