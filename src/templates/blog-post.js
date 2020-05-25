import React from 'react'
import { graphql } from 'gatsby'
import BlogTextBlock from '../components/Blog/blogTextBlock'
import BlogQuoteBlock from '../components/Blog/blogQuoteBlock'
import Layout from '../components/layout'

const Components = {
  text: BlogTextBlock,
  quote: BlogQuoteBlock,
  trennzeichen: BlogTextBlock,
}

export default function BlogPost({ data }) {
  const post = data.datoCmsBlogpost
  const title = post.title
  const subtitle = post.subtitle
  const abstract = post.abstract
  const content = post.content

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
      <div>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <pre>{abstract}</pre>
        <article>{mapSections()}</article>
      </div>
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
        }
        ... on DatoCmsQuote {
          quote
          author
          model {
            apiKey
          }
        }
      }
    }
  }
`
