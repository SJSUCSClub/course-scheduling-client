'use client';

import { Select } from '@/components/atoms';
import React from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

export const ColorModePicker: React.FC = () => {
  return (
    <CookiesProvider>
      <ColorModePickerWithoutCookies />
    </CookiesProvider>
  );
};

const ColorModePickerWithoutCookies: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);
  const [theme, setTheme] = React.useState<string | null>(null);
  const cookies = useCookies(['theme']);
  React.useEffect(() => {
    setIsClient(true);
    setTheme(localStorage.theme);
  }, []);
  React.useEffect(() => {
    if (!isClient) {
      return;
    }
    if (theme) {
      localStorage.theme = theme;
    } else {
      localStorage.removeItem('theme');
    }
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      cookies[1]('theme', 'dark', { path: '/' });
    } else {
      document.documentElement.classList.remove('dark');
      cookies[1]('theme', 'light', { path: '/' });
    }
  }, [theme, isClient, cookies]);
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const theme = e.target.value;
    setTheme(theme);
  }
  if (!isClient) {
    return null;
  }
  return (
    <Select defaultValue={theme ?? ''} onChange={handleChange}>
      <option value="">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  );
};
