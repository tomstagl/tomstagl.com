import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const NavItem = (props) => {
  const { to, name } = props;

  return (
    <li className="pr-1">
      <Link className="nav-tab" to={to}>
        {name}
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavItem;
