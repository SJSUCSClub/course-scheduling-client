'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import Dropdown, { ParamsDropdown } from '@/components/forms/dropdown';

const ChangeTypeDropdown: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <ParamsDropdown
      param="sort"
      loading={loading}
      setLoading={setLoading}
      options={['Overall', 'Quality', 'Ease']}
      values={['overall', 'quality', 'ease']}
      defaultValue="overall"
    />
  );
};

export default ChangeTypeDropdown;
