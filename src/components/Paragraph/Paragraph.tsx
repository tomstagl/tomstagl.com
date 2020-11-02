import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

import { H2 } from '../Container/Headers'

type ParagraphProps = {
  heading?: string
  text?: string
}

const Paragraph: FunctionComponent<ParagraphProps> = ({
  heading = 'What drives me',
  text = 'I love to see organisations, teams and individuals succeed in what they do. That is why I live and breathe agile practices; to unleash the very best in everyone. An agile transition requires a lot of practical and methodical know how, but even more than this, it requires experience. I have more than 14 years experience as SCRUM master and Agile Coach and I will make all my experience evailable for your organisation and teams.',
}) => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "running.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <H2>{heading}</H2>
      <div className="lg:flex lg:justify-center">
        <div className="bg-white lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded">
          <div className="lg:w-1/2 h-64 bg-cover lg:rounded lg:h-full">
            <Img
              className="h-64 lg:h-full rounded-t-lg lg:rounded"
              fluid={image.childImageSharp.fluid}
              alt="Person raising both arms to show triumph, Photo by bruce mars on Unsplash"
              imgStyle={{ objectFit: 'cover', objectPosition: '0% 25%' }}
            />
          </div>
          <div className="py-6 px-6 lg:py-12 lg:max-w-5xl lg:w-1/2">
            <h3 className="text-3xl text-gray-800 font-bold">
              Reaching <span className="text-teal-600">your</span> goals
            </h3>
            <p className="mt-4 text-gray-600">{text}</p>
            {/* <div className="mt-8">
              <a
                href="#"
                className="bg-teal-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Read more
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

Paragraph.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
}

export default Paragraph
