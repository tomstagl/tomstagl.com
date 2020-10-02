import React from 'react'
import PropTypes from 'prop-types'
import Image from './image'

const Card = ({ heading, text, image }) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
      >
        <Image className="min-h-full" imgName={image} />
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{heading}</div>
          <p className="text-gray-700 text-base">{text}</p>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

Card.defaultProps = {
  heading: 'Can coffee make you a better developer?',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,exercitationem praesentium nihil.',
  image: 'okrs.jpg',
}

export default Card
