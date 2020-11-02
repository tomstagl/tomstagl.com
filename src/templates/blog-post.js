import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import PropTypes from 'prop-types'
import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

import BlogCodeBlock from '../components/Blog/BlogEntry/BlogCodeBlock/blogCodeBlock'
import BlogImageBlock from '../components/Blog/BlogEntry/blogImageBlock'
import BlogQuoteBlock from '../components/Blog/BlogEntry/blogQuoteBlock'
import BlogSeperatorBlock from '../components/Blog/BlogEntry/blogSeperatorBlock'
/* use loadable components for lazy loading SSR */
import BlogTextBlock from '../components/Blog/BlogEntry/blogTextBlock'
import Section from '../components/Container/Section'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Components = {
  text: BlogTextBlock,
  quote: BlogQuoteBlock,
  trennzeichen: BlogSeperatorBlock,
  bild: BlogImageBlock,
  code: BlogCodeBlock,
}

export default function BlogPost({ data }) {
  const post = data.datoCmsBlogpost
  const { title, subtitle, abstract, content, blogimage, meta, slug } = post
  const siteUrl = 'https://tomstagl.com/blog/' + slug
  const hashTags = ['agility']

  const mapSections = () => {
    const sections = []
    content.forEach((item, index) => {
      // TODO: check optional chaining posibility
      if (
        item.model &&
        item.model.apiKey &&
        item.model.apiKey !== 'undefined'
      ) {
        const blockApiKey = item.model.apiKey
        sections.push(
          <section key={index + blockApiKey}>
            {React.createElement(Components[blockApiKey], { ...item })}
          </section>,
        )
      }
    })
    return sections
  }

  return (
    <Layout>
      <SEO title={title} />
      <Section>
        <span>
          <Link
            to="/blog/"
            className="font-light text-sm text-gray-700 hover:text-teal-500"
            activeClassName="text-teal-500 underline "
          >
            &lt; Back to Blog
          </Link>
        </span>
        <article className="prose md:mx-auto lg:prose-xl">
          <HelmetDatoCms seo={post.seoMetaTags} />
          <header>
            <p className="text-sm text-right font-thin text-gray-500">
              Published{' '}
              <time
                itemProp="datePublished"
                dateTime={meta.htmlFirstPublishedAt}
              >
                {meta.firstPublishedAt}
              </time>
            </p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {blogimage && (
              <figure>
                <Img fluid={blogimage.fluid} className="rounded" />
                {blogimage.title && <figcaption>{blogimage.title}</figcaption>}
              </figure>
            )}
            <p>{abstract}</p>
          </header>
          {mapSections()}
        </article>
      </Section>
      <Section>
        <div className="flex flex-row-reverse">
          <div className="mr-2">
            <TwitterShareButton
              url={siteUrl}
              title={subtitle}
              hashtags={hashTags}
              related={['@herrstagl']}
            >
              <TwitterIcon size={30} borderRadius={35} />
            </TwitterShareButton>
          </div>
          <div className="mr-2">
            <LinkedinShareButton url={siteUrl}>
              <LinkedinIcon size={30} borderRadius={35} />
            </LinkedinShareButton>
          </div>
          <div className="mr-2">
            <FacebookShareButton
              url={siteUrl}
              quote={abstract}
              hashtag={'#agility'}
            >
              <FacebookIcon size={30} borderRadius={35} />
            </FacebookShareButton>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    datoCmsBlogpost(
      slug: { eq: $slug }
      meta: { status: { eq: "published" } }
    ) {
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
        fluid(maxWidth: 640, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
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
            fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
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
`
