import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

type TimeLineLineColumnProps = {
  year: number
}

const TimeLineLineColumn: FunctionComponent<TimeLineLineColumnProps> = ({
  year,
}) => {
  return (
    <div className="w-1/5  flex justify-center">
      <div className="relative flex h-full w-1 bg-teal-300 items-center justify-center">
        <div className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-teal-300 leading-none text-center z-10 bg-white font-thin">
          <div>{year}</div>
        </div>
      </div>
    </div>
  )
}

TimeLineLineColumn.propTypes = {
  year: PropTypes.number.isRequired,
}

export default TimeLineLineColumn
