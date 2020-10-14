import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

type TimeLineLeftColumnProps = {
  header?: string
  text?: string
  blueTag?: string
  redTag?: string
}

const TimeLineLeftColumn: FunctionComponent<TimeLineLeftColumnProps> = ({
  header,
  text,
  blueTag,
  redTag,
}) => {
  return (
    <div className="w-2/5 px-2 py-10">
      {(header || text) && (
        <div className="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
          <div className="text-gray-600 mb-2 flex justify-between">
            <div className="font-bold">{header}</div>
            <div className="flex flex-row">
              {blueTag && (
                <button className="text-blue-500 mr-2 hover:text-blue-300 transition duration-200">
                  <i className="far fa-edit">{blueTag}</i>
                </button>
              )}
              {redTag && (
                <button className="text-red-500 hover:text-red-300 transition duration-200">
                  <i className="far fa-trash-alt">{redTag}</i>
                </button>
              )}
            </div>
          </div>
          <div className="text-gray-600">{text}</div>
        </div>
      )}
    </div>
  )
}

TimeLineLeftColumn.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  blueTag: PropTypes.string,
  redTag: PropTypes.string,
}
export default TimeLineLeftColumn
