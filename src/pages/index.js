import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Cover from '../components/Cover/cover';
import Layout from '../components/Layout/layout';

const IndexPage = () => (
  <Layout>
    <SEO
      title="Engineering Leader"
      description="Engineer turned engineering leader. Senior Director Software Engineering at Dynatrace, running a 350-person unit."
    />
    <Cover />
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-900">Engineer turned engineering leader.</span>
          {' '}Running a 350-person unit at Dynatrace.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/about/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors border-0">
            About me &rarr;
          </Link>
          <Link to="/blog/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors border-0">
            Blog &rarr;
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default IndexPage;
