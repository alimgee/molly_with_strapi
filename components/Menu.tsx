'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchNavigationItems, NavigationItem } from '../lib/strapi';

export default function Menu() {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadNavigationItems = async () => {
      const items = await fetchNavigationItems();
      setNavigationItems(items);
    };
    loadNavigationItems();
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          MollyRose.ie
        </Link>
        <span className="d-none d-lg-block navbar-text">
          Lets talk about Childhood Cancer
        </span>
        
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navigationItems.map((item: NavigationItem) => (
              <li key={item.id} className="nav-item">
                <Link 
                  className="nav-link" 
                  href={item.url}
                  title={item.title || item.label}
                  onClick={closeNavbar}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}