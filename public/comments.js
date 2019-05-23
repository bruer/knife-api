const template = {
    comments: ['#commentsTemplate']
  }

  renderView(template.comments);

  const showComments = document.querySelector('#commentList');

  fetch('/api/comments', {

    method: 'GET'

  }).then(response => {
      
    if(!response.ok){
      console.log(response);
      return Error(response.statusText)
    } else {
    
     return response.json()
    }
  })
  .then(comments => {
    let markup = '';
    comments.forEach(comment => {
      markup += `<li> ${comment.content} </li>`;
    })
    
    showComments.innerHTML = markup;
    
  })
  .catch(error => {
    console.error(error)
  });