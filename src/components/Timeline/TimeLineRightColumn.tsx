import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

type TimeLineProps = {
  header?: string
  text?: string
}

const TimeLineRightColumn: FunctionComponent<TimeLineProps> = ({
  header,
  text,
}) => {
  return (
    <div className="w-2/5 px-2 py-10 ">
      {(header || text) && (
        <div className="flex flex-col w-full rounded-lg shadow-lg bg-white px-4 py-5">
          {header && (
            <div className="text-gray-600 mb-2 flex justify-between">
              <div className="font-bold">{header}</div>
            </div>
          )}
          {text && <div className="text-gray-600">{text}</div>}
        </div>
      )}
    </div>
  )
}

TimeLineRightColumn.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
}
export default TimeLineRightColumn
