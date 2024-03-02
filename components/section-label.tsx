import { InformationCircleIcon } from '@heroicons/react/24/outline';

import Button from '@/components/button';

interface SectionLabelProps {
  info: string;
  children: React.ReactNode;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ info, children }) => {
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
};

export default SectionLabel;
