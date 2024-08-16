'user client';
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import {v4 as uuid} from 'uuid';

import clsx from 'clsx';
import { ComponentProps } from 'react';
import {routes, Route} from '@configs/routes.config';
import React from 'react';
import Link from 'next/link';

export interface HeaderProps extends ComponentProps<'header'> {}

const Header = (props: HeaderProps) => {
  return (
    <Menu
      as='header'
      className={clsx(
        'bg-opacity-700 bg-base-700 navbar fixed top-0 z-30 flex w-full flex-col text-base-content shadow-xl backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] ui-open:min-h-screen'
      )}
    >
      <nav className='navbar relative h-16 w-full min-w-80 max-w-7xl '>
        <div className='flex'>
          <Link href='/' className='btn btn-ghost '>
            Nathan Healea
          </Link>
        </div>

        <div className='mobile-menu flex-1 items-end justify-end md:hidden'>
          <MenuButton className='btn btn-ghost'>
            <Bars3Icon className='h-8 w-8' />
          </MenuButton>
        </div>
        <div className='hidden flex-1 justify-end md:flex'>
          <ul className='menu menu-horizontal gap-8'>
            {routes.map((route: Route) => (
              <Link
                key={uuid()}
                href={route.href}
                className='btn btn-ghost text-sm'
              >
                {route.title}
              </Link>
            ))}
          </ul>
        </div>
      </nav>

      <MenuItems as='ul' className='menu menu-vertical gap-8'>
        {routes.map((route:Route) => (
          <MenuItem
            key={uuid()}
            as={Link}
            href={route.href}
            className='btn btn-ghost w-full'
          >
            {route.title}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default Header;
