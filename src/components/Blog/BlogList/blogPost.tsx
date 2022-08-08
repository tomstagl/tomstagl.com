import React from 'react';
import { Link } from 'gatsby';

function BlogPost({ post }) {
  const readMoreLink = `/blog/${post.slug}`;
  return (
    <li className="mt-6">
      <time itemProp="datePublished" dateTime={post.meta.htmlFirstPublishedAt}>
        {post.meta.firstPublishedAt}
      </time>
      <Link activeClassName={'underline'} to={readMoreLink}>
        <h4 className="text-lg font-bold">{post.title}</h4>
      </Link>
      <div className="">{post.abstract}</div>
    </li>
  );
}

export default BlogPost;
