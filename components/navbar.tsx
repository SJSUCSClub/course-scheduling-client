'use client';

import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

import SearchWithDropdown from '@/components/forms/search-with-dropdown';
import Button from '@/components/button';
import Logo from '@/components/logo';
import Navlink from './navlink';

const links = [
  { name: 'Courses', href: '/courses' },
  { name: 'Professors', href: '/professors' },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const [showSearch, setShowSearch] = React.useState(false);
  const toggleSearch = () => setShowSearch(!showSearch);
  const { data: session, status } = useSession();
  return (
    <header className="border-b-2 border-border">
      <nav className="mx-auto box-border flex h-[73px] items-center justify-between px-[32px] animation max-width">
        <Button
          variant={<MagnifyingGlassIcon />}
          className={clsx('lg:hidden', { hidden: showSearch })}
          onClick={toggleSearch}
        />
        <Button
          variant={<XMarkIcon />}
          className={clsx('lg:hidden', { hidden: !showSearch })}
          onClick={toggleSearch}
        />

        {/* Logo */}
        <Link
          className={clsx('lg:pr-[32px]', { 'max-lg:hidden': showSearch })}
          href="/"
        >
          <Logo />
        </Link>

        {/* Search Bar */}
        <SearchWithDropdown
          className={clsx('flex flex-1 max-lg:pl-[32px]', {
            'max-lg:hidden': !showSearch,
          })}
        />

        <Button
          variant={<Bars3Icon />}
          className={clsx('lg:hidden', { hidden: showSearch })}
          onClick={toggleMenu}
        />
        <div
          className={clsx(
            'flex items-center gap-[16px] text-button text-primary max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-full max-lg:flex-col-reverse max-lg:gap-[16px] max-lg:overflow-y-scroll max-lg:bg-background max-lg:p-[16px] lg:pl-[16px]',
            {
              'max-lg:z-50': showMenu,
              'max-lg:z-0 max-lg:hidden': !showMenu,
            },
          )}
        >
          <ul className="flex gap-[5px] max-lg:flex-1 max-lg:flex-col max-lg:items-center max-lg:gap-[32px]">
            {links.map((link) => (
              <li key={link.href}>
                <Navlink href={link.href}>{link.name}</Navlink>
              </li>
            ))}
          </ul>

          <hr className="w-full pb-[16px] text-border lg:hidden" />

          <div className="flex w-full items-center gap-[16px] max-lg:justify-between">
            <div className="h-[45px] w-[45px] lg:hidden" />
            <div className="flex items-center gap-[16px]">
              <Button
                variant="ghost"
                onClick={() =>
                  signIn('google', undefined, { prompt: 'select_account' })
                }
              >
                Sign In
              </Button>
              {status === 'authenticated' && session ? (
                <p>Signed in as {session.user?.email}</p>
              ) : null}
            </div>
            <Button
              className="lg:hidden"
              variant={<XMarkIcon />}
              onClick={toggleMenu}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
