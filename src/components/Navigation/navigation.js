import React from 'react';

import NavItem from './navItem';

const links = [
  { to: '/', name: 'Start' },
  { to: '/blog/', name: 'Blog' },
];

const Navigation = () => {
  return (
    <nav>
      <ul className="flex items-row">
        {links.map((item) => {
          return <NavItem to={item.to} name={item.name} key={item.to} />;
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
