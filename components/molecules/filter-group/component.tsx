'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { Tag } from '@/components/atoms';
import { cn } from '@/utils/cn';

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  variant: 'radio' | 'checkbox';
  values: string[];
  param?: string;
  scrollTarget?: string;
  shouldResetPageOnChange?: boolean;
}

export const FilterGroup: React.FC<Props> = ({
  variant,
  values,
  param = 'query',
  scrollTarget,
  shouldResetPageOnChange = true,
  className,
  ...props
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const currentParam = params.getAll(param);
  const [pendingParam, setPendingParam] = React.useState(currentParam);

  function handleChange() {
    if (formRef.current === null) return;
    const formData = new FormData(formRef.current);
    const filters = formData.getAll('filter');

    shouldResetPageOnChange && params.set('page', '1');
    params.delete(param);
    if (filters.length > 0) {
      for (const filter of filters) {
        params.append(param, filter.toString());
      }
    }
    setPendingParam(params.getAll(param));
    replace(`${pathname}?${params.toString()}#${scrollTarget || ''}`);
  }
  return (
    <form
      ref={formRef}
      className={cn('flex flex-wrap gap-sm', className)}
      {...props}
    >
      {values.map((value, i) => (
        <Tag
          key={i}
          name="filter"
          value={value}
          type={variant}
          checked={searchParams.getAll(param).includes(value)}
          onClick={() => handleChange()}
          disabled={currentParam.toString() !== pendingParam.toString()}
        >
          {value}
        </Tag>
      ))}
    </form>
  );
};
