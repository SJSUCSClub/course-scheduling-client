'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import getCustomizableComponents from '@/utils/get-customizable-components';

interface BreadcrumbProps {
  name?: string;
}

const {
  Default: Breadcrumb,
  Box: BreadcrumbBox,
  BoxProvider: BreadcrumbBoxProvider,
} = getCustomizableComponents<BreadcrumbProps, React.HTMLProps<HTMLDivElement>>(
  {
    box:
      ({ name }) =>
      ({ ...props }) => {
        const pathname = usePathname();
        const paths = pathname.substring(1).split('/');
        const breadcrumbs = paths.map((path, i) => {
          return {
            name:
              i === paths.length - 1 && name
                ? name
                : path.charAt(0).toUpperCase() + path.slice(1),
            href: `/${paths.slice(0, i + 1).join('/')}`,
          };
        });

        return (
          <nav aria-label="Breadcrumb" {...props}>
            <ul
              role="list"
              className="flex items-center space-x-4 text-body text-neutral"
            >
              {breadcrumbs.map((breadcrumb, i) => {
                const isCurrentPage = i === breadcrumbs.length - 1;
                return (
                  <li key={breadcrumb.name}>
                    <div className="flex items-center">
                      <Link
                        href={breadcrumb.href}
                        className={clsx({ 'text-text': isCurrentPage })}
                      >
                        {breadcrumb.name}
                      </Link>
                      {!isCurrentPage ? <span className="ml-4">/</span> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        );
      },
  },
);
export { BreadcrumbBox, BreadcrumbBoxProvider };
export default Breadcrumb;
