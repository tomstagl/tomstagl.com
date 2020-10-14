import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

import { H2, H3 } from '../Container/Headers'
import TimeLineLeftColumn from './TimeLineLeftColumn'
import TimeLineLineColumn from './TimeLineLineColumn'
import TimeLineRightColumn from './TimeLineRightColumn'

const TimeLine: FunctionComponent<TimeLineProps> = ({ timeLineData }) => {
  return (
    <div className="min-h-screen">
      <H2>My timeline</H2>
      <div className="min-h-screen flex justify-center">
        <div className="w-full mx-auto">
          {timeLineData.map((entry, idx) => (
            <div key={idx} className="flex flex-row w-full">
              {entry.left ? (
                <TimeLineLeftColumn
                  header={entry.left.header}
                  text={entry.left.text}
                  blueTag={entry.left.blueTag}
                  redTag={entry.left.redTag}
                />
              ) : (
                <TimeLineLeftColumn />
              )}
              {entry.line && <TimeLineLineColumn year={entry.line.year} />}
              {entry.right ? (
                <TimeLineRightColumn
                  header={entry.right.header}
                  text={entry.right.text}
                />
              ) : (
                <TimeLineRightColumn />
              )}
            </div>
          ))}
        </div>
      </div>
      <H3>Become a part of this story</H3>
    </div>
  )
}

interface LeftColumnObject {
  header: string
  text: string
  blueTag?: string
  redTag?: string
}
interface LineColumnObject {
  year: number
}
interface RightColumnObject {
  header: string
  text: string
}

interface EntryLineObject {
  left: LeftColumnObject
  line: LineColumnObject
  right: RightColumnObject
}
interface TimeLineProps {
  timeLineData: EntryLineObject[]
}

TimeLine.propTypes = {
  timeLineData: PropTypes.array.isRequired,
}
export default TimeLine
