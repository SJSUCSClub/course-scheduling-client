'use client';

import React from 'react';
import clsx from 'clsx';

import getCustomizableComponents from '@/utils/get-customizable-components';
import { EvaluationType } from '@/utils/types';
import { IconBox, IconBoxProvider } from '@/components/icon';

interface InfoCardProps {
  type: EvaluationType | 'default';
  icon: React.ReactElement;
  title: string;
  subtitle: string;
}

const {
  Default: InfoCard,
  Box: InfoCardBox,
  BoxProvider: InfoCardBoxProvider,
} = getCustomizableComponents<InfoCardProps, React.HTMLProps<HTMLDivElement>>({
  box:
    ({ type, icon, title, subtitle }) =>
    ({ children, ...props }) => {
      const [good, ok, bad, default_] = [
        type === 'good',
        type === 'ok',
        type === 'bad',
        type === 'default',
      ];
      return (
        <div
          {...props}
          className={clsx(
            '-:flex -:flex-1 -:items-center -:gap-[10px] -:rounded-lg -:p-[32px] -:default-border',
            {
              '-:bg-[rgb(var(--color-good)/0.75)] -:opacity-75': good,
              '-:bg-[rgb(var(--color-ok)/0.75)] -:opacity-75': ok,
              '-:bg-[rgb(var(--color-bad)/0.75)] -:opacity-75': bad,
              '-:bg-border': default_,
            },
            props.className,
          )}
        >
          <IconBoxProvider icon={icon} h="45px" w="45px">
            <IconBox
              className={clsx('text-text', {
                'opacity-50 mix-blend-color-burn': good,
                'opacity-75 mix-blend-color-burn': ok,
                'opacity-100 mix-blend-color-burn': bad,
                'opacity-100': default_,
              })}
            />
          </IconBoxProvider>
          <div
            className={clsx('text-text', {
              'opacity-50 mix-blend-color-burn': good,
              'opacity-75 mix-blend-color-burn': ok,
              'opacity-100 mix-blend-color-burn': bad,
              'opacity-100': default_,
            })}
          >
            <h3 className="text-title">{title}</h3>
            <p className="text-body">{subtitle}</p>
          </div>
        </div>
      );
    },
  fallback: ({ children, ...props }) => (
    <div
      {...props}
      className={clsx(
        '-:flex -:flex-1 -:items-center -:gap-[10px] -:rounded-lg -:bg-border -:p-[32px] -:opacity-75 -:default-border',
        props.className,
      )}
    >
      {children}
    </div>
  ),
});
export { InfoCardBox, InfoCardBoxProvider };
export default InfoCard;
