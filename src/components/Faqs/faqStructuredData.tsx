import PropTypes from 'prop-types'
import React from 'react'
import { JsonLd } from 'react-schemaorg'
import { Answer, FAQPage, Question } from 'schema-dts'

export default function FaqStructuredData({ data }) {
  const entities = data.items.map((item, id) => {
    const entity = {
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }
    console.log(entity)
    return entity
  })

  return (
    <JsonLd<FAQPage>
      item={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: { entities },
      }}
    />
  )
}

FaqStructuredData.propTypes = {
  data: PropTypes.object,
}
