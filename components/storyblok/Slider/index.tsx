'use client';

import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Scrollbar, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import clsx from 'clsx';
import { SliderStoryblok } from '@/src/generated/sb';
import { StoryblokComponent } from '@storyblok/react';
import { LAPTOP_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/src/utils/constants';
import { ChevronLinkIcon } from '@/icons/ChevronLinkIcon';
import styles from './styles.module.scss';

type SliderProps = {
  blok: SliderStoryblok;
};

export default function Slider({ blok }: SliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isEnd, setIsEnd] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const slides = blok.slides || [];
  const hasImage = Boolean(slides?.[0]?.image?.length);

  const getPageCount = (slideCount: number, slidesPerView: number | string | undefined) => {
    if (typeof slidesPerView !== 'number') return 0;
    return Math.ceil(slideCount - slidesPerView + 1);
  };

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
      className={styles.container}
    >
      {blok.topText?.[0] && (
        <div className={styles.topText}>
          <StoryblokComponent blok={{ ...blok.topText[0], text: '' }}>
            {blok.topText[0].text}
          </StoryblokComponent>
        </div>
      )}
      <div className={styles.headBlock}>
        {blok.title?.[0] && (
          <div className={styles.title}>
            <StoryblokComponent blok={blok.title[0]} />
          </div>
        )}
        <div className={styles.arrows}>
          <div
            className={clsx('swiperButtonPrev', {
              ['swiperButtonDisabled']: activeSlideIndex === 0,
            })}
          >
            <ChevronLinkIcon />
          </div>
          <div
            className={clsx('swiperButtonNext', {
              ['swiperButtonDisabled']: isEnd,
            })}
          >
            <ChevronLinkIcon />
          </div>
        </div>
      </div>

      <Swiper
        spaceBetween={28}
        slidesPerView={2.3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          [TABLET_BREAKPOINT + 1]: {
            slidesPerView: 1.5,
          },
          [LAPTOP_BREAKPOINT + 1]: {
            slidesPerView: 2.3,
          },
        }}
        modules={[Autoplay, EffectCoverflow, Scrollbar, Navigation]}
        navigation={{
          nextEl: '.swiperButtonNext',
          prevEl: '.swiperButtonPrev',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setPageCount(getPageCount(swiper.slides.length, swiper.params.slidesPerView));
        }}
        onSlideChange={(swiper) => {
          setActiveSlideIndex(swiper.activeIndex);
          setIsEnd(swiper.isEnd);
        }}
        className={styles.swiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._uid} className={styles.swiperSlide}>
            {hasImage ? (
              <div className={styles.imageSlide}>
                {slide.title?.[0] && (
                  <div className={styles.imageSlideTitle}>
                    <span className={styles.slideNumber}>{index + 1}</span>
                    <StoryblokComponent blok={slide.title[0]} />
                  </div>
                )}
                <div className={styles.imageSlideContent}>
                  {slide.text?.[0] && (
                    <div className={styles.imageSlideText}>
                      <StoryblokComponent blok={slide.text[0]} />
                    </div>
                  )}
                  {slide.image?.[0] && (
                    <div className={styles.slideImage}>
                      <StoryblokComponent blok={slide.image[0]} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.textSlide}>
                <span className={styles.textSlideStep}>
                  <span>Step</span>
                  <span>{index + 1}</span>
                </span>
                <div>
                  {slide.title?.[0] && (
                    <div className={styles.textSlideTitle}>
                      <StoryblokComponent blok={slide.title[0]} />
                    </div>
                  )}
                  {slide.text?.[0] && (
                    <div className={styles.textSlideDescription}>
                      <StoryblokComponent blok={slide.text[0]} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.paginationWrapper}>
        <div className={styles.pagination}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <span
              key={index}
              className={clsx(styles.dot, {
                [styles.activeDot]: index === activeSlideIndex,
                [styles.dotWithoutImage]: !hasImage,
                [styles.activeDotWithoutImage]: !hasImage,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
