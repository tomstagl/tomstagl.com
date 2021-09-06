import PropTypes from 'prop-types';
import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { FAQPage } from 'schema-dts';

export default function FaqStructuredData({ data }) {
  const mainEntity = data.items.map((item, id) => {
    return {
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    };
  });

  return (
    <JsonLd<FAQPage>
      item={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity,
      }}
    />
  );
}

FaqStructuredData.propTypes = {
  data: PropTypes.object,
};
