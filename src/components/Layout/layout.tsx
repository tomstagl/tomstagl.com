import { Helmet } from 'react-helmet';
import { Link, withPrefix } from 'gatsby';
import Header from '../Header';
import ShareArticle from '../Footer/ShareArticle/shareArticle';
import '../layout.css';

const Layout = ({ children }) => {
  return (
    <div className="antialiased bg-white container mx-auto mb-12 lg:max-w-4xl text-gray-700 md:subpixel-antialiased">
      <Helmet>
        <script async src={withPrefix('dynatrace.js')} type="text/javascript" />
      </Helmet>
      <Header siteTitle="Tom Stagl"></Header>
      <main>
        <div className={'content leading-relaxed'}>{children}</div>
      </main>
      <footer className="pt-4 text-white bg-teal-500">
        <div className="flex flex-col-reverse max-w-xl p-4 pt-2 mx-auto md:flex-row md:max-w-3xl lg:max-w-4xl">
          <div className="justify-center block w-full p-4 md:w-1/3 md:justify-start md:p-0"></div>
          <div className="flex justify-center w-full p-4 md:w-1/3 md:p-0">
            <Link to="/impressum/" className="text-xs">
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

export default Layout;
