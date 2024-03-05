'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface NavlinkBoxContextType extends Omit<NavlinkProps, 'children'> {}

const NavlinkBoxContext = React.createContext<
  NavlinkBoxContextType | undefined
>(undefined);

interface NavlinkBoxProviderProps extends NavlinkProps {}

/**
 * This is the context provider for the `<Navlink />` component. It is used to provide props to it's children.
 * You can use this component along with `<NavlinkBox />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <NavlinkBoxProvider href={href}>
 *    <NavlinkBox className="w-full h-fit">
 *      {children}
 *    </NavlinkBox>
 *  </NavlinkBoxProvider>
 * )
 */
export const NavlinkBoxProvider: React.FC<NavlinkBoxProviderProps> = ({
  children,
  ...props
}) => (
  <NavlinkBoxContext.Provider value={props}>
    {children}
  </NavlinkBoxContext.Provider>
);

/**
 * This is a styled span element for the `<Navlink />` component.
 * You can use this component along with `<NavlinkBoxProvider />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <NavlinkBoxProvider href={href}>
 *    <NavlinkBox className="w-full h-fit">
 *      {children}
 *    </NavlinkBox>
 *  </NavlinkBoxProvider>
 * )
 */
export const NavlinkBox: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
  children,
  ...props
}) => {
  const context = React.useContext(NavlinkBoxContext);
  if (!context) {
    throw new Error('NavlinkBox must be used within a NavlinkProvider');
  }
  const { href } = context;
  const pathname = usePathname();
  React.useEffect(() => {
    setLoading(false);
  }, [pathname]);
  const [loading, setLoading] = React.useState(false);
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
};

interface NavlinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * This is the default `<Navlink />` component.
 * @component
 * @example
 * return (
 *  <Navlink href={href}>{name}</Navlink>
 * )
 */
const Navlink: React.FC<NavlinkProps> = ({ children, ...props }) => (
  <NavlinkBoxProvider {...props}>
    <NavlinkBox>{children}</NavlinkBox>
  </NavlinkBoxProvider>
);

export default Navlink;
