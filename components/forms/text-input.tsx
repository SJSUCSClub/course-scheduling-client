'use client';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Icon from '@/components/icon';
import LoadingSpinner from '@/components/loading-spinner';
import getCustomizableComponents from '@/utils/get-customizable-components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface TextInputProps {
  title?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  placeholder?: string;
  fullHeight?: boolean;
  icon?: React.ReactElement;
  onChange?: React.ChangeEventHandler<HTMLInputElement> &
    React.ChangeEventHandler<HTMLTextAreaElement>;
}
export const Search: React.FC<TextInputProps> = (props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const debouncedReplace = useDebouncedCallback(replace, 500);

  const params = new URLSearchParams(searchParams);
  const currentParam = params.get('query');
  const [pendingParam, setPendingParam] = React.useState(currentParam);

  function handleSearch(term: string) {
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    setPendingParam(params.get('query'));
    debouncedReplace(`${pathname}?${params.toString()}`);
  }

  return (
    <TextInput
      icon={
        currentParam !== pendingParam ? (
          <LoadingSpinner height={1} />
        ) : (
          <MagnifyingGlassIcon />
        )
      }
      placeholder="Search"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      {...props}
    />
  );
};

const {
  Default: TextInput,
  Box: TextInputBox,
  BoxProvider: TextInputBoxProvider,
} = getCustomizableComponents<TextInputProps, React.HTMLProps<HTMLDivElement>>({
  box:
    ({
      title,
      error,
      helper,
      required,
      placeholder,
      fullHeight,
      icon,
      onChange,
    }) =>
    ({ ...props }) => (
      <div
        {...props}
        className={clsx(`-:flex -:flex-col -:gap-2`, props.className)}
      >
        {title ? (
          <div className="flex flex-wrap gap-[10px] px-2">
            <h3 className="flex-1 text-heading text-neutral">
              {title}
              {required ? <span className="text-important">*</span> : null}
            </h3>
            <em className="flex-1 text-end text-subheading text-important">
              {error ? error : null}
            </em>
          </div>
        ) : null}
        <div
          className={clsx('flex w-full', {
            'h-[40px]': !fullHeight,
            'h-[80px]': fullHeight,
          })}
        >
          {fullHeight ? (
            <textarea
              onChange={onChange}
              className={clsx(
                'h-[80px] w-0 flex-1 resize-none rounded-md bg-border animation default-border focus:border-primary focus:ring-0',
                { 'pr-10': icon },
              )}
              placeholder={placeholder}
            />
          ) : (
            <input
              onChange={onChange}
              type="text"
              className={clsx(
                'h-full w-0 flex-1 rounded-md bg-border animation default-border focus:border-primary focus:ring-0',
                { 'pr-10': icon },
              )}
              placeholder={placeholder}
            />
          )}
          {icon ? (
            <div className="relative h-full">
              <div className="absolute right-4 flex h-full w-[16px] items-center text-text">
                <Icon icon={icon} w="16px" h="16px" />
              </div>
            </div>
          ) : null}
        </div>
        {helper ? <p className="text-caption text-neutral">{helper}</p> : null}
      </div>
    ),
});

export { TextInputBox, TextInputBoxProvider };
export default TextInput;
