'use client';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

export const ParamsDropdown: React.FC<
  DropdownProps & {
    param: string;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ param, loading, setLoading, disabled, defaultValue, ...props }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const currentParam = params.get(param);
  const [pendingParam, setPendingParam] = React.useState(currentParam);

  const handleChange = (term: string) => {
    params.set('page', '1');
    if (term) {
      params.set(param, term);
    } else {
      params.delete(param);
    }
    setPendingParam(params.get(param));
    replace(`${pathname}?${params.toString()}`);
  };

  React.useEffect(() => {
    setLoading(currentParam !== pendingParam);
  }, [pendingParam, currentParam, setLoading]);

  return (
    <Dropdown
      disabled={disabled || loading}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
      defaultValue={currentParam ?? defaultValue}
      {...props}
    />
  );
};

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
