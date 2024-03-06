'use client';

import React from 'react';
import clsx from 'clsx';

import getCustomizableComponents from '@/utils/get-customizable-components';
import LoadingSpinner from '@/components/loading-spinner';
import Icon, { IconBox, IconBoxProvider } from '@/components/icon';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface ButtonProps {
  variant: ButtonVariant | React.ReactElement;
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const {
  Default: Button,
  Box: ButtonBox,
  BoxProvider: ButtonBoxProvider,
} = getCustomizableComponents<
  ButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>({
  box:
    ({ variant, prefix, postfix, onClick, loading, disabled }) =>
    ({ children, ...props }) => {
      const isIcon = React.isValidElement(variant);
      return (
        <button
          onClick={onClick}
          disabled={disabled || loading}
          {...props}
          className={clsx(
            '-:flex -:items-center -:justify-center -:gap-[5px] -:animation -:hover:opacity-50 -:active:opacity-25 -:disabled:text-neutral',
            {
              '-:h-fit -:rounded-lg -:bg-primary -:px-[20px] -:py-[7.5px] -:text-button -:text-background -:default-border -:disabled:bg-border':
                variant === 'primary',
              '-:h-fit -:rounded-lg -:bg-secondary -:px-[20px] -:py-[7.5px] -:text-button -:text-background -:default-border -:disabled:bg-border':
                variant === 'secondary',
              '-:h-fit  -:px-[20px] -:py-[7.5px] -:text-button -:text-primary':
                variant === 'tertiary',
              '-:h-fit -:rounded-lg -:border-2 -:border-primary -:px-[20px] -:py-[7.5px] -:text-button -:text-primary -:disabled:border-neutral':
                variant === 'ghost',
              '-:h-[30px] -:w-[30px] -:text-primary': isIcon,
            },
            props.className,
          )}
        >
          {loading ? (
            <div className="relative">
              <div className="opacity-0">{children}</div>
              <LoadingSpinner className="absolute top-0 flex h-full w-full items-center justify-center" />
            </div>
          ) : isIcon ? (
            <Icon icon={variant} w="30px" h="30px" />
          ) : (
            <>
              {prefix ? <Icon icon={prefix} w="16px" h="16px" /> : null}
              {children}
              {postfix ? (
                <IconBoxProvider icon={postfix} w="16px" h="16px">
                  <IconBox strokeWidth={3} />
                </IconBoxProvider>
              ) : null}
            </>
          )}
        </button>
      );
    },
  fallback: ({ children, ...props }) => (
    <button
      {...props}
      className={clsx(
        '-:flex -:h-fit -:items-center -:justify-center -:gap-[5px] -:rounded-lg -:bg-primary -:px-[20px] -:py-[7.5px] -:text-button -:text-background -:animation -:default-border -:hover:opacity-50 -:active:opacity-25 -:disabled:bg-border -:disabled:text-neutral',
        props.className,
      )}
    >
      {children}
    </button>
  ),
});
export { ButtonBox, ButtonBoxProvider };
export default Button;
