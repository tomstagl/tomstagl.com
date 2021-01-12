import { Collapse } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import FaqStructuredData from './faqStructuredData'
import FaqTitle from './faqTitle'

import 'antd/lib/collapse/style/index.css'

const { Panel } = Collapse

const FaqList = ({ data }) => {
  return (
    <>
      <FaqTitle
        title={data.title}
        colorTitle={data.colorTitle}
        subtitle={data.subtitle}
        subtitle2={data.subtitle2}
      />

      <Collapse expandIconPosition="left">
        {data.items.map((item, idx) => {
          return (
            <Panel
              header={item.question}
              key={idx}
              className="my-3 mt-1 font-medium text-base"
            >
              <p className="text-gray-800 font-normal md:pl-4">{item.answer}</p>
            </Panel>
          )
        })}
      </Collapse>
      <FaqStructuredData data={data} />
    </>
  )
}

FaqList.propTypes = {
  data: PropTypes.object.isRequired,
}

export default FaqList
