import React from 'react'
import { graphql } from 'gatsby'
import BlogTextBlock from '../components/Blog/blogTextBlock'
import BlogQuoteBlock from '../components/Blog/blogQuoteBlock'
import BlogCodeBlock from '../components/Blog/blogCodeBlock'
import BlogImageBlock from '../components/Blog/blogImageBlock'
import Layout from '../components/layout'

const Components = {
  text: BlogTextBlock,
  quote: BlogQuoteBlock,
  trennzeichen: BlogTextBlock,
  bild: BlogImageBlock,
  code: BlogCodeBlock,
}

export default function BlogPost({ data }) {
  const post = data.datoCmsBlogpost
  const { title, subtitle, abstract, content } = post

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
      <article>
        <header>
          <h1>{title}</h1>
          <h3>{subtitle}</h3>
          <pre>{abstract}</pre>
        </header>
        <div>{mapSections()}</div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    datoCmsBlogpost(slug: { eq: $slug }) {
      abstract
      title
      subtitle
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
            fluid {
              base64
              tracedSVG
              width
              height
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
