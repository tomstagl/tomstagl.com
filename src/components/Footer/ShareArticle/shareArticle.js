import PropTypes from 'prop-types'
import React from 'react'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'

const ShareArticle = ({ className }) => {
  return (
    <div className={`flex items-center text-3xl ${className}`}>
      <a
        aria-label="twitter"
        className="px-2"
        rel="noopener noreferrer"
        target="_blank"
        href="https://twitter.com/herrstagl"
      >
        <FaTwitter className="text-teal-500" />
      </a>
      <a
        aria-label="linked In"
        className="px-2"
        rel="noopener noreferrer"
        target="_blank"
        href="https://at.linkedin.com/in/herrstagl"
      >
        <FaLinkedin className="text-teal-500" />
      </a>
    </div>
  )
}

ShareArticle.propTypes = {
  className: PropTypes.string,
}

ShareArticle.defaultProps = {
  className: 'justify-end',
}
export default ShareArticle
