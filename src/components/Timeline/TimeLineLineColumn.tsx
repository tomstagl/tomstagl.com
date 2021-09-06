import PropTypes from 'prop-types';
import React, { FunctionComponent } from 'react';

type TimeLineLineColumnProps = {
  year: number;
};

const TimeLineLineColumn: FunctionComponent<TimeLineLineColumnProps> = ({ year }) => {
  return (
    <div className="flex justify-center w-1/5">
      <div className="relative flex items-center justify-center w-1 h-full bg-teal-300">
        <div className="absolute z-10 flex flex-col justify-center w-24 h-24 font-thin leading-none text-center bg-white border-2 border-teal-300 rounded-full">
          <div>{year}</div>
        </div>
      </div>
    </div>
  );
};

TimeLineLineColumn.propTypes = {
  year: PropTypes.number.isRequired,
};

export default TimeLineLineColumn;
