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

const Button: React.FC<ButtonProps> = ({
  variant,
  prefix,
  postfix,
  disabled,
  loading,
  children,
  ...props
}) => {
  const BaseButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
    props,
  ) => {
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
  };

  if (React.isValidElement(variant)) {
    return (
      <BaseButton
        {...props}
        className={`-:flex -:w-[30px] -:items-center -:justify-center -:text-primary -:animation -:hover:opacity-50 -:active:opacity-25 -:disabled:text-neutral -:h-[30px] ${props.className}`}
      >
        <Icon icon={variant} w="30px" h="30px" />
      </BaseButton>
    );
  }
  return (
    <BaseButton
      {...props}
      className={clsx(
        {
          '-:flex -:h-fit -:items-center -:justify-center -:gap-[5px] -:rounded-lg -:bg-primary -:px-[20px] -:py-[7.5px] -:text-button -:text-background -:animation -:default-border -:hover:opacity-50 -:active:opacity-25 -:disabled:bg-border -:disabled:text-neutral':
            variant === 'primary',
          '-:flex -:h-fit -:items-center -:justify-center -:gap-[5px] -:rounded-lg -:bg-secondary -:px-[20px] -:py-[7.5px] -:text-button -:text-background -:animation -:default-border -:hover:opacity-50 -:active:opacity-25 -:disabled:bg-border -:disabled:text-neutral':
            variant === 'secondary',
          '-:flex -:h-fit  -:items-center -:justify-center -:gap-[5px] -:px-[20px] -:py-[7.5px] -:text-button -:text-primary -:animation -:hover:opacity-50 -:active:opacity-25 -:disabled:text-neutral':
            variant === 'tertiary',
          '-:flex -:h-fit -:items-center -:justify-center -:gap-[5px] -:rounded-lg -:border-2 -:border-primary -:px-[20px] -:py-[7.5px] -:text-button -:text-primary -:animation -:hover:opacity-50 -:active:opacity-25 -:disabled:border-neutral -:disabled:text-neutral':
            variant === 'ghost',
        },
        props.className,
      )}
    >
      {prefix ? <Icon icon={prefix} w="16px" h="16px" /> : null}
      {children}
      {postfix ? (
        <Icon icon={postfix} w="16px" h="16px" strokeWidth={3} />
      ) : null}
    </BaseButton>
  );
};

export default Button;
