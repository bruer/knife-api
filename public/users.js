const allUsers = {
    users: ['#usersTemplate']
  }
  
  //Visa alla användare på sidan
  renderView(allUsers.users);

  const showUsers = document.querySelector('#usersList');

  fetch('/api/users', {

    method: 'GET'

  }).then(response => {
      
    if(!response.ok){
      console.log(response);
      return Error(response.statusText)
    } else {
    
     return response.json()
    }
  })
  .then(users => {
    console.log(users);
    let markup = '';
    users.forEach(user => {
      markup += `<li> ${user.username} </li>`;
    })
    
    showUsers.innerHTML = markup;
    console.log(markup);
    
  })
  .catch(error => {
    console.error(error)
  });