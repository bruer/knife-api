function postComment() {
  
  const commentForm = document.querySelector('#commentForm');

  commentForm.addEventListener('submit', e => {
    
    e.preventDefault();
  
    const formData = new FormData(commentForm);

    fetch('/api/comment', {

      method: 'POST',
      body: formData

    }).then(response => {

      console.log(response.json());
        
      if(!response.ok){
        return Error(response.statusText);
      } 
      else {
        commentForm.reset();
      }

    }).catch(error => {
      console.error(error);
    })
  });
}

function deleteComment(id) {
  
  fetch(`/api/comment/${id}`, {

    method: 'DELETE'

  })
  .then(response => {

    if(!response.ok) {
      return Error(response.statusText);
    }
  })
  .catch(error => {

    console.error(error);
    
  });
}

function updateComment(id) {

  const editForm = document.querySelector(`#editCommentForm${id}`);

  editForm.addEventListener('submit', e => {
        
    e.preventDefault();
  
    const formData = new FormData(editForm);

    // formData.forEach((a, b) => { console.log(a) });

    const object = {};
    formData.forEach((value, key) => { object[key] = value });

    fetch(`/api/comment/${id}`, {

      method: 'PUT',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(response => {
        
      if(!response.ok){
        return Error(response.statusText)
      } 
      else {
        editForm.reset()
      }

    }).catch(error => {
      console.error(error)
    })
  });
}

function getAllComments() {
  
  const commentList = document.querySelector('#commentList');

  fetch('/api/comments', {

    method: 'GET'

  }).then(response => {
      
    if(!response.ok){
      console.log(response);
      return Error(response.statusText)
    } 
    else {
      return response.json()
    }
  })
  .then(comments => {
    
    let markup = '';
    
    comments.forEach(comment => {

      markup += `
      <div id='comment${comment.commentID}' class='comment-box'>
        <p>${comment.content}</p>
        <p>${comment.createdAt}</p>
        <a href='javascript:showEditCommentBox(${comment.commentID})'>
          Edit
        </a>
        <a
        href='http://localhost:8000/' 
        onclick='deleteComment(${comment.commentID})'>
          Delete
        </a>
        <div id='editCommentBox${comment.commentID}' class='hidden'>

          <form id='editCommentForm${comment.commentID}'>
            <textarea name='content'></textarea>
            <button type='submit'>Post</button>
          </form>

          <a href='javascript:hideEditCommentBox(${comment.commentID})'>
            Cancel
          </a>
        </div>
      </div>
      `;
      
    });
    
    commentList.innerHTML = markup;

    comments.forEach(comment => {

      updateComment(comment.commentID);

    });
    
  })
  .catch(error => {
    console.error(error)
  });
}

function showEditCommentBox(id) {
  const commentTextarea = document.querySelector(`#editCommentBox${id}`);
  commentTextarea.classList.remove('hidden');
}

function hideEditCommentBox(id) {
  const commentTextarea = document.querySelector(`#editCommentBox${id}`);
  commentTextarea.classList.add('hidden');
}