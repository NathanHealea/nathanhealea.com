'use client';

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Logo } from 'components';
import Link from 'next/link';

const links = [
  { title: 'Home', href: '/', color: 'strawberry' },
  { title: 'Projects', href: '/projects', color: 'apricot' },
  { title: 'Notebook', href: '/notebook', color: 'lemon' },
  { title: 'Resume', href: '/resume', color: 'apple' },
  { title: "Let's Connect", href: '/lets-connect', color: 'blueberry' },
];

const Header = () => {
  return (
    <header className='bg-gradient-rainbow'>
      <div className='w-full bg-white text-white-content dark:bg-black dark:text-black-content mb-1'>
        <div className='content flex flex-row items-center transition-all ease-in-out duration-200 h-32'>
          <div className='flex flex-row items-center gap-x-4'>
            <Link href='/'>
              <Logo />
            </Link>
          </div>
          <div className='flex-1'></div>
          {/* <nav className='hidden md:flex gap-x-4 justify-end items-center '>
            {links.map((link) => (
              <Link
                key={uuidv4()}
                href={link.href}
                className={classNames(
                  ` hover:underline hover:underline-offset-8 transition-all duration-300 ease-in-out`,
                  {
                    'hover:text-strawberry': link.color === 'strawberry',
                    'hover:text-apricot': link.color === 'apricot',
                    'hover:text-lemon': link.color === 'lemon',
                    'hover:text-apple': link.color === 'apple',
                    'hover:text-blueberry': link.color === 'blueberry',
                    'hover:text-grape': link.color === 'grape',
                    'hover:text-plum': link.color === 'plum',
                    'hover:text-peach': link.color === 'peach',
                  }
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav> */}
          {/* <Menu as='nav' className='block md:hidden'>
            <Menu.Button className='flex justify-center items-center h-16 w-16 '>
              {({ open }) => (
                <FontAwesomeIcon
                  className='fa-2x'
                  icon={open ? faTimes : faBars}
                />
              )}
            </Menu.Button>

            <Transition.Root
              style={{
                top: position.scrollY <= 256 ? '8rem' : '5rem',
              }}
              className='absolute flex w-full flex-col gap-4 left-0 bg-black transition-all duration-200 ease-in-out'
            >
              <Transition.Child
                enter='transition-opacity duration-200 ease-in-out'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-200 ease-in-out'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                // className='bg-black'
              >
                <Menu.Items>
                  {links.map((link) => (
                    <Menu.Item key={uuidv4()}>
                      <Link
                        href={link.href}
                        className={classNames(
                          `flex text-center items-center justify-center py-8 transition-all duration-300 ease-in-out`,

                          {
                            'hover:text-strawberry active:text-strawberry hover:bg-strawberry/20 active:bg-strawberry/20':
                              link.color == 'strawberry',
                            'hover:text-apricot active:text-apricot hover:bg-apricot/20 active:bg-apricot/20':
                              link.color == 'apricot',
                            'hover:text-lemon active:text-lemon hover:bg-lemon/20 active:bg-lemon/20':
                              link.color == 'lemon',
                            'hover:text-apple active:text-apple hover:bg-apple/20 active:bg-apple/20':
                              link.color == 'apple',
                            'hover:text-blueberry active:text-blueberry hover:bg-blueberry/20 active:bg-blueberry/20':
                              link.color == 'blueberry',
                            'hover:text-grape active:text-grape hover:bg-grape/20 active:bg-grape/20':
                              link.color == 'grape',
                            'hover:text-plum active:text-plum hover:bg-plum/20 active:bg-plum/20':
                              link.color == 'plum',
                            'hover:text-peach active:text-peach hover:bg-peach/20 active:bg-peach/20':
                              link.color == 'peach',
                          }
                        )}
                      >
                        {link.title}
                      </Link>
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    <div className='bg-gradient-rainbow h-1' />
                  </Menu.Item>
                </Menu.Items>
              </Transition.Child>
            </Transition.Root>
          </Menu> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
