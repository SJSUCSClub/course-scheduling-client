'use client';

import React from 'react';
import clsx from 'clsx';

import LoadingSpinner from '@/components/loading-spinner';
import Icon from '@/components/icon';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface ButtonBoxContextType extends Omit<ButtonProps, 'children'> {}

const ButtonBoxContext = React.createContext<ButtonBoxContextType | undefined>(
  undefined,
);

interface ButtonBoxProviderProps extends ButtonProps {}

/**
 * This is the context provider for the `<Button />` component. It is used to provide props to it's children.
 * You can use this component along with `<ButtonBox />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <ButtonBoxProvider variant={variant} prefix={prefix} postfix={postfix} loading={loading} disabled={disabled}>
 *    <ButtonBox className="w-full h-fit">
 *      {children}
 *    </ButtonBox>
 *  </ButtonBoxProvider>
 * )
 */
export const ButtonBoxProvider: React.FC<ButtonBoxProviderProps> = ({
  children,
  ...props
}) => (
  <ButtonBoxContext.Provider value={props}>
    {children}
  </ButtonBoxContext.Provider>
);

/**
 * This is a styled button element for the `<Button />` component.
 * You can use this component along with `<ButtonBoxProvider />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <ButtonBoxProvider variant={variant} prefix={prefix} postfix={postfix} loading={loading} disabled={disabled}>
 *    <ButtonBox className="w-full h-fit">
 *      {children}
 *    </ButtonBox>
 *  </ButtonBoxProvider>
 * )
 */
export const ButtonBox: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  const context = React.useContext(ButtonBoxContext);
  if (!context) {
    throw new Error('ButtonBox must be used within a ButtonBoxProvider');
  }
  const { variant, prefix, postfix, onClick, loading, disabled } = context;
  const isIcon = React.isValidElement(variant);
  return (
    <button
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
      ) : React.isValidElement(variant) ? (
        <Icon icon={variant} w="30px" h="30px" />
      ) : (
        <>
          {prefix ? <Icon icon={prefix} w="16px" h="16px" /> : null}
          {children}
          {postfix ? (
            <Icon icon={postfix} w="16px" h="16px" strokeWidth={3} />
          ) : null}
        </>
      )}
    </button>
  );
};

interface ButtonProps {
  variant: ButtonVariant | React.ReactElement;
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * This is the default `<Button />` component.
 * @component
 * @example
 * return (
 *  <Button variant={variant} prefix={prefix} postfix={postfix} loading={loading} disabled={disabled}>
 *    {children}
 *  </Button>
 * )
 */
const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <ButtonBoxProvider {...props}>
    <ButtonBox>{children}</ButtonBox>
  </ButtonBoxProvider>
);

export default Button;
