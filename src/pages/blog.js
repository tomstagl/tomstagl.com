import { graphql } from 'gatsby';
import React from 'react';

import BlogPost from '../components/Blog/BlogList/blogPost';
import SEO from '../components/seo';
import Layout from '../components/Layout/layout';

const Blog = (data) => {
  const blogData = data.data.allDatoCmsBlogpost.edges;
  return (
    <Layout>
      <SEO
        title="Blog"
        description="Writing about platform engineering, leadership, and building at scale."
      />
      <section className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Blog</h1>
          <p className="text-slate-500 mb-8">Writing about platform engineering, leadership, and building at scale.</p>

          <div className="divide-y divide-slate-200">
            {blogData.map((post) => {
              return <BlogPost post={post.node} key={post.node.slug} />;
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allDatoCmsBlogpost(
      filter: { meta: { status: { eq: "published" } } }
      sort: { meta: { firstPublishedAt: DESC } }
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
            gatsbyImageData(width: 800, placeholder: BLURRED, layout: FULL_WIDTH)
            alt
          }
        }
      }
    }
  }
`;

export default Blog;
