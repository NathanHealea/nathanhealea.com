"user client";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { v4 as uuid } from "uuid";

import clsx from "clsx";
import { ComponentProps } from "react";
import { routes, Route } from "@configs/routes.config";
import React from "react";
import Link from "next/link";
import ThemeSector from "./ThemeSelector.component";

export interface HeaderProps extends ComponentProps<"header"> {}

const Header = (props: HeaderProps) => {
  return (
    <Menu
      as="header"
      className={clsx(
        "bg-opacity-700 bg-base-700 navbar fixed top-0 z-30 flex w-full flex-col text-base-content shadow-xl backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] ui-open:min-h-screen"
      )}
    >
      <nav className="navbar relative h-16 w-full min-w-80 max-w-7xl gap-4">
        <div className="flex">
          <Link href="/" className="btn btn-ghost ">
            Nathan Healea
          </Link>
        </div>
        <div className="flex-1" />

        <ul className="hidden md:p-0 md:menu md:menu-horizontal md:gap-8">
          {routes.map((route: Route) => (
            <Link
              key={uuid()}
              href={route.href}
              className="btn btn-ghost text-sm"
            >
              {route.title}
            </Link>
          ))}
        </ul>

        <ThemeSector />

          <MenuButton className="btn btn-ghost md:hidden">
            <Bars3Icon className="h-6 w-6" />
          </MenuButton>
      </nav>

      <MenuItems as="ul" className="menu menu-vertical gap-8">
        {routes.map((route: Route) => (
          <MenuItem
            key={uuid()}
            as={Link}
            href={route.href}
            className="btn btn-ghost w-full"
          >
            {route.title}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default Header;
