import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Check the secret and next parameters
  if (secret !== process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN) {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  url.searchParams.delete('secret');
  url.searchParams.delete('slug');
  url.pathname = `/preview/${slug}`;

  return redirect(url.toString());
}
