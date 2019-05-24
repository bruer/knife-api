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

    console.log(id);
  
    fetch(`/api/comment/${id}`, {
  
      method: 'PUT'
  
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

function showEditCommentBox(id) {
    const commentTextarea = document.querySelector(`#editCommentBox${id}`);
    commentTextarea.classList.remove('hidden');
}

function hideEditCommentBox(id) {
    const commentTextarea = document.querySelector(`#editCommentBox${id}`);
    commentTextarea.classList.add('hidden');
}