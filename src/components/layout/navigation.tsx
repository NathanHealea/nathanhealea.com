'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-4 flex w-full justify-center items-center z-50 `}
    >
      <div
        className={`hidden md:block transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-white/10'
            : 'backdrop-blur-sm bg-white/5'
        } border border-primary/20 rounded-lg px-6 py-3 shadow-lg`}
      >
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-2">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink
                  className="text-foreground transition-colors font-serif cursor-pointer bg-transparent hover:bg-primary/5 hover:text-primary px-4 py-2 rounded-lg"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`flex md:hidden transition-all duration-300 justify-center gap-4 ${
          isScrolled
            ? 'backdrop-blur-md bg-white/10'
            : 'backdrop-blur-sm bg-white/5'
        } border border-primary/20 rounded-lg px-6 py-3 shadow-lg`}
      >
        <p className="text-foreground font-serif font-semibold flex items-center justify-center">
          Portfolio
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="flex justify-center md:hidden absolute top-full left-0 right-0 mt-2 duration-300 transition-all ">
          <div
            className={`container mx-4  ${
              isScrolled
                ? 'backdrop-blur-md bg-white/10'
                : 'backdrop-blur-sm bg-white/5'
            } border border-primary/20 rounded-lg px-6 py-3 shadow-lg`}
          >
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex-col gap-1 items-start">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.id} className="w-full">
                    <NavigationMenuLink
                      className="text-foreground hover:text-primary transition-colors font-serif text-left cursor-pointer bg-transparent hover:bg-white/10 px-3 py-2 rounded-lg w-full"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </nav>
  );
}
