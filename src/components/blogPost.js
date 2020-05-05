import React from 'react'

const BlogPost = (props) => {
  console.log(props.post)

  return (
    <div className="pb-4">
      <h2 id={props.key}>{props.post.title}</h2>
    </div>
  )
}

export default BlogPost
