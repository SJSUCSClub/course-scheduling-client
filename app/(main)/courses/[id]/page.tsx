import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: params.id,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    notFound();
  }

  return <main className="">course: {id}</main>;
}
