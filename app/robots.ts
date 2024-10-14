import type { MetadataRoute } from 'next';
import { generateSitemaps as generateCoursesSitemaps } from '@/app/(main)/courses/sitemap';
import { generateSitemaps as generateProfessorsSitemaps } from '@/app/(main)/professors/sitemap';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const coursesSitemaps = (await generateCoursesSitemaps()).map(
    (_, index) => `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${index}.xml`,
  );
  const professorsSitemaps = (await generateProfessorsSitemaps()).map(
    (_, index) => `${process.env.NEXT_PUBLIC_BASE_URL}/professors/${index}.xml`,
  );
  const bridgeSitemaps = coursesSitemaps.concat(professorsSitemaps);

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/profile',
    },
    sitemap: [`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`].concat(
      bridgeSitemaps,
    ),
  };
}
