// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './ThemeToggle';
import AnimatedLogo from './AnimatedLogo';
import MobileMenu from './MobileMenu';
import { navCategories, aboutLink } from '@/config/navigation';
import { SITE_NAME } from '@/config/site';

/**
 * Composant d'en-tête avec navigation responsive améliorée
 * @returns {JSX.Element} Le composant Header
 */
const linkClass = (active: boolean) =>
  `whitespace-nowrap px-3 py-2 text-sm rounded-md transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
    active ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted hover:text-foreground'
  }`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Fermer le menu lorsque la route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Empêcher le défilement lorsque le menu est ouvert sur mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex items-center justify-between h-16 mx-auto px-4">
          <Link 
            to="/" 
            className="flex shrink-0 items-center gap-2 min-h-11 min-w-11 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded-md"
            aria-label={`Accueil - ${SITE_NAME}`}
          >
            <div className="hidden sm:block">
              <AnimatedLogo />
            </div>
            <div className="block sm:hidden">
              <AnimatedLogo compact />
            </div>
          </Link>

          {/* Navigation desktop : une entrée par catégorie (13 liens à plat ne tiennent pas sur une ligne) */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Navigation principale"
          >
            {navCategories.map((category) => {
              const active = category.items.some((item) => item.href === pathname);
              return (
                <DropdownMenu key={category.id}>
                  <DropdownMenuTrigger
                    className={`${linkClass(active)} inline-flex items-center gap-1`}
                  >
                    {category.title}
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-48">
                    {category.items.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          to={item.href}
                          className={pathname === item.href ? 'font-medium text-primary' : ''}
                          aria-current={pathname === item.href ? 'page' : undefined}
                        >
                          {item.text}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
            <Link
              to={aboutLink.href}
              className={linkClass(pathname === aboutLink.href)}
              aria-current={pathname === aboutLink.href ? 'page' : undefined}
            >
              {aboutLink.text}
            </Link>
            <ThemeToggle />
          </nav>

          {/* Boutons mobile */}
          <div className="flex items-center lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={handleMenuToggle}
              className="ml-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Menu mobile amélioré */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
};

export default Header;
