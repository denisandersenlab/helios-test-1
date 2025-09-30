'use client';

import { HeroStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import BreadcrumbArrow from './BreadcrumbArrow';

export default function Hero({ blok }: { blok: HeroStoryblok }) {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: blok.backgroundImage?.[0]?.asset?.filename
          ? `url(${blok.backgroundImage[0].asset.filename})`
          : undefined,
      }}
    >
      <div className={styles.content}>
        {!!blok.breadcrumbs?.length && (
          <div className={styles.breadcrumbs}>
            {blok.breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === blok.breadcrumbs!.length - 1;
              return (
                <span
                  key={breadcrumb._uid}
                  className={clsx(styles.breadcrumbItem, { [styles.lastItem]: isLast })}
                >
                  <StoryblokComponent blok={breadcrumb} />
                  {!isLast && <BreadcrumbArrow className={styles.separator} />}
                </span>
              );
            })}
          </div>
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

        {!!blok.buttons?.length && (
          <div className={styles.buttons}>
            {blok.buttons.map((button) => (
              <>
                {button.variant === 'secondary' ? (
                  <StoryblokComponent
                    key={button._uid}
                    blok={button}
                    className={styles.secondaryButton}
                  />
                ) : (
                  <StoryblokComponent key={button._uid} blok={button} />
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
