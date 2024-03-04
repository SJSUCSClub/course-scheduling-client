import { InformationCircleIcon } from '@heroicons/react/24/outline';

import Button from '@/components/button';
import Icon from '@/components/icon';

interface SectionLabelProps {
  info: string;
  children: React.ReactNode;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ info, children }) => {
  return (
    <div className="flex items-center gap-[5px] pt-[20px]">
      <h3>{children}</h3>
      {info ? (
        <Button variant="tertiary" className="h-[20px] w-[20px] p-0">
          <Icon
            icon={<InformationCircleIcon />}
            h="20px"
            w="20px"
            className="text-neutral"
          />
        </Button>
      ) : null}
    </div>
  );
};

export default SectionLabel;
