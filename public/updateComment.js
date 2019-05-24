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

function showCommentTextarea(id) {
    const commentTextarea = document.querySelector(`#comment-textarea-${id}`);
    commentTextarea.classList.remove('hidden');
}

function hideCommentTextarea(id) {
    const commentTextarea = document.querySelector(`#comment-textarea-${id}`);
    commentTextarea.classList.add('hidden');
}