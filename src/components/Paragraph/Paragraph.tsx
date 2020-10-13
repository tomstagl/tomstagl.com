import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

import { H2 } from '../Container/Headers'

type ParagraphProps = {
  heading?: string
  text?: string
}

const Paragraph: FunctionComponent<ParagraphProps> = ({
  heading = 'What drives me',
  text = 'I love to see organisations, teams and individuals suceed in what they do. That is why I live and breathe agile practices; to unleash the very best in everyone. An agile transition requires a lot of practical and methodical know how, but even more than this, it requires experience. I bring with me more than 15 years experience as SCRUM master.',
}) => {
  return (
    <>
      <H2>{heading}</H2>
      <div className="lg: pb-12 lg:flex lg:justify-center">
        <div className="bg-white lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
          <div className="lg:w-1/2">
            <div
              className="h-64 bg-cover lg:rounded-lg lg:h-full"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80')",
              }}
            ></div>
          </div>
          <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
            <h2 className="text-3xl text-gray-800 font-bold">
              Reaching <span className="text-teal-600">your</span> goals drives
              me
            </h2>
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
