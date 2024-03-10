'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import getCustomizableComponents from '@/utils/get-customizable-components';
import { ButtonBoxProvider, ButtonBox } from '@/components/button';
import { IconBox, IconBoxProvider } from '@/components/icon';

interface SectionLabelProps {
  info: string;
  children: React.ReactNode;
}

const {
  Default: SectionLabel,
  Box: SectionLabelBox,
  BoxProvider: SectionLabelBoxProvider,
} = getCustomizableComponents<
  SectionLabelProps,
  React.HTMLProps<HTMLDivElement>
>({
  box:
    ({ info }) =>
    ({ children, ...props }) => (
      <div
        className={clsx(
          '-:flex -:items-center -:gap-[5px] -:pt-[20px]',
          props.className,
        )}
      >
        <h3>{children}</h3>
        {info ? (
          <ButtonBoxProvider variant="tertiary">
            <ButtonBox className="h-[20px] w-[20px] p-0">
              <IconBoxProvider
                icon={<InformationCircleIcon />}
                h="20px"
                w="20px"
              >
                <IconBox className="text-neutral" />
              </IconBoxProvider>
            </ButtonBox>
          </ButtonBoxProvider>
        ) : null}
      </div>
    ),
  fallback: ({ children, ...props }) => (
    <div
      className={clsx(
        '-:flex -:items-center -:gap-[5px] -:pt-[20px]',
        props.className,
      )}
    >
      <h3>{children}</h3>
    </div>
  ),
});
export { SectionLabelBox, SectionLabelBoxProvider };
export default SectionLabel;
