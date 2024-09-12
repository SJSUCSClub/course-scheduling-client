import Link from 'next/link';

import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface Props extends React.ComponentProps<typeof Link> {
  variant: Variant;
  children?: React.ReactNode;
}

export const LinkBtn: React.FC<Props> = ({
  variant,
  children,
  className,
  ...props
}) => (
  <Link
    className={cn(
      'flex items-center gap-xs rounded-lg px-md py-sm animation hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 active:opacity-25',
      {
        'border-2 border-border bg-primary text-button text-background focus:ring-primary':
          variant === 'primary',
        'border-2 border-border bg-secondary text-button text-background focus:ring-secondary':
          variant === 'secondary',
        'px-0 text-button text-primary focus:ring-primary':
          variant === 'tertiary',
        'border-2 border-primary text-button text-primary focus:ring-primary':
          variant === 'ghost',
      },

      className,
    )}
    {...props}
  >
    {children}
  </Link>
);
