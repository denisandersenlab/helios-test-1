'use client';

import { HomepageHeroStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import styles from './styles.module.scss';
import { ArrowIcon } from '@/icons/ArrowIcon';

export default function HomepageHero({ blok }: { blok: HomepageHeroStoryblok }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {blok.topLink?.[0] && (
          <StoryblokComponent blok={{ ...blok.topLink[0], text: '' }} className={styles.topLink}>
            {blok.topLinkIcon && (
              <StoryblokComponent blok={blok.topLinkIcon[0]} className={styles.topLinkIcon} />
            )}
            {blok.topLink[0].text}
            <ArrowIcon className={styles.arrowIcon} />
          </StoryblokComponent>
        )}
        {blok.title?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}
        {blok.text?.[0] && (
          <div className={styles.text}>
            <StoryblokComponent blok={blok.text[0]} />
          </div>
        )}
        <div className={styles.features}>
          {blok.features?.map((feature) => {
            return (
              <div className={styles.feature} key={feature._uid}>
                {feature.icon && (
                  <StoryblokComponent blok={feature.icon[0]} className={styles.icon} />
                )}
                <span>{feature.text}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.buttons}>
          {blok.buttons?.map((button) => {
            return <StoryblokComponent key={button._uid} blok={button} className={styles.button} />;
          })}
        </div>
      </div>
      {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}
    </div>
  );
}
