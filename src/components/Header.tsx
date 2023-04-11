import React from 'react';

import Navigation from './Navigation/navigation';

type HeaderProps = {
  siteTitle: string;
  renderAvatar?: boolean;
};

function Header({ siteTitle }: HeaderProps): JSX.Element {
  return (
    <header className="flex justify-between px-4 py-2 bg-teal-500">
      <h1 className="text-2xl font-medium text-white">{siteTitle}</h1>
      <Navigation />
    </header>
  );
}

export default Header;
