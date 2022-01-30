import { withPrefix, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React from 'react';

import ShareArticle from './Footer/ShareArticle/shareArticle';
import Header from './header';

import './layout.css';

const Layout = ({ children, headerChildren }) => {
  const renderAvatar = !headerChildren

  return (
    <div className="antialiased md:mx-auto md:subpixel-antialiased">
      <Helmet>
        <script async src={withPrefix('dynatrace.js')} type="text/javascript" />
      </Helmet>
      <Header siteTitle="Tom Stagl" renderAvatar={renderAvatar}>
        {headerChildren}
      </Header>
      <main>
        {/* <main className="max-w-xl p-4 mx-auto md:max-w-3xl lg:max-w-4xl"> */}
        {children}
      </main>
      <footer className="pt-4 text-gray-400 bg-gray-800 md:from-gray-700 md:to-gray-800 md:bg-gradient-to-r">
        <div className="flex flex-col-reverse max-w-xl p-4 pt-2 mx-auto md:flex-row md:max-w-3xl lg:max-w-4xl">
          <div className="justify-center block w-full p-4 md:w-1/3 md:justify-start md:p-0">
            <address className="text-sm not-italic text-center md:text-left">
              <p className="font-bold">Kontakt</p>
              <p>Thomas Stagl</p>
              <p>Berggasse 2</p>
              <p>2542 Kottingbrunn</p>
              <p>
                Email:{' '}
                <a href="mailto:thomas.stagl@gmail.com" className="text-teal-400">
                  thomas.stagl@gmail.com
                </a>
              </p>
              <p>
                Tel:{' '}
                <a href="tel://+436766688722" className="text-teal-400">
                  +43 676 6688722
                </a>
              </p>
            </address>
          </div>
          <div className="flex justify-center w-full p-4 md:w-1/3 md:p-0">
            <Link to="/impressum/" className="text-xs md:text-gray-400">
              Imprint
            </Link>
          </div>
          <div className="flex justify-center w-full p-4 md:w-1/3 md:items-start md:justify-end md:p-0">
            <ShareArticle />
          </div>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerChildren: PropTypes.node,
};

export default Layout;
