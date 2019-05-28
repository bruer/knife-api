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
        renderView(views.loggedinfeed);
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
          console.log('comment: ' + comment.createdBy);
          markup += `
          <li id="comment${comment.commentID}" class="list-group-item" >
          <small>by user: ${comment.createdBy}</small><br>
          ${comment.content}<br>
          <small>${comment.createdAt}</small>
          </li>
          `;
        });
        commentList.innerHTML = markup;
  })
  .catch(error => 
    {
      console.error(error)
    });
}

function showCommentsLoggedIn(id) {
  
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
      // console.log(ping);
      if(ping)
      {
        showPostComment(id);
        bindPostCommentEvents(id);
      }

      fetch('/api/session_user')
          .then(response => 
            {
            if(response.ok) 
            {
              return response.json();
            }
          })
          .then(data => 
            {
            let markup = '';
            comments.forEach(comment => 
              {
                markup += `
                <li id="comment${comment.commentID}" class="list-group-item" >
                <small>by user: ${comment.createdBy}</small><br>
                ${comment.content}<br>
                <small>${comment.createdAt}</small>
                </li>
                `;
                if(ping && comment.createdBy == data['userID'])
                  {
                    markup += commentFeatures(comment.commentID);
                  }
              });
              
              commentList.innerHTML = markup;

              comments.forEach(comment => 
                {
                  if(ping && comment.createdBy == data['userID'])
                  {
                    bindDeleteCommentEvents(comment.commentID);
                    bindUpdateCommentEvents(comment.commentID);
                  }
                });
          })
  })
  .catch(error => 
    {
      console.error(error)
    });
}

function commentFeatures(id) {
  return `
    <div class="row d-flex justify-content-start">
      <div class="col justify-content-start">
        <a href='javascript:show(${id})' class="text-warning">
          Edit
        </a>
        <a href='http://localhost:8000/'
          id='deleteCommentBtn${id}' class="text-warning">
          Delete
        </a>
      </div>
    </div>
    <div id='commentBox${id}' class='hidden mb-2'>
     <form id='editCommentForm${id}'>
      <div class="form-group">
      <textarea name='content' class="form-control"></textarea>
      </div>
       <button type='submit' class="btn btn-success btn-sm">
          Post edit
       </button>
       <a href='javascript:hide(${id})' class=" btn btn-secondary btn-sm">
          Cancel
       </a>
     </form>
    </div>
  `;
}

function showPostComment(id) {
  const postComment = document.querySelector(`#postComment${id}`);
  postComment.innerHTML = `
    <a href='javascript:show(${id})' class="text-warning">
       Write a comment
    </a>
    <div id='commentBox${id}' class='hidden'>
      <form id="commentForm${id}">
        <div class="form-group">
          <textarea class="form-control" name="content"></textarea>
        </div>
        <button class="btn btn-success btn-sm" type="submit">
           Post comment
        </button>
        <a href='javascript:hide(${id})' class="text-secondary">
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