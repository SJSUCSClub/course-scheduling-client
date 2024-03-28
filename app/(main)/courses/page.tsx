import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Courses',
};

export default async function Page() {
  return (
    <main className="flex flex-col">
      courses
      <Link
        className="hover:text-secondary hover:underline"
        href="/courses/cmpe130"
      >
        CMPE130
      </Link>
    </main>
  );
}
