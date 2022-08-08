import { graphql } from 'gatsby';
import React from 'react';

import BlogPost from '../components/Blog/BlogList/blogPost';
//import BlogPost from '../components/Blog/BlogList/blogPost';
import Section from '../components/Container/Section';
import SEO from '../components/seo';
import Layout from '../components/Layout/layout';

const Blog = (data) => {
  const blogData = data.data.allDatoCmsBlogpost.edges;
  return (
    <Layout>
      <SEO
        title="Blog posts about agility and DevOps"
        description="Blog Post about all different aspects of agility. Fokusing on easy to follow how to's and best practices."
      />
      <Section>
        <h1 className={'heading'}>Blog posts</h1>
        <p> about agility and DevOps</p>
        <div>
          {blogData.map((post) => {
            return <BlogPost post={post.node} key={post.node.slug} />;
          })}
        </div>
      </Section>
    </Layout>
  );
};

export const query = graphql`
  {
    allDatoCmsBlogpost(
      filter: { meta: { status: { eq: "published" } } }
      sort: { fields: meta___firstPublishedAt, order: DESC }
    ) {
      edges {
        node {
          abstract
          title
          subtitle
          slug
          meta {
            firstPublishedAt(formatString: "DD. MMM YYYY")
            htmlFirstPublishedAt: firstPublishedAt(formatString: "YYYY-MM-DD")
          }
          blogimage {
            gatsbyImageData(width: 800, placeholder: TRACED_SVG, layout: FULL_WIDTH)
            alt
          }
        }
      }
    }
  }
`;

export default Blog;
