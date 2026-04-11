import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { StaticQuery, graphql } from 'gatsby';

/*
 * warning, does not return anything if an image is defined twice
 */

const Image = ({ imgName, className, credits }) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              parent {
                ... on File {
                  base
                }
              }
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.allImageSharp.edges.find((edge) => {
        if (edge.node.parent.base === imgName) {
          return true;
        }
      });
      if (!image) {
        return null;
      }

      return <GatsbyImage image={image.node.gatsbyImageData} className={className} alt={credits} />;
    }}
  />
);
export default Image;
