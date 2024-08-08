import React from 'react'

function PostDetails({post}) {
    if(!post){
        return <div>Selecione um post para ver os detalhes</div>
    }
   return (
    <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </div>
  )
}

export default PostDetails