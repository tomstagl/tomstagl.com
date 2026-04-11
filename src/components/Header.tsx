import React from 'react';
import { Link } from 'gatsby';

import Navigation from './Navigation/navigation';

type HeaderProps = {
  siteTitle: string;
  renderAvatar?: boolean;
};

function Header({ siteTitle }: HeaderProps): JSX.Element {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
      <h1 className="text-xl md:text-2xl font-semibold">
        <Link to="/" className="text-slate-900 hover:text-blue-600 border-0 no-underline">
          {siteTitle}
        </Link>
      </h1>
      <Navigation />
    </header>
  );
}

export default Header;
