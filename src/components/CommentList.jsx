import React from 'react';
import '../css/CommentList.css';

function CommentList({ comments }) {
  return (
    <div className='comments'>
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <p>{comment.body}</p>
          <p>Author: {comment.author}</p>
          <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
