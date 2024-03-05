'use client';

import React from 'react';
import clsx from 'clsx';

import { EvaluationType } from '@/utils/types';
import Icon from '@/components/icon';

interface InfoCardBoxContextType extends InfoCardProps {}

const InfoCardBoxContext = React.createContext<
  InfoCardBoxContextType | undefined
>(undefined);

interface InfoCardBoxProviderProps extends InfoCardProps {
  children: React.ReactNode;
}

/**
 * This is the context provider for the `<InfoCard />` component. It is used to provide props to it's children.
 * You can use this component along with `<InfoCardBox />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <InfoCardBoxProvider type={type} icon={icon} title={title} subtitle={subtitle}>
 *    <InfoCardBox className="w-full h-fit" />
 *  </InfoCardBoxProvider>
 * )
 */
export const InfoCardBoxProvider: React.FC<InfoCardBoxProviderProps> = ({
  children,
  ...props
}) => (
  <InfoCardBoxContext.Provider value={props}>
    {children}
  </InfoCardBoxContext.Provider>
);

/**
 * This is a styled div element for the `<InfoCard />` component.
 * You can use this component along with `<InfoCardBoxProvider />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <InfoCardBoxProvider type={type} icon={icon} title={title} subtitle={subtitle}>
 *    <InfoCardBox className="w-full h-fit" />
 *  </InfoCardBoxProvider>
 */
export const InfoCardBox: React.FC<React.HTMLProps<HTMLDivElement>> = (
  props,
) => {
  const context = React.useContext(InfoCardBoxContext);
  if (!context) {
    throw new Error('InfoCardBox must be used within a InfoCardBoxProvider');
  }
  const { type, icon, title, subtitle } = context;
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
        '-:flex -:flex-1 -:items-center -:gap-[10px] -:rounded-lg -:p-[32px] -:opacity-75 -:default-border',
        {
          '-:bg-good': good,
          '-:bg-ok': ok,
          '-:bg-bad': bad,
          '-:bg-border': default_,
        },
        props.className,
      )}
    >
      <Icon
        icon={icon}
        h="45px"
        w="45px"
        className={clsx('text-text opacity-50 mix-blend-color-burn', {
          'opacity-50 mix-blend-color-burn': good,
          'opacity-75 mix-blend-color-burn': ok,
          'opacity-100 mix-blend-color-burn': bad,
          'opacity-100': default_,
        })}
      />
      <div
        className={clsx('text-text opacity-50 mix-blend-color-burn', {
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
};

interface InfoCardProps {
  type: EvaluationType | 'default';
  icon: React.ReactElement;
  title: string;
  subtitle: string;
}

/**
 * This is the default `<InfoCard />` component.
 * @component
 * @example
 * return (
 *  <InfoCard type={type} icon={icon} title={title} subtitle={subtitle} />
 * )
 */
const InfoCard: React.FC<InfoCardProps> = (props) => (
  <InfoCardBoxProvider {...props}>
    <InfoCardBox />
  </InfoCardBoxProvider>
);
export default InfoCard;
