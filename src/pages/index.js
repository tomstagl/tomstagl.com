import React from 'react';

import SEO from '../components/seo';
import Cover from '../components/Cover/cover';
import Layout from '../components/Layout/layout';

const IndexPage = () => (
  <Layout>
    <SEO
      title="Business Agility Coach"
      description="I'm an experienced Business Agility Coach focusing on New Work, OKRs and SCRUM."
    />
    <Cover />
  </Layout>
);

export default IndexPage;
