import { Metadata } from 'next';

import PageNotFound from '@/components/page-not-found';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return <PageNotFound />;
}
