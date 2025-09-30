'use client';

import { StoryblokComponent, storyblokEditable, useStoryblokState } from '@storyblok/react';

import type { StoryblokStory as StoryType } from '@/types/storyblok';

export default function StoryblokStory({ story: initialStory }: { story: StoryType }) {
  const story = useStoryblokState(initialStory as any, {
    resolveRelations: ['page.header', 'page.footer'],
  });

  if (!story) {
    return null;
  }

  return (
    <div {...storyblokEditable(story as any)}>
      <StoryblokComponent blok={story.content} />
    </div>
  );
}
