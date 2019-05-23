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