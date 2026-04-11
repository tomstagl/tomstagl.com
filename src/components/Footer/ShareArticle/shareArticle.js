import PropTypes from 'prop-types';
import React from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const ShareArticle = ({ className = 'justify-end' }) => {
  return (
    <div className={`flex items-center text-3xl ${className}`}>
      <a
        aria-label="twitter"
        className="pr-2"
        rel="noopener noreferrer"
        target="_blank"
        href="https://twitter.com/herrstagl"
      >
        <FaTwitter className="text-slate-500 hover:text-slate-700 transition-colors" />
      </a>
      <a
        aria-label="linked In"
        className="pl-2"
        rel="noopener noreferrer"
        target="_blank"
        href="https://at.linkedin.com/in/herrstagl"
      >
        <FaLinkedin className="text-slate-500 hover:text-slate-700 transition-colors" />
      </a>
    </div>
  );
};

ShareArticle.propTypes = {
  className: PropTypes.string,
};

export default ShareArticle;
