'use client';

import clsx from 'clsx';
import React from 'react';

import getCustomizableComponents from '@/utils/get-customizable-components';

interface TagCheckboxContextType {
  values: Set<string>;
  addValue: (value: string) => void;
  removeValue: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const TagCheckboxContext = React.createContext<
  TagCheckboxContextType | undefined
>(undefined);

interface TagCheckboxGroupProps {
  error?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (values: string[]) => void;
  children: React.ReactNode;
}

export const {
  Default: TagCheckboxGroup,
  Box: TagCheckboxGroupBox,
  BoxProvider: TagCheckboxGroupBoxProvider,
} = getCustomizableComponents<
  TagCheckboxGroupProps,
  React.HTMLProps<HTMLDivElement>
>({
  box:
    ({ error, disabled, label, onChange }) =>
    ({ children, ...props }) => {
      const [values, setValues] = React.useState<Set<string>>(new Set());
      const addValue = (value: string) => {
        setValues(new Set(values.add(value)));
        onChange?.(Array.from(values.add(value)));
      };
      const removeValue = (value: string) => {
        values.delete(value);
        setValues(new Set(values));
        onChange?.(Array.from(values));
      };
      return (
        <TagCheckboxContext.Provider
          value={{ values, addValue, removeValue, error, disabled }}
        >
          <div
            {...props}
            className={clsx(
              '-:flex -:flex-col -:gap-[5px] -:pb-[10px]',
              { '-:opacity-30': disabled },
              props.className,
            )}
          >
            {/* Store the checkbox values as an array in a hidden Input so it will be submitted to the form */}
            <input type="hidden" value={JSON.stringify(values)} />
            {/* Label */}
            {label && <label className="text-caption">{label}</label>}
            <div className="flex flex-wrap gap-[10px]">{children}</div>
          </div>
        </TagCheckboxContext.Provider>
      );
    },
});

interface TagCheckboxProps {
  value: string;
  count: number;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  children: string;
}

export const {
  Default: TagCheckbox,
  Box: TagCheckboxBox,
  BoxProvider: TagCheckboxBoxProvider,
} = getCustomizableComponents<
  TagCheckboxProps,
  React.HTMLProps<HTMLLabelElement>
>({
  box:
    ({ value, count, onClick }) =>
    ({ children, ...props }) => {
      if (typeof children !== 'string') {
        throw new Error('TagCheckbox children must be a string label');
      }
      const context = React.useContext(TagCheckboxContext);
      if (!context) {
        throw new Error('TagCheckbox must be used within a TagCheckboxGroup');
      }
      const { values, addValue, removeValue, error, disabled } = context;
      const [isChecked, setIsChecked] = React.useState(values.has(value));
      const handleChange = () => {
        if (disabled) return;
        if (isChecked) {
          removeValue(value);
        } else {
          addValue(value);
        }
        setIsChecked(!isChecked);
      };
      return (
        <label
          style={{
            color: isChecked ? 'rgb(var(--color-background))' : '',
            backgroundColor: isChecked ? 'rgb(var(--color-secondary))' : '',
          }}
          onClick={onClick}
          {...props}
          className={clsx(
            '-:relative -:flex -:items-center -:gap-[5px] -:rounded-lg -:bg-border -:text-caption -:animation',
            { '-:hover:opacity-50 -:active:opacity-25': !disabled },
            props.className,
          )}
        >
          <input
            id="checkbox"
            type="checkbox"
            disabled={disabled}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            className={clsx(
              'absolute left-[5px] h-[calc(100%_-_10px)] w-[calc(100%_-_10px)] rounded-md border-0 bg-[#00000000] transition-all checked:bg-background checked:opacity-0 checked:ring-2 checked:ring-offset-2',
              { 'cursor-pointer': !disabled },
            )}
          />
          <span className="py-[5px] pl-[15px]">{children}</span>
          <span
            style={{
              color: isChecked ? 'rgb(var(--color-background))' : '',
            }}
            className="py-[5px] pr-[15px] text-caption text-neutral animation"
          >
            {count}
          </span>
        </label>
      );
    },
});
