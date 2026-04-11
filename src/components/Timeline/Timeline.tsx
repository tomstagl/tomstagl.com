import PropTypes from 'prop-types';
import React, { FunctionComponent } from 'react';

const TimeLine: FunctionComponent<TimeLineProps> = ({ timeLineData }) => {
  return (
    <div className="py-8">
      <h2 className="pb-8 text-3xl font-bold tracking-tight text-slate-900 lg:text-center">My timeline</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200" />

        {timeLineData.map((entry, idx) => {
          const content = entry.left || entry.right;
          const isRight = !!entry.right;
          const year = entry.line?.year;

          return (
            <div
              key={idx}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-12"
            >
              {/* Year circle */}
              {year && (
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-blue-600 text-xs font-semibold text-blue-600 z-10">
                  {year}
                </div>
              )}

              {/* Content — left-aligned entries render in col 1, right-aligned in col 2 */}
              {!isRight ? (
                <>
                  <div className="md:text-right md:pr-12">
                    {content && (
                      <>
                        <h3 className="text-base font-semibold text-slate-900">{content.header}</h3>
                        <p className="mt-2 text-sm text-slate-600">{content.text}</p>
                      </>
                    )}
                  </div>
                  <div className="hidden md:block" />
                </>
              ) : (
                <>
                  <div className="hidden md:block" />
                  <div className="md:pl-12">
                    {content && (
                      <>
                        <h3 className="text-base font-semibold text-slate-900">{content.header}</h3>
                        <p className="mt-2 text-sm text-slate-600">{content.text}</p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface LeftColumnObject {
  header: string;
  text: string;
  blueTag?: string;
  redTag?: string;
}
interface LineColumnObject {
  year: number;
}
interface RightColumnObject {
  header: string;
  text: string;
}

interface EntryLineObject {
  left?: LeftColumnObject;
  line?: LineColumnObject;
  right?: RightColumnObject;
}
interface TimeLineProps {
  timeLineData: EntryLineObject[];
}

TimeLine.propTypes = {
  timeLineData: PropTypes.array.isRequired,
};
export default TimeLine;
