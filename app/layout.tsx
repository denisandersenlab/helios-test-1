import type { Metadata } from 'next';
import { Rubik, Inter } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import StoryblokProvider from '@/components/StoryblokProvider';
import { COMPONENTS } from '@/components/storyblok';
import localFont from 'next/font/local';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const visualSans = localFont({
  src: '../public/fonts/WF_visual_sans_semibold.ttf',
  variable: '--font-visual-sans',
});

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: COMPONENTS,
});

export const metadata: Metadata = {
  title: 'Next.js + Storyblok + Tailwind',
  description: 'A modern web application built with Next.js, Storyblok CMS, and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${inter.variable} ${visualSans.variable} ${styles.body}`}>
        <StoryblokProvider>{children}</StoryblokProvider>
      </body>
    </html>
  );
}
