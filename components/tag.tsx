'use client';

import React from 'react';
import clsx from 'clsx';

import getCustomizableComponents from '@/utils/get-customizable-components';

interface TagProps {
  count?: number;
  size: 'sm' | 'lg';
  children: React.ReactNode;
}

const {
  Default: Tag,
  Box: TagBox,
  BoxProvider: TagBoxProvider,
} = getCustomizableComponents<
  TagProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>({
  box:
    ({ size, count }) =>
    ({ children, ...props }) => (
      <button
        {...props}
        className={clsx(
          '-:flex -:gap-[5px] -:rounded-lg -:bg-border -:hover:opacity-50 -:active:opacity-25',
          {
            '-:px-[20px] -:py-[10px] -:text-tag -:text-neutral': size === 'lg',
            '-:px-[15px] -:py-[5px] -:text-caption': size === 'sm',
          },
          props.className,
        )}
      >
        {children}
        {count ? (
          <span
            className={clsx({
              'text-caption text-neutral': size === 'sm',
              'text-tag text-text': size === 'lg',
            })}
          >
            {count}
          </span>
        ) : null}
      </button>
    ),
  fallback: ({ children, ...props }) => (
    <button
      {...props}
      className={clsx(
        '-:flex -:gap-[5px] -:rounded-lg -:bg-border -:px-[20px] -:py-[10px] -:text-tag -:text-neutral -:hover:opacity-50 -:active:opacity-25',
        props.className,
      )}
    >
      {children}
    </button>
  ),
});
export { TagBox, TagBoxProvider };
export default Tag;
