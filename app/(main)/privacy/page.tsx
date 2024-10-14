import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';

export default async function Page() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/privacy-policy.md',
  );
  const markdown = await res.text();
  return (
    <main>
      <section className="mx-auto flex w-full max-w-content-width items-stretch px-md">
        <div className="flex w-full flex-col items-center justify-between gap-xxl py-xxl">
          <div>
            <h1 className="pb-sm max-lg:text-h3-mobile lg:text-h3-desktop">
              Privacy Policy
            </h1>
          </div>
          <div>
            <article className="prose dark:prose-invert">
              <MDXRemote source={markdown} />
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
