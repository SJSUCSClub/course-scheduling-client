'use client';

import React from 'react';
import clsx from 'clsx';

interface TagBoxContextType extends Omit<TagProps, 'children'> {}

const TagBoxContext = React.createContext<TagBoxContextType | undefined>(
  undefined,
);

interface TagBoxProviderProps extends TagProps {}

/**
 * This is the context provider for the `<Tag />` component. It is used to provide props to it's children.
 * You can use this component along with `<TagBox />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <TagBoxProvider size={size} count={count}>
 *    <TagBox className="w-full h-fit">
 *      {children}
 *    </TagBox>
 *  </TagBoxProvider>
 * )
 */
export const TagBoxProvider: React.FC<TagBoxProviderProps> = ({
  children,
  ...props
}) => <TagBoxContext.Provider value={props}>{children}</TagBoxContext.Provider>;

/**
 * This is a styled button element for the `<Tag />` component.
 * You can use this component along with `<TagBoxProvider />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <TagBoxProvider size={size} count={count}>
 *    <TagBox className="w-full h-fit">
 *      {children}
 *    </TagBox>
 *  </TagBoxProvider>
 * )
 */
export const TagBox: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  const context = React.useContext(TagBoxContext);
  if (!context) {
    throw new Error('TagBox must be used within a TagBoxProvider');
  }
  const { size, count } = context;
  return (
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
  );
};

interface TagProps {
  count?: number;
  size: 'sm' | 'lg';
  children: React.ReactNode;
}

/**
 * This is the default `<Tag />` component.
 * @component
 * @example
 * return (
 *  <Tag size={size} count={count}>
 *   {children}
 *  </Tag>
 * )
 */
const Tag: React.FC<TagProps> = ({ children, ...props }) => {
  return (
    <TagBoxProvider {...props}>
      <TagBox>{children}</TagBox>
    </TagBoxProvider>
  );
};

export default Tag;
