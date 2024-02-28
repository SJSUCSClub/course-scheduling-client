import PageNotFound from '@/components/page-not-found';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return <PageNotFound />;
}
