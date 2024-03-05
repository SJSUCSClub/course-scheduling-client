'use client';

import React from 'react';
import clsx from 'clsx';

interface DropdownBoxContextType extends DropdownProps {}

const DropdownBoxContext = React.createContext<
  DropdownBoxContextType | undefined
>(undefined);

interface DropdownBoxProviderProps extends DropdownProps {
  children: React.ReactNode;
}

/**
 * This is the context provider for the `<Dropdown />` component. It is used to provide props to it's children.
 * You can use this component along with `<DropdownBox />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <DropdownBoxProvider options={options} values={values}>
 *    <DropdownBox className="w-full h-fit" />
 *  </DropdownBoxProvider>
 * )
 */
export const DropdownBoxProvider: React.FC<DropdownBoxProviderProps> = ({
  children,
  ...props
}) => (
  <DropdownBoxContext.Provider value={props}>
    {children}
  </DropdownBoxContext.Provider>
);

/**
 * This is a styled div element for the `<Dropdown />` component.
 * You can use this component along with `<DropdownBoxProvider />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <DropdownBoxProvider options={options} values={values}>
 *    <DropdownBox className="w-full h-fit" />
 *  </DropdownBoxProvider>
 * )
 */
export const DropdownBox: React.FC<React.HTMLProps<HTMLDivElement>> = (
  props,
) => {
  const context = React.useContext(DropdownBoxContext);
  if (!context) {
    throw new Error('DropdownBox must be used within a DropdownBoxProvider');
  }
  const { options, values, error, helper, label, required, disabled } = context;
  return (
    <div
      {...props}
      className={clsx(
        '-:flex -:flex-col -:gap-[10px]',
        { '-:opacity-30': disabled },
        props.className,
      )}
    >
      <div className="flex items-center justify-between gap-[32px]">
        <label className="flex gap-[3px] text-heading text-neutral">
          {label}
          {required ? <span className="text-important">*</span> : null}
        </label>
        {error ? (
          <p className="flex text-subheading italic text-important">{error}</p>
        ) : null}
      </div>
      <select
        disabled={disabled}
        className={clsx(
          'flex h-[40px] w-fit min-w-full appearance-none items-center rounded-md bg-border py-[5px] pl-[16px] pr-[38px] animation focus:border-primary focus:ring-0',
          {
            'default-border': !error,
            'border-2 border-important': error,
          },
        )}
      >
        {options.map((option, index) => (
          <option key={option} value={values[index]}>
            {option}
          </option>
        ))}
      </select>
      {helper ? (
        <p className="flex text-caption text-neutral">{helper}</p>
      ) : null}
    </div>
  );
};

interface DropdownProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  options: string[];
  values: string[];
}

/**
 * This is the default `<Dropdown />` component.
 * @component
 * @example
 * return (
 *  <Dropdown variant={variant} prefix={prefix} postfix={postfix} loading={loading} disabled={disabled} />
 * )
 */
const Dropdown: React.FC<DropdownProps> = (props) => (
  <DropdownBoxProvider {...props}>
    <DropdownBox />
  </DropdownBoxProvider>
);

export default Dropdown;
