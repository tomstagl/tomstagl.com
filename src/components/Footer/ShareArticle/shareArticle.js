import React from 'react'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'

const ShareArticle = () => {
  return (
    <div className="flex justify-end items-center text-3xl">
      <a
        aria-label="twitter"
        className="px-4"
        rel="noopener noreferrer"
        target="_blank"
        href="https://twitter.com/herrstagl"
      >
        <FaTwitter className="text-teal-500" />
      </a>
      <a
        aria-label="linked In"
        rel="noopener noreferrer"
        target="_blank"
        href="https://at.linkedin.com/in/herrstagl"
      >
        <FaLinkedin className="text-teal-500" />
      </a>
    </div>
  )
}

export default ShareArticle
