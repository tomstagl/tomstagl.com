import PropTypes from 'prop-types';
import React, { FunctionComponent } from 'react';

type TimeLineProps = {
  header?: string;
  text?: string;
};

const TimeLineRightColumn: FunctionComponent<TimeLineProps> = ({ header, text }) => {
  return (
    <div className="w-2/5 px-2 py-10 ">
      {(header || text) && (
        <div className="flex flex-col w-full px-4 py-5 bg-white rounded-lg shadow-lg">
          {header && (
            <div className="flex justify-between mb-2 text-gray-600">
              <div className="font-bold">{header}</div>
            </div>
          )}
          {text && <div className="text-gray-600">{text}</div>}
        </div>
      )}
    </div>
  );
};

TimeLineRightColumn.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
};
export default TimeLineRightColumn;
