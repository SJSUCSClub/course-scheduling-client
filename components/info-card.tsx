import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

import Icon from '@/components/icon';

interface InfoCardProps extends React.HTMLProps<HTMLDivElement> {
  type: 'good' | 'ok' | 'bad' | 'default';
  icon: React.ReactElement;
  title: string;
  subtitle: string;
}

export default function InfoCard({
  type = 'default',
  icon,
  title,
  subtitle,
  ...props
}: InfoCardProps) {
  const [good, ok, bad, default_] = [
    type === 'good',
    type === 'ok',
    type === 'bad',
    type === 'default',
  ];
  return (
    <div
      {...props}
      className={twMerge(
        clsx(
          'flex flex-1 items-center gap-[10px] rounded-lg p-[32px] opacity-75 default-border',
          {
            'bg-good': good,
            'bg-ok': ok,
            'bg-bad': bad,
            'bg-border': default_,
          },
        ),
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
}
