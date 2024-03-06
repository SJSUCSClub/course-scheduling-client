import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { ButtonBoxProvider, ButtonBox } from '@/components/button';
import { IconBox, IconBoxProvider } from '@/components/icon';

interface SectionLabelProps {
  info: string;
  children: React.ReactNode;
}

/**
 * This is a label for a section of a page.
 * You can use this component to display a label for a section of a page.
 * @component
 * @example
 * return (
 *  <SectionLabel info="This is a section label">
 *    Section Label
 *  </SectionLabel>
 * )
 */
const SectionLabel: React.FC<SectionLabelProps> = ({ info, children }) => {
  return (
    <div className="flex items-center gap-[5px] pt-[20px]">
      <h3>{children}</h3>
      {info ? (
        <ButtonBoxProvider variant="tertiary">
          <ButtonBox className="h-[20px] w-[20px] p-0">
            <IconBoxProvider icon={<InformationCircleIcon />} h="20px" w="20px">
              <IconBox className="text-neutral" />
            </IconBoxProvider>
          </ButtonBox>
        </ButtonBoxProvider>
      ) : null}
    </div>
  );
};

export default SectionLabel;
