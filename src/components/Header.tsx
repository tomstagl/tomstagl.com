import PropTypes from 'prop-types';
import React, { FunctionComponent } from 'react';

import Avatar from './Avatar/avatar';
import Navigation from './Navigation/navigation';

type HeaderProps = {
  siteTitle: string;
  renderAvatar?: boolean;
};

const Header: FunctionComponent<HeaderProps> = ({
  siteTitle = '',
  renderAvatar = true,
  children,
}) => (
  <div className="pt-4 text-gray-400 bg-gray-800 md:from-gray-700 md:to-gray-800 md:bg-gradient-to-r">
    <div className="max-w-xl pb-3 mx-auto md:max-w-3xl lg:max-w-4xl">
      <nav className="flex flex-wrap items-center justify-between">
        {renderAvatar ? (
          <Avatar title={siteTitle} />
        ) : (
          <Avatar title={siteTitle} className="hidden" />
        )}
        <Navigation />
      </nav>
      {children}
    </div>
  </div>
);

Header.propTypes = {
  children: PropTypes.node,
  siteTitle: PropTypes.string.isRequired,
  renderAvatar: PropTypes.bool,
};
export default Header;
