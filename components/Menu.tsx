import React from 'react';
import Link from 'next/link';
import { fetchNavigationItems, NavigationItem } from '../lib/strapi';

export default async function Menu() {
  const navigationItems = await fetchNavigationItems();

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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navigationItems.map((item: NavigationItem) => (
              <li key={item.id} className="nav-item">
                <Link 
                  className="nav-link" 
                  href={item.url}
                  title={item.title || item.label}
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