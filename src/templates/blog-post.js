import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import PropTypes from 'prop-types';
import React from 'react';
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import BlogCodeBlock from '../components/Blog/BlogEntry/BlogCodeBlock/blogCodeBlock';
import BlogImageBlock from '../components/Blog/BlogEntry/blogImageBlock';
import BlogQuoteBlock from '../components/Blog/BlogEntry/blogQuoteBlock';
import BlogSeperatorBlock from '../components/Blog/BlogEntry/blogSeperatorBlock';
/* use loadable components for lazy loading SSR */
import BlogTextBlock from '../components/Blog/BlogEntry/blogTextBlock';
import Section from '../components/Container/Section';
import SEO from '../components/seo';
import Layout from '../components/Layout/layout';

const Components = {
  text: BlogTextBlock,
  quote: BlogQuoteBlock,
  trennzeichen: BlogSeperatorBlock,
  bild: BlogImageBlock,
  code: BlogCodeBlock,
};

function BlogPost({ data }) {
  const post = data.datoCmsBlogpost;
  const { title, subtitle, abstract, content, blogimage, meta, slug } = post;
  const gatsbyBlogImage = getImage(blogimage);
  const siteUrl = 'https://tomstagl.com/blog/' + slug + '/';
  const hashTags = ['platformengineering'];

  const mapSections = () => {
    const sections = [];
    content.forEach((item, index) => {
      // TODO: check optional chaining posibility
      if (item.model && item.model.apiKey && item.model.apiKey !== 'undefined') {
        const blockApiKey = item.model.apiKey;
        sections.push(
          <section key={index + blockApiKey}>
            {React.createElement(Components[blockApiKey], { ...item })}
          </section>,
        );
      }
    });
    return sections;
  };

  return (
    <Layout>
      <SEO title={title} />
      <Section>
        <span>
          <Link
            to="/blog/"
            className="text-sm font-light text-slate-500 hover:text-slate-700"
            activeClassName="text-slate-700 underline"
          >
            &lt; Back to Blog
          </Link>
        </span>
        <article className="prose md:mx-auto lg:prose-xl">
          <HelmetDatoCms seo={post.seoMetaTags} />
          <header>
            <p className="text-sm text-slate-400 text-right">
              Published{' '}
              <time itemProp="datePublished" dateTime={meta.htmlFirstPublishedAt}>
                {meta.firstPublishedAt}
              </time>
            </p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {gatsbyBlogImage && (
              <figure>
                <GatsbyImage
                  image={gatsbyBlogImage}
                  className="rounded"
                  title={post.title}
                  alt={blogimage.alt}
                />
                {blogimage.title && <figcaption>{blogimage.title}</figcaption>}
              </figure>
            )}
            <p>{abstract}</p>
          </header>
          {mapSections()}
        </article>
      </Section>
      <Section>
        <div className="flex gap-2 justify-end">
          <LinkedinShareButton url={siteUrl}>
            <LinkedinIcon size={30} borderRadius={35} />
          </LinkedinShareButton>
          <TwitterShareButton
            url={siteUrl}
            title={subtitle}
            hashtags={hashTags}
            related={['@herrstagl']}
          >
            <TwitterIcon size={30} borderRadius={35} />
          </TwitterShareButton>
        </div>
      </Section>
    </Layout>
  );
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query ($slug: String!) {
    datoCmsBlogpost(slug: { eq: $slug }, meta: { status: { in: ["published", "updated"] } }) {
      abstract
      title
      subtitle
      slug
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      meta {
        firstPublishedAt(formatString: "DD. MMM YYYY")
        htmlFirstPublishedAt: firstPublishedAt(formatString: "YYYY-MM-DD")
      }
      blogimage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        title
        alt
      }
      content {
        ... on DatoCmsText {
          sectionTitle
          sectionNode {
            childMarkdownRemark {
              html
            }
          }
          model {
            apiKey
          }
        }
        ... on DatoCmsTrennzeichen {
          model {
            apiKey
          }
        }
        ... on DatoCmsBild {
          model {
            apiKey
          }
          bild {
            alt
            title
            gatsbyImageData(width: 600, imgixParams: { fm: "jpg", auto: "compress" }, placeholder: BLURRED)
          }
        }
        ... on DatoCmsQuote {
          quote
          author
          model {
            apiKey
          }
        }
        ... on DatoCmsCode {
          model {
            apiKey
          }
          codeblock
          language
        }
        ... on DatoCmsVideo {
          id
          model {
            apiKey
          }
          video {
            url
            title
            provider
            providerUid
            thumbnailUrl
            width
            height
          }
        }
      }
    }
  }
`;

export default React.memo(BlogPost);
