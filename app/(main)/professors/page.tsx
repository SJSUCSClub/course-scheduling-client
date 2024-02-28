import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professors',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return <main className="">professors</main>;
}
