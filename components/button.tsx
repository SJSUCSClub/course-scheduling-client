import { twMerge } from 'tailwind-merge';
import React from 'react';
import clsx from 'clsx';

import LoadingSpinner from '@/components/loading-spinner';
import Icon from '@/components/icon';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  variant: ButtonVariant | React.ReactElement;
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  variant,
  prefix,
  postfix,
  disabled,
  loading,
  children,
  ...props
}: ButtonProps) {
  function BaseButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button {...props} disabled={disabled}>
        {loading ? (
          <div className="relative">
            <div className="opacity-0">{props.children}</div>
            <LoadingSpinner className="absolute top-0 flex h-full w-full items-center justify-center" />
          </div>
        ) : (
          props.children
        )}
      </button>
    );
  }

  if (React.isValidElement(variant)) {
    return (
      <BaseButton
        {...props}
        className={twMerge(
          'animation flex h-[30px] w-[30px] items-center justify-center text-primary hover:opacity-50 active:opacity-25 disabled:text-neutral',
          props.className,
        )}
      >
        <Icon icon={variant} w="30px" h="30px" />
      </BaseButton>
    );
  }
  return (
    <BaseButton
      {...props}
      className={twMerge(
        clsx(
          {
            'default-border animation flex h-fit items-center justify-center gap-[10px] rounded-lg bg-primary px-[20px] py-[5px] text-button text-background hover:opacity-50 active:opacity-25 disabled:bg-border disabled:text-neutral':
              variant === 'primary',
            'default-border animation flex h-fit items-center justify-center gap-[10px] rounded-lg bg-secondary px-[20px] py-[5px] text-button text-background hover:opacity-50 active:opacity-25 disabled:bg-border disabled:text-neutral':
              variant === 'secondary',
            'animation flex  h-fit items-center justify-center gap-[10px] px-[20px] py-[5px] text-button text-primary hover:opacity-50 active:opacity-25 disabled:text-neutral':
              variant === 'tertiary',
            'animation flex h-fit items-center justify-center gap-[10px] rounded-lg border-2 border-primary px-[20px] py-[5px] text-button text-primary hover:opacity-50 active:opacity-25 disabled:border-neutral disabled:text-neutral':
              variant === 'ghost',
          },
          props.className,
        ),
      )}
    >
      {prefix ? <Icon icon={prefix} w="14px" h="14px" /> : null}
      {children}
      {postfix ? <Icon icon={postfix} w="14px" h="14px" /> : null}
    </BaseButton>
  );
}
