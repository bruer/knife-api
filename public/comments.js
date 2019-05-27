function bindPostCommentEvents(id) {
  const form = document.querySelector(`#commentForm${id}`);
  form.addEventListener('submit', e => 
  {
    e.preventDefault();
    const formData = new FormData(form);
    fetch(`/api/entry/${id}/comment`, 
    {
      method: 'POST',
      body: formData
    })
    .then(response => 
      {
      console.log(response.json());
      if(!response.ok)
      {
        return Error(response.statusText);
      } 
      else 
      {
        form.reset();
      }
    })
    .catch(error => 
      {
        console.error(error);
      });
  });
}

function bindDeleteCommentEvents(id) {
  const btn = document.querySelector(`#deleteCommentBtn${id}`);
  btn.addEventListener('click', () => 
  {
    console.log(id);
    fetch(`/api/comment/${id}`, 
    {
      method: 'DELETE'
    })
    .then(response => {
      if(!response.ok) 
      {
        return Error(response.statusText);
      }
    })
    .catch(error => 
      {
        console.error(error);
      });
  });
}

function bindUpdateCommentEvents(id) {
  const form = document.querySelector(`#editCommentForm${id}`);
  form.addEventListener('submit', e => 
  {      
    e.preventDefault();
    const formData = new FormData(form);

    // formData.forEach((a, b) => { console.log(a) });

    const object = {};
    formData.forEach((value, key) => 
    { 
      object[key] = value 
    });
    fetch(`/api/comment/${id}`, 
    {
      method: 'PUT',
      body: JSON.stringify(object),
      headers: 
      {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {    
      if(!response.ok)
      {
        return Error(response.statusText)
      } 
      else 
      {
        form.reset()
      }
    })
    .catch(error => 
      {
        console.error(error)
      });
  });
}

function showComments(id) {
  const commentList = document.querySelector(`#commentList${id}`);
  fetch(`/api/entry/${id}/comments`, 
  {
    method: 'GET'
  })
  .then(response => 
    {
    if(!response.ok)
    {
      return Error(response.statusText);
    } 
    else 
    {
      return response.json();
    }
  })
  .then(comments => 
    {
    let markup = '';
    comments.forEach(comment => 
      {
      markup += `
        <div id='comment${comment.commentID}' class='comment-box'>
          <p>${comment.content}</p>
          <p>${comment.createdAt}</p>
          <a href='javascript:show(${comment.commentID})'>
             Edit
          </a>
          <a href='http://localhost:8000/'
             id='deleteCommentBtn${comment.commentID}'>
             Delete
          </a>
          <div id='commentBox${comment.commentID}' class='hidden'>
            <form id='editCommentForm${comment.commentID}'>
              <textarea name='content'></textarea>
              <button type='submit'>
                 Post edit
              </button>
              <a href='javascript:hide(${comment.commentID})'>
                 Cancel
              </a>
            </form>
          </div>
        </div>
        `;
        // markup += buildComment(comment.commentID, comment.content, comment.createdAt);
    });
    commentList.innerHTML = markup;
    comments.forEach(comment => 
      {
        bindDeleteCommentEvents(comment.commentID);
        bindUpdateCommentEvents(comment.commentID);
      });
  })
  .catch(error => 
    {
      console.error(error)
    });
}

function showComments2(id) {
  const commentList = document.querySelector(`#commentList${id}`);
  fetch(`/api/entry/${id}/comments`, 
  {
    method: 'GET'
  })
  .then(response => 
    {
    if(!response.ok)
    {
      return Error(response.statusText);
    } 
    else 
    {
      return response.json();
    }
  })
  .then(comments => 
    {

      // fetch('/api/ping', 
      // {
      //   method: 'GET'
      // })
      // .then(response => 
      //   {
      //     console.log(response);
      //     if(!response.ok)
      //     {
      //       return Error(response.statusText);
      //     }
      //   })
      //   .catch(error => 
      //     {
      //       console.error(error)
      //     });
      
      let loggedin = true;
      
      if(loggedin)
      {
        showPostComment(id);
        bindPostCommentEvents(id);
      }
      let markup = '';
      comments.forEach(comment => 
        {
          markup += `
            <div id='comment${comment.commentID}' class='comment-box'>
              <p>${comment.content}</p>
              <p>${comment.createdAt}</p>
            </div>
          `;
          if(loggedin)
          {
            markup += commentFeatures(comment.commentID);
          }
    });

    commentList.innerHTML = markup;

    if(loggedin)
    {
      comments.forEach(comment => 
        {
          bindDeleteCommentEvents(comment.commentID);
          bindUpdateCommentEvents(comment.commentID);
        });
    }
  })
  .catch(error => 
    {
      console.error(error)
    });
}

function commentFeatures(id) {
  return `
    <a href='javascript:show(${id})'>
      Edit
    </a>
    <a href='http://localhost:8000/'
      id='deleteCommentBtn${id}'>
      Delete
    </a>
    <div id='commentBox${id}' class='hidden'>
     <form id='editCommentForm${id}'>
       <textarea name='content'></textarea>
       <button type='submit'>
          Post edit
       </button>
       <a href='javascript:hide(${id})'>
          Cancel
       </a>
     </form>
    </div>
  `;
}

function showPostComment(id) {
  const postComment = document.querySelector(`#postComment${id}`);
  postComment.innerHTML = `
    <a href='javascript:show(${id})'>
       Write a comment
    </a>
    <div id='commentBox${id}' class='hidden'>
      <form id="commentForm${id}">
        <textarea name="content"></textarea><br>
        <button type="submit">
           Post comment
        </button>
        <a href='javascript:hide(${id})'>
           Cancel
        </a>
      </form>
    </div>`;
}

// function buildComment(id, content, date) {
//   return `
//     <div id='comment${id}' class='comment-box'>
//       <p>${content}</p>
//       <p>${date}</p>
//       <a href='javascript:showCommentBox(${id})'>
//         Edit
//       </a>
//       <a
//       href='http://localhost:8000/' 
//       onclick='deleteComment(${id})'>
//         Delete
//       </a>
//       <div id='editCommentBox${id}' class='hidden'>
//         <form id='editCommentForm${id}'>
//           <textarea name='content'></textarea>
//           <button type='submit'>Post</button>
//         </form>
//         <a href='javascript:hideCommentBox(${id})'>
//           Cancel
//         </a>
//       </div>
//     </div>
//   `;
// }

function show(id) {
  const commentTextarea = document.querySelector(`#commentBox${id}`);
  commentTextarea.classList.remove('hidden');
}

function hide(id) {
  const commentTextarea = document.querySelector(`#commentBox${id}`);
  commentTextarea.classList.add('hidden');
}