'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { QuotesSliderStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import { ChevronLinkIcon } from '@/icons/ChevronLinkIcon';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';
import styles from './styles.module.scss';

type QuotesSliderProps = {
  blok: QuotesSliderStoryblok;
};

export default function QuotesSlider({ blok }: QuotesSliderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const slides = blok.slides || [];

  const nextSlide = () =>
    setActiveSlideIndex((index) => (index < slides.length - 1 ? index + 1 : index));
  const prevSlide = () => setActiveSlideIndex((index) => (index > 0 ? index - 1 : index));

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      style={{ marginBottom: `${isMobile ? blok.marginBottomMobile : blok.marginBottom}px` }}
      className={styles.mainContainer}
    >
      <div className={styles.container}>
        {blok.title?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}
        <div className={styles.content}>
          {blok.image?.[0] && <StoryblokComponent blok={blok.image[0]} className={styles.image} />}

          <div className={styles.slider}>
            <div
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide._uid} className={styles.slide}>
                  <div className={styles.quote}>
                    <p className={styles.quoteMark}>“</p>
                    {slide.quote?.map((quote) => (
                      <div key={quote._uid} className={styles.quoteText}>
                        <StoryblokComponent blok={quote} />
                      </div>
                    ))}
                    <p className={styles.quoteMark}>”</p>
                  </div>

                  <div>
                    {slide.logo?.[0] && (
                      <StoryblokComponent blok={slide.logo[0]} className={styles.slideLogo} />
                    )}
                    <p className={styles.position}>{slide.position}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              <div className={styles.progress}>
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={clsx(styles.dot, {
                      [styles.activeDot]: index === activeSlideIndex,
                    })}
                  />
                ))}
              </div>

              <div className={styles.arrows}>
                <button
                  onClick={prevSlide}
                  className={styles.arrow}
                  disabled={activeSlideIndex === 0}
                >
                  <ChevronLinkIcon />
                </button>
                <button
                  onClick={nextSlide}
                  className={styles.arrow}
                  disabled={activeSlideIndex === slides.length - 1}
                >
                  <ChevronLinkIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        {blok.bottomText?.[0] && (
          <div className={styles.bottomText}>
            <StoryblokComponent blok={blok.bottomText[0]} />
          </div>
        )}
        <div className={styles.logos}>
          {blok.logos?.map((logo) => (
            <StoryblokComponent key={logo._uid} blok={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
