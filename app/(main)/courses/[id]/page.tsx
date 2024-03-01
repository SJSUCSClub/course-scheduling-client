import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  return {
    title: params.id,
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    notFound();
  }

  return <main className="">course: {id}</main>;
}
