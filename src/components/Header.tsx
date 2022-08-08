import React from 'react';

import Navigation from './Navigation/navigation';

type HeaderProps = {
  siteTitle: string;
  renderAvatar?: boolean;
};

function Header({ siteTitle }: HeaderProps): JSX.Element {
  return (
    <header className="bg-teal-500 flex justify-between px-4 py-2 mb-10">
      <h1 className="text-white font-medium text-2xl">{siteTitle}</h1>
      <Navigation />
    </header>
  );
}

export default Header;
