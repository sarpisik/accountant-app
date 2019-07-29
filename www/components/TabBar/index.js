import React, { Component } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MDBRow, MDBNavbar, MDBNavItem, MDBIcon } from 'mdbreact';

const Tabs = [{ href: '/', icon: 'home' }, { href: '/user', icon: 'user-alt' }];

const isActive = href =>
  useRouter().route === href ? 'text-danger' : 'text-body';

const Tab = ({ href, icon }) => (
  <MDBNavItem key={href}>
    <Link href={href}>
      <a className={`nav-link ${isActive(href)}`}>
        <MDBIcon icon={icon} />
      </a>
    </Link>
  </MDBNavItem>
);

const TabBar = props => (
  <MDBRow>
    <MDBNavbar className="w-100 list-unstyled justify-content-around">
      {Tabs.map(Tab)}
    </MDBNavbar>
  </MDBRow>
);

export default TabBar;
