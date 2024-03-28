import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
import clsx from 'clsx';
import { Children, ComponentProps, cloneElement } from 'react';
import { v4 as uuid } from 'uuid';
export interface NavigationProps extends ComponentProps<'nav'> {}

const Navigation = (props: NavigationProps) => {
  const { className, children } = props;

  return (
    <>
      <Menu
        as='nav'
        className='relative inset-0 -z-10 w-full  before:backdrop-blur'
      >
        <div
          className={clsx(
            'navbar w-full max-w-7xl rounded-2xl shadow-xl backdrop-blur ',
            className
          )}
        >
          <div className='flex'>
            <Link to='/' className='btn btn-ghost '>
              Nathan Healea
            </Link>
          </div>

          <div className='mobile-menu flex-1 items-end justify-end md:hidden'>
            <Menu.Button className='btn btn-ghost'>
              <Bars3Icon className='h-8 w-8' />
            </Menu.Button>
          </div>
          <div className='flex-1 justify-end'>
            <ul className='menu menu-horizontal'>
              {Children.map(children, (child) => {
                return (
                  <li key={uuid()}>
                    {cloneElement(child, { className: 'p-4 px-8' })}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <Transition
          className='absolute right-0 top-24 w-full max-w-7xl rounded-2xl shadow-xl backdrop-blur sm:max-w-xl md:hidden'
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Menu.Items as='ul' className='menu'>
            {Children.map(children, (child) => {
              return (
                <Menu.Item as='li' key={uuid()}>
                  {cloneElement(child, { className: 'p-4 px-8' })}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Navigation;
