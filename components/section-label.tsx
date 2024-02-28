import { InformationCircleIcon } from '@heroicons/react/24/outline';

import Button from '@/components/button';

export default function SectionLabel({
  info,
  children,
}: {
  info: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-[5px] pt-[20px]">
      <h3>{children}</h3>
      {info ? (
        <Button
          variant={<InformationCircleIcon />}
          className="h-[20px] w-[20px] text-neutral"
        />
      ) : null}
    </div>
  );
}
