import { Card } from '@/components/atoms';
import { cn } from '@/utils/cn';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'good' | 'ok' | 'bad';
  children?: React.ReactNode;
}

export const StatCard: React.FC<Props> = ({
  variant,
  children,
  className,
  ...props
}) => (
  <Card
    className={cn(
      'opacity-75 *:mix-blend-color-burn',
      {
        'bg-[rgb(var(--color-good)/0.75)] *:opacity-50': variant === 'good',
        'bg-[rgb(var(--color-ok)/0.75)] *:opacity-75': variant === 'ok',
        'bg-[rgb(var(--color-bad)/0.75)] *:opacity-100': variant === 'bad',
      },
      className,
    )}
    {...props}
  >
    {children}
  </Card>
);
