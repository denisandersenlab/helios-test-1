// Base types for Storyblok
export interface StoryblokStory {
  content: any;
  created_at: string;
  full_slug: string;
  group_id: string;
  id: number;
  is_startpage: boolean;
  name: string;
  parent_id: number;
  position: number;
  published_at: string;
  slug: string;
  sort_by_date: string | null;
  tag_list: string[];
  uuid: string;
  [key: string]: any;
}

export interface StoryblokAsset {
  alt?: string;
  copyright?: string;
  fieldtype?: string;
  filename: string;
  focus?: string;
  id: number;
  name?: string;
  title?: string;
}

export interface StoryblokLink {
  cached_url: string;
  fieldtype: 'multilink';
  id?: string;
  linktype: 'story' | 'asset' | 'url' | 'email';
  story?: {
    id: number;
    name: string;
    published: boolean;
    slug: string;
    uuid: string;
  };
  url?: string;
}

// Component base interface
export interface StoryblokComponent {
  _uid: string;
  component: string;
  _editable?: string;
  [key: string]: any;
}
