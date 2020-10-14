import React, { FunctionComponent } from 'react'
import { H2 } from '../Container/Headers'
import TimeLineLeftColumn from './TimeLineLeftColumn'
import TimeLineLineColumn from './TimeLineLineColumn'
import TimeLineRightColumn from './TimeLineRightColumn'
import PropTypes from 'prop-types'

const timelineData = [
  {
    left: {
      header: 'Bla',
      text: 'blu',
      blueTag: 'blue',
    },
    line: {
      year: 2020,
    },
    right: {
      header: 'bla2',
      text: 'blabla',
    },
  },
  {
    left: {
      header: 'Bla',
      text: 'blu',
      blueTag: 'blue',
    },
    line: {
      year: 2020,
    },
    right: {
      header: 'bla2',
      text: 'blabla',
    },
  },
  {
    left: {
      header: 'Bla',
      text: 'blu',
      blueTag: 'blue',
    },
    line: {
      year: 2020,
    },
    right: {
      header: 'bla2',
      text: 'blabla',
    },
  },
  {
    left: {
      header: 'Bla',
      text: 'blu',
      blueTag: 'blue',
    },
    line: {
      year: 2020,
    },
    right: {
      header: 'bla2',
      text: 'blabla',
    },
  },
]

type TimeLineProps = {
  timeLineData: array
}

const TimeLine: FunctionComponent<TimeLineProps> = ({
  timeLineData = timelineData,
}) => {
  return (
    <div className="min-h-screen">
      <H2>My timeline</H2>
      <div className="min-h-screen flex justify-center">
        <div className="w-full md:w-2/3 mx-auto">
          {timeLineData.forEach((entry: any, idx: number) => (
            <div key={idx} className="flex flex-row w-full">
              {console.log(entry)}
              {entry.left && (
                <TimeLineLeftColumn
                  header={entry.left.header}
                  text={entry.left.text}
                  blueTag={entry.left.blueTag}
                  redTag={entry.left.redTag}
                />
              )}
              {entry.line && <TimeLineLineColumn year={entry.line.year} />}
              {entry.right && (
                <TimeLineRightColumn
                  header={entry.right.header}
                  text={entry.right.text}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

TimeLine.propTypes = {
  timeLineData: PropTypes.array,
}
export default TimeLine
