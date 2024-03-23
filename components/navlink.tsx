'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import getCustomizableComponents from '@/utils/get-customizable-components';

interface NavlinkProps {
  href: string;
  children: React.ReactNode;
}

const {
  Default: Navlink,
  Box: NavlinkBox,
  BoxProvider: NavlinkBoxProvider,
} = getCustomizableComponents<NavlinkProps, React.HTMLProps<HTMLSpanElement>>({
  box:
    ({ href }) =>
    ({ children, ...props }) => {
      const pathname = usePathname();
      const [loading, setLoading] = React.useState(false);
      React.useEffect(() => {
        setLoading(false);
      }, [pathname]);
      const handleClick = () => pathname !== href && setLoading(true);
      return (
        <span
          {...props}
          className={clsx(
            '-:rounded-sm -:px-3 -:py-1 -:animation -:hover:bg-[rgb(var(--color-primary)/0.25)]',
            {
              '-:animate-pulse -:bg-[rgb(var(--color-primary)/0.1)]': loading,
            },
            props.className,
          )}
        >
          <Link href={href} onClick={handleClick}>
            {children}
          </Link>
        </span>
      );
    },
});
export { NavlinkBox, NavlinkBoxProvider };
export default Navlink;
