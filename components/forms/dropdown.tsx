'use client';

import clsx from 'clsx';
import React from 'react';

import getCustomizableComponents from '@/utils/get-customizable-components';

interface DropdownProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  options: string[];
  values: string[];
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const {
  Default: Dropdown,
  Box: DropdownBox,
  BoxProvider: DropdownBoxProvider,
} = getCustomizableComponents<DropdownProps, React.HTMLProps<HTMLDivElement>>({
  box:
    ({
      label,
      error,
      helper,
      required,
      disabled,
      options,
      values,
      defaultValue,
      onChange,
    }) =>
    ({ ...props }) => (
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
            <p className="flex text-subheading italic text-important">
              {error}
            </p>
          ) : null}
        </div>
        <select
          onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue}
          className={clsx(
            'flex h-[40px] w-fit min-w-full appearance-none items-center rounded-md bg-border py-[5px] pl-[16px] pr-[38px] animation focus:border-primary focus:ring-0',
            {
              'default-border': !error,
              'border-2 border-important': error,
              'cursor-pointer': !disabled,
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
    ),
});
export { DropdownBox, DropdownBoxProvider };
export default Dropdown;
