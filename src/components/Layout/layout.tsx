import { Helmet } from 'react-helmet';
import { Link, withPrefix } from 'gatsby';
import Header from '../Header';
import ShareArticle from '../Footer/ShareArticle/shareArticle';
import '../layout.css';

const Layout = ({ children }) => {
  return (
    <div className="antialiased bg-white container mx-auto mb-12 lg:max-w-4xl text-gray-700 md:subpixel-antialiased">
      <Helmet>
        <script
          type="text/javascript"
          src="https://js-cdn.dynatracelabs.com/jstag/1468ae7109d/bf26680ang/1281206c1e7da6a4_complete.js"
          crossorigin="anonymous"
        />
      </Helmet>
      <Header siteTitle="Tom Stagl"></Header>
      <main>
        <div className={'content leading-relaxed'}>{children}</div>
      </main>
      <footer className="mt-16 bg-white border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl p-4 mx-auto">
          <div className="flex items-center p-2">
            <ShareArticle className="text-slate-400 hover:text-slate-600" />
          </div>
          <div className="p-2">
            <Link to="/impressum/" className="text-sm text-slate-500 hover:text-slate-700 border-0">
              Imprint
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
