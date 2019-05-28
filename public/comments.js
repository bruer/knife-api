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
      if(!response.ok)
      {
        return Error(response.statusText);
      } 
      else 
      {
        form.reset();
        renderView(views.loggedin);
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
    fetch(`/api/comment/${id}`, 
    {
      method: 'DELETE'
    })
    .then(response => {
      if(!response.ok) 
      {
        return Error(response.statusText);
      }
      else
      {
        renderView(views.loggedin);
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
        form.reset();
        renderView(views.loggedin);
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
      let loggedin = true;

      console.log(ping);
      
      if(ping)
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
              <p>${comment.createdBy}</p>
            </div>
          `;
          if(ping)
          {
            markup += commentFeatures(comment.commentID);
          }
    });

    commentList.innerHTML = markup;

    if(ping)
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
    <button id='deleteCommentBtn${id}'>
      Delete
    </button>
    <div id='commentBox${id}' class='hidden'>
     <form id='editCommentForm${id}'>
       <textarea name='content'></textarea><br>
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

function show(id) {
  const commentTextarea = document.querySelector(`#commentBox${id}`);
  commentTextarea.classList.remove('hidden');
}

function hide(id) {
  const commentTextarea = document.querySelector(`#commentBox${id}`);
  commentTextarea.classList.add('hidden');
}