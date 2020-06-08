import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

import BlogTextBlock from '../components/Blog/BlogEntry/blogTextBlock'
import BlogQuoteBlock from '../components/Blog/BlogEntry/blogQuoteBlock'
import BlogCodeBlock from '../components/Blog/BlogEntry/BlogCodeBlock/blogCodeBlock'
import BlogImageBlock from '../components/Blog/BlogEntry/blogImageBlock'
import BlogSeperatorBlock from '../components/Blog/BlogEntry/blogSeperatorBlock'
import Layout from '../components/layout'

const Components = {
  text: BlogTextBlock,
  quote: BlogQuoteBlock,
  trennzeichen: BlogSeperatorBlock,
  bild: BlogImageBlock,
  code: BlogCodeBlock,
}

export default function BlogPost({ data }) {
  const post = data.datoCmsBlogpost
  const { title, subtitle, abstract, content, blogimage, meta } = post
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
      <article>
        <header>
          <h1>{title}</h1>
          <p className="text-sm text-right font-thin text-gray-500">
            Published {meta.publishedAt}
          </p>
          <h3>{subtitle}</h3>
          {blogimage && <Img fluid={blogimage.fluid} className="rounded" />}
          {blogimage.title && (
            <p className="text-sm font-thin text-gray-500 text-center pb-2">
              {blogimage.title}
            </p>
          )}
          <p className="font-serif">{abstract}</p>
        </header>
        {mapSections()}
      </article>
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
      meta {
        publishedAt(fromNow: true)
      }
      blogimage {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
        title
      }
      content {
        ... on DatoCmsText {
          model {
            apiKey
          }
          section
          sectionTitle
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
