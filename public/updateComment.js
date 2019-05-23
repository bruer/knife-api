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