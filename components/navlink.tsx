'use client';

import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface NavlinkProps extends React.HTMLProps<HTMLSpanElement> {
  href: string;
}

const Navlink: React.FC<NavlinkProps> = ({ href, children, ...props }) => {
  const pathname = usePathname();
  React.useEffect(() => {
    setLoading(false);
  }, [pathname]);
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => pathname !== href && setLoading(true);
  return (
    <span
      {...props}
      className={twMerge(
        clsx(
          'rounded-sm px-3 py-1 animation hover:bg-[rgb(var(--color-primary)/0.25)]',
          {
            'animate-pulse bg-[rgb(var(--color-primary)/0.1)]': loading,
          },
        ),
        props.className,
      )}
    >
      <Link href={href} onClick={handleClick}>
        {children}
      </Link>
    </span>
  );
};

export default Navlink;
