'use client';

import { useState, useCallback, useEffect } from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { MOBILE_BREAKPOINT } from '@/src/utils/constants';

import type { HeaderStoryblok } from '@/src/generated/sb';

export default function Header({ blok }: { blok: HeaderStoryblok }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenuId, setActiveMobileSubmenuId] = useState<string | null>(null);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setActiveMobileSubmenuId(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileSubmenuId(null);
  }, [isMobileMenuOpen]);

  const handleMobileSubmenuToggle = useCallback(
    (linkId: string) => {
      setActiveMobileSubmenuId(activeMobileSubmenuId === linkId ? null : linkId);
    },
    [activeMobileSubmenuId],
  );

  return (
    <>
      <header
        className={clsx(styles.header, isMobileMenuOpen && styles.menuOpen)}
        {...storyblokEditable(blok)}
      >
        <div className={styles.leftContainer}>
          {!!blok.logo?.length && (
            <div className={styles.logo}>
              {blok.logo.map((logoBlok) => (
                <StoryblokComponent blok={logoBlok} key={logoBlok._uid} />
              ))}
            </div>
          )}

          {!!blok.links?.length && (
            <nav className={styles.navigation}>
              {blok.links.map((linkBlok) => (
                <StoryblokComponent blok={linkBlok} key={linkBlok._uid} />
              ))}
            </nav>
          )}
        </div>

        {!!blok.buttons?.length && (
          <div className={styles.actions}>
            {blok.buttons.map((buttonBlok) => (
              <StoryblokComponent blok={buttonBlok} key={buttonBlok._uid} />
            ))}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={styles.hamburgerIcon}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={clsx(styles.mobileMenu, isMobileMenuOpen && styles.open)}>
        <div className={styles.mobileMenuHeader}>
          {!!blok.logo?.length && (
            <div className={styles.mobileLogo}>
              {blok.logo.map((logoBlok) => (
                <StoryblokComponent blok={logoBlok} key={logoBlok._uid} />
              ))}
            </div>
          )}
          <button
            className={styles.mobileMenuClose}
            onClick={toggleMobileMenu}
            aria-label="Close mobile menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNavigation}>
          {blok.links &&
            blok.links.map((linkBlok) => (
              <StoryblokComponent
                blok={linkBlok}
                key={linkBlok._uid}
                isMobile={true}
                isSubmenuOpen={activeMobileSubmenuId === linkBlok._uid}
                onMobileSubmenuToggle={() => handleMobileSubmenuToggle(linkBlok._uid)}
              />
            ))}
        </nav>

        {!!blok.buttons?.length && (
          <div className={styles.mobileActions}>
            {blok.buttons.map((buttonBlok) => (
              <StoryblokComponent blok={buttonBlok} key={buttonBlok._uid} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className={styles.mobileMenuOverlay} onClick={toggleMobileMenu} />}
    </>
  );
}
