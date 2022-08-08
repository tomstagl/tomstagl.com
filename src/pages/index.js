import React from 'react';

import SEO from '../components/seo';
import Cover from '../components/Cover/cover';
import Layout from '../components/Layout/layout';

const IndexPage = () => (
  <Layout>
    <SEO
      title="Software engineering leader"
      description="I love software development, all things ending with OPS and I like to work with people."
    />
    <Cover />
  </Layout>
);

export default IndexPage;
