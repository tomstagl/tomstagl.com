import React, { lazy, Suspense } from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Layout from '../components/layout'

const BlogTextBlock = lazy(() =>
  import('../components/Blog/BlogEntry/blogTextBlock'),
)
const BlogQuoteBlock = lazy(() =>
  import('../components/Blog/BlogEntry/blogQuoteBlock'),
)
const BlogCodeBlock = lazy(() =>
  import('../components/Blog/BlogEntry/BlogCodeBlock/blogCodeBlock'),
)
const BlogImageBlock = lazy(() =>
  import('../components/Blog/BlogEntry/blogImageBlock'),
)
const BlogSeperatorBlock = lazy(() =>
  import('../components/Blog/BlogEntry/blogSeperatorBlock'),
)

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
      <span>
        <Link
          to="/blog/"
          className="font-light text-sm text-gray-700 hover:text-teal-500"
          activeClassName="text-teal-500 underline "
        >
          &lt; Back to Blog
        </Link>
      </span>
      <article className="prose lg:prose-xl">
        <HelmetDatoCms seo={post.seoMetaTags} />
        <header>
          <h1>{title}</h1>
          <p className="text-sm text-right font-thin text-gray-500">
            Published {meta.publishedAt}
          </p>
          <h3>{subtitle}</h3>
          {blogimage && (
            <figure>
              <Img fluid={blogimage.fluid} className="rounded" />
              {blogimage.title && <figcaption>{blogimage.title}</figcaption>}
            </figure>
          )}
          <p>{abstract}</p>
        </header>
        <Suspense fallback="<div>Loading...</div>">{mapSections()}</Suspense>
      </article>
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
        publishedAt(formatString: "DD. MMM YYYY")
      }
      blogimage {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
        title
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
