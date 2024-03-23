'use client';

import clsx from 'clsx';
import React from 'react';

import getCustomizableComponents from '@/utils/get-customizable-components';

interface TagContextType {
  size: 'sm' | 'lg';
}

const TagContext = React.createContext<TagContextType | undefined>(undefined);

export const TagCount: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
  children,
  ...props
}) => {
  const context = React.useContext(TagContext);
  if (!context) {
    throw new Error('TagCount must be used within a Tag or TagBox');
  }
  const { size } = context;
  return (
    <span
      {...props}
      className={clsx(
        {
          'text-caption text-neutral': size === 'sm',
          'text-tag text-text': size === 'lg',
        },
        props.className,
      )}
    >
      {children}
    </span>
  );
};

interface TagProps {
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
    ({ size }) =>
    ({ children, ...props }) => (
      <TagContext.Provider value={{ size }}>
        <button
          {...props}
          className={clsx(
            '-:flex -:items-center -:gap-[5px] -:rounded-lg -:bg-border -:hover:opacity-50 -:active:opacity-25 -:disabled:hover:opacity-100',
            {
              '-:px-[20px] -:py-[10px] -:text-tag -:text-neutral':
                size === 'lg',
              '-:px-[15px] -:py-[5px] -:text-caption': size === 'sm',
            },
            props.className,
          )}
        >
          {children}
        </button>
      </TagContext.Provider>
    ),
  fallback: ({ children, ...props }) => (
    <button
      {...props}
      className={clsx(
        '-:flex -:gap-[5px] -:rounded-lg -:bg-border -:px-[20px] -:py-[10px] -:text-tag -:text-neutral -:hover:opacity-50 -:active:opacity-25 -:disabled:hover:opacity-100',
        props.className,
      )}
    >
      {children}
    </button>
  ),
});
export { TagBox, TagBoxProvider };
export default Tag;
