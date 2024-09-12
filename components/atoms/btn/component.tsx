import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  children?: React.ReactNode;
}

export const Btn: React.FC<Props> = ({
  variant,
  children,
  className,
  ...props
}) => (
  <button
    className={cn(
      'flex items-center gap-xs rounded-lg px-md py-sm animation focus:outline-none focus:ring-2 focus:ring-offset-2 enabled:hover:opacity-50 enabled:active:opacity-25 disabled:text-neutral',
      {
        'border-2 border-border bg-primary text-button text-background focus:ring-primary disabled:bg-border':
          variant === 'primary',
        'border-2 border-border bg-secondary text-button text-background focus:ring-secondary disabled:bg-border':
          variant === 'secondary',
        'text-button text-primary focus:ring-primary px-0': variant === 'tertiary',
        'border-2 border-primary text-button text-primary focus:ring-primary disabled:border-neutral':
          variant === 'ghost',
      },
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
