'use client';
import React from 'react';
import { SWRConfig } from 'swr';

import { formatResponse } from '@/utils/fetches';

export const SWRProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SWRConfig
      value={{
        fetcher: ([apiRoute, init]: [string, object | undefined]) =>
          fetch(process.env.NEXT_PUBLIC_FRONTEND_URL + '/api/' + apiRoute, init)
            .then((res) => res.json())
            .then(formatResponse),
      }}
    >
      {children}
    </SWRConfig>
  );
};
