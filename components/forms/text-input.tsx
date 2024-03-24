'use client';

import clsx from 'clsx';

import Icon from '@/components/icon';
import getCustomizableComponents from '@/utils/get-customizable-components';

interface TextInputProps {
  title?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactElement;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const {
  Default: TextInput,
  Box: TextInputBox,
  BoxProvider: TextInputBoxProvider,
} = getCustomizableComponents<TextInputProps, React.HTMLProps<HTMLDivElement>>({
  box:
    ({ title, error, helper, required, placeholder, icon, onChange }) =>
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
        <div className="flex h-[40px] w-full">
          <input
            onChange={onChange}
            type="text"
            className={clsx(
              'h-full w-0 flex-1 rounded-md bg-border animation default-border focus:border-primary focus:ring-0',
              { 'pr-10': icon },
            )}
            placeholder={placeholder}
          />
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
