import { BreadcrumbMenu } from '@/components/atoms';
import Link from 'next/link';

export default function Layout({
  statistics,
  schedules,
  reviews,
  params,
}: {
  statistics: React.ReactNode;
  schedules: React.ReactNode;
  reviews: React.ReactNode;
  params: { id: string };
}) {
  return (
    <main>
      <BreadcrumbMenu className="mx-auto w-full max-w-content-width px-md py-lg">
        <li>
          <Link href="/courses">Courses</Link>
        </li>
        <li>{params.id}</li>
      </BreadcrumbMenu>
      {statistics}
      {schedules}
      {reviews}
    </main>
  );
}
