'use client';

import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/icon';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';

export default function PageNotFound() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center gap-[20px] p-20 text-text">
      <div className="flex flex-col items-center gap-[8px]">
        <Icon icon={<FaceFrownIcon />} h="50px" w="50px" />
        <h2 className="text-title">404 Not Found</h2>
      </div>
      <p>Could not find the requested page.</p>
      <Button variant="tertiary" onClick={router.back}>
        Go Back
      </Button>
    </main>
  );
}
