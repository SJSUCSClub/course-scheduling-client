'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/button';
import Icon from '@/components/icon';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

const PageNotFound: React.FC = () => {
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
};

export default PageNotFound;
