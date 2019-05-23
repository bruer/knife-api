  const views = {
    login: ['#loginFormTemplate', '#registerFormTemplate', '#entriesTemplate', ], 

    loggedin: ['#entriesTemplate', '#usersTemplate', '#commentsTemplate']
  }
  
  function renderView(view) {
    // 1. Definera ett target
    const target = document.querySelector('#renderTarget');
    target.innerHTML = '';
  
    // 2 Loopa igenom vår "view"
    view.forEach(template => {
      // 3. hämta innehållet i tampleten
      const templateMarkup = document.querySelector(template).innerHTML;
      
      // 4. Skapa en div 
      const div = document.createElement('div');
      
      // 4.2 Fyll diven med innehåll
      div.innerHTML = templateMarkup;
      
      // 5. Lägg in diven i target
      target.append(div)

      // 6. Check for data loading dependencies
      if (template === '#entriesTemplate') { showAllEntries(); }
      if (template === '#usersTemplate') { showAllUsers(); }
      if (template === '#commentsTemplate') { showAllComments(); }

      // 7. Bind Events
      if (template === '#registerFormTemplate') { bindRegisterEvents(); }
      if (template === '#loginFormTemplate') { bindLoginEvents(); }
      if (template === '#logOut') { bindLogoutEvents(); }
    });
  }

renderView(views.login)


// REGGA ANVÄNDARE
function bindRegisterEvents() {
  const registerForm = document.querySelector('#RegisterForm')
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
  
    const formData = new FormData(registerForm)

    fetch('/api/user', {

      method: 'POST',
      body: formData

    }).then(response => {
        
      if(!response.ok){
        return Error(response.statusText)
      } else {
        return response.json()
        
      }
    }).catch(error => {
      console.error(error)
    })
  })
}

// LOGGA IN
function bindLoginEvents() {
  const loginForm = document.querySelector('#loginForm')
  
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(loginForm)
   
    fetch('/api/login', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if(!response.ok){
        return Error(response.statusText)
      } else {
        return response.json();
      }
    })
    .then(data => {
      renderView(views.loggedin);
    })
    .catch(error => {
      console.error(error)
    })
  })
}

//Visa alla entries på startsidan
function showAllEntries() {
  const showEntries = document.querySelector('#entryList');

  fetch('/api/entries', {

    method: 'GET'

  }).then(response => {
      
    if(!response.ok){
      console.log(response);
      return Error(response.statusText)
    } else {
    
      return response.json()
    }
  })
  .then(entries => {
    console.log(entries);
    let markup = '';
    entries.forEach(entry => {
      markup += `<li> ${entry.title}<br/>
      ${entry.content} <br/>
      ${entry.createdAt} <br/>
      </li>`;
    })
    
    showEntries.innerHTML = markup;
    console.log(markup);
    
  })
  .catch(error => {
    console.error(error)
  }); 
}

//Visa alla användare på sidan

function showAllUsers() {
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
}

// LOGGA UT
function bindLogoutEvents() {
  const logoutBtn = document.querySelector('#logoutBtn')

  console.log(logoutBtn);
  
  logoutBtn.addEventListener('click', e =>{
    e.preventDefault();
  

    fetch('/api/logout').then(() =>
      renderView(views.login)
    )
    .catch(error => {
      console.error(error)
    });
  
  })
}




})
.catch(error => {
  console.error(error)
});
}

function showAllComments() {
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
}

