'use client';

import Dropdown from '@/components/forms/dropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const ChangeTypeDropdown: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const currentParam = params.get('type');
  const [pendingParam, setPendingParam] = React.useState(currentParam);
  const loading = currentParam !== pendingParam;
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    params.set('type', event.target.value);
    setPendingParam(params.get('type'));
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Dropdown
      options={['Overall', 'Quality', 'Ease']}
      values={['overall', 'quality', 'ease']}
      defaultValue={currentParam ?? 'overall'}
      onChange={handleChange}
      disabled={loading}
    />
  );
};

export default ChangeTypeDropdown;
