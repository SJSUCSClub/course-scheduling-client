import PaginationButtons from '@/components/pagination/pagination-buttons';

interface PaginationProps {
  query: string;
  token?: string;
}

const Pagination: React.FC<PaginationProps> = async ({ query, token }) => {
  // Replace this with real data
  const totalPages = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });

  return (
    <div className="flex w-full justify-center pt-5">
      <PaginationButtons totalPages={totalPages} />
    </div>
  );
};

export default Pagination;
