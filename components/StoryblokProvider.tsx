'use client';

import React from 'react';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import { COMPONENTS } from '@/components/storyblok';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  components: COMPONENTS,
  enableFallbackComponent: true,
  bridge: true,
  use: [apiPlugin],
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
