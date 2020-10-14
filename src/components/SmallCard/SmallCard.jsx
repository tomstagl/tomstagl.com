import React from 'react'
import PropTypes from 'prop-types'
import Image from '../Card/image'

const SmallCard = ({ title, text, image, imageCredits, className }) => {
  return (
    <div
      className={`max-w-xs rounded overflow-hidden shadow-lg m-2 ${className}`}
    >
      <div className="h-56">
        <Image imgName={image} className="h-full" credits={imageCredits} />
      </div>
      <div className="px-6 py-4 h-56">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-grey-darker text-base">{text}</p>
      </div>
    </div>
  )
}

SmallCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageCredits: PropTypes.string,
  className: PropTypes.string,
}

SmallCard.defaultProps = {
  title: 'Dummy title',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil',
  image: 'okrs.jpg',
  imageCredits: '',
  className: '',
}

export default SmallCard
