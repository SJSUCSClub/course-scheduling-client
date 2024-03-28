import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Professors',
};

export default async function Page() {
  return (
    <main className="flex flex-col">
      professors
      <Link
        className="hover:text-secondary hover:underline"
        href="/professors/2"
      >
        Jahan Ghofraniha
      </Link>
    </main>
  );
}
