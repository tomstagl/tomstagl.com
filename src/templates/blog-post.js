import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

import BlogTextBlock from '../components/Blog/blogTextBlock'
import BlogQuoteBlock from '../components/Blog/blogQuoteBlock'
import BlogCodeBlock from '../components/Blog/blogCodeBlock'
import BlogImageBlock from '../components/Blog/blogImageBlock'
import BlogSeperatorBlock from '../components/Blog/blogSeperatorBlock'
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
  console.log(typeof blogimage)
  const mapSections = () => {
    const sections = []
    content.forEach((item, index) => {
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
          <p className="text-sm text-gray-500">Published {meta.publishedAt}</p>
          <h3>{subtitle}</h3>
          {blogimage && <Img fluid={blogimage.fluid} className="rounded" />}
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
      }
      content {
        ... on DatoCmsText {
          model {
            apiKey
          }
          section
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
