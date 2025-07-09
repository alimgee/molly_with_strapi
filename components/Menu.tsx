
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="justify-content-between">
        <NavbarBrand href="/">MollyRose.ie</NavbarBrand>
        <NavbarText className="d-none d-lg-block">Lets talk about Childhood Cancer</NavbarText>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar className="animate">
          <Nav className="ms-auto" navbar>
            <NavItem>
              <Link href="/" passHref legacyBehavior>
                <NavLink title="Go to landing page of site">Home</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/story" passHref legacyBehavior>
                <NavLink title="Find out more about Molly Rose">Mollys Story</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/childhoodcancer" passHref legacyBehavior>
                <NavLink title="Find out more information about Childhood Cancer">Cancer</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/helpout" passHref legacyBehavior>
                <NavLink title="Ways you can help out">Helping Out</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/news" passHref legacyBehavior>
                <NavLink title="Find out current news or events relating to childhood cancer">News</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/about" passHref legacyBehavior>
                <NavLink title="Some more information about us">About</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
