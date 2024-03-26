'use client';

import clsx from 'clsx';
import React from 'react';

import Icon from '@/components/icon';
import LoadingSpinner from '@/components/loading-spinner';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const NavbarSearch: React.FC<React.HTMLProps<HTMLFormElement>> = (props) => {
  const [option, setOption] = React.useState('courses');
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const handleSetOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
  };
  const handleSetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
    setLoading(false);
  }, [search]);
  return (
    <form
      action={`/${option}/search?query=${search}`}
      {...props}
      className={clsx(
        `-:flex -:h-[40px] -:text-body -:text-text`,
        props.className,
      )}
    >
      <input
        onChange={handleSetSearch}
        type="text"
        className="h-full w-0 flex-1 rounded-l-md bg-border pr-10 animation default-border focus:border-primary focus:ring-0"
        placeholder="Search"
      />
      <div className="relative h-full">
        <div className="absolute right-4 flex h-full w-[16px] items-center">
          <Icon
            icon={loading ? <LoadingSpinner /> : <MagnifyingGlassIcon />}
            w="16px"
            h="16px"
          />
        </div>
      </div>
      <select
        onChange={handleSetOption}
        defaultValue={option}
        className="flex h-full w-fit appearance-none items-center rounded-r-md bg-background py-[5px] pl-[16px] pr-[38px] animation default-border focus:border-primary focus:ring-0"
      >
        <option value="courses">Courses</option>
        <option value="professors">Professors</option>
      </select>
    </form>
  );
};

export default NavbarSearch;
