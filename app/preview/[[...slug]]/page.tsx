import { getStoryblokApi } from '@storyblok/react/rsc';
import StoryblokStory from '@/components/StoryblokStory';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/links/', {
    version: 'draft',
  });

  const paths: { slug: string[] }[] = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }
    const slug = data.links[linkKey].slug;
    if (slug === 'home') {
      return;
    }
    const splittedSlug = slug.split('/');
    paths.push({ slug: splittedSlug });
  });

  return paths;
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? resolvedParams.slug.join('/') : 'home';

  const { data } = await fetchData(slug);

  if (!data.story) {
    notFound();
  }

  return (
    <main>
      <StoryblokStory story={data.story} />
    </main>
  );
}

async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${slug}`, {
    version: 'draft',
  });
}
