  const views = {
    login: ['#loginFormTemplate', '#entriesTemplate'],
    registrer: ['#registerFormTemplate', '#entriesTemplate' ],
    loggedin: ['#entriesTemplate', '#usersTemplate', '#newPostFormTemplate', '#logout'] 
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
      div.setAttribute('class', 'row justify-content-center');
      
      // 4.2 Fyll diven med innehåll
      div.innerHTML = templateMarkup;
      
      // 5. Lägg in diven i target
      target.append(div)

      // 6. Check for data loading dependencies
      if (template === '#entriesTemplate') { showAllEntries(); }
      if (template === '#usersTemplate') { showAllUsers(); }
      if (template === '#commentsTemplate') { showAllComments(); }

      // 7. Bind Events
      if (template === '#registerFormTemplate') { bindRegisterEvents(); bindLoginFormEvents();  }
      if (template === '#loginFormTemplate') { bindLoginEvents(); bindRegisterFormEvents(); }
      if (template === '#newPostFormTemplate') { bindNewPostEvents(); }
      if (template === '#logout') { bindLogoutEvents(); }
    
    });
  }


function checkIfLoggedIn(){
  fetch('/api/ping')
    .then(response => {
      if (response.ok) {
        renderView(views.loggedin)
      } else {
        renderView(views.login)
      }
    })
}

checkIfLoggedIn()
 
// Visa regForm
function bindRegisterFormEvents() {
  const regBtn = document.querySelector('.registerBtn')

  regBtn.addEventListener('click', e =>{
    e.preventDefault()
    renderView(views.registrer)
})
}

// Visa logForm
function bindLoginFormEvents() {
  const loginBtn = document.querySelector('.loginBtn')

  loginBtn.addEventListener('click', e =>{
    e.preventDefault()
    renderView(views.login)
})
}


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
        registerForm.reset();
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
      console.log(response.json());
      if(!response.ok){
        return Error(response.statusText)
      } else {
        // return response.json();
        renderView(views.loggedin);
      }
    })
    .then(data => {
      // renderView(views.loggedin);
    })
    .catch(error => {
      console.error(error)
    })
  })
}

// Skriva nytt inlägg
function bindNewPostEvents() {
  const newPostForm = document.querySelector('#newPostForm')
  newPostForm.addEventListener('submit', e => {
    e.preventDefault();
  
    const formData = new FormData(newPostForm)

    fetch('/api/newpost', {

      method: 'POST',
      body: formData

    }).then(response => {
        
      if(!response.ok){
        return Error(response.statusText)
      } else {
        newPostForm.reset()
        return response.json()
      }
    }).catch(error => {
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
    let markup = '';
    let idCollapse = 0;
    entries.forEach(entry => {
      idCollapse++;
      markup += `    <div id="accordion${idCollapse}" class="mb-2 justify-content-center w-500">
      <div class="card d-flex w-100">
        <div class="card-header" id="heading${idCollapse}">
          <h5 class="mb-0 d-flex justify-content-center">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${idCollapse}" aria-expanded="true" aria-controls="collapse${idCollapse}">
              ${entry.title}
            </button>
          </h5>
        </div>
    
        <div id="collapse${idCollapse}" class="collapse hide" aria-labelledby="heading${idCollapse}" data-parent="#accordion${idCollapse}">
          <div class="card-body">
              <div class="row">
                  <div class="col d-flex justify-content-center" >
                      <p>${entry.content}</p>
                  </div>
              </div>
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <p class="text-muted">${entry.createdAt}</p>
                </div>
                <div class="col d-flex justify-content-center">
                    <p class="text-muted">${entry.userID}</p>   
                </div>
            </div>

            <div id="postComment${entry.entryID}"></div>
            
            <div id="commentList${entry.entryID}"></div>

          </div>
        </div>
      </div>
    </div>`;
    })

    showEntries.innerHTML = markup;

    // Hämta entryID för varje inlägg
    entries.forEach(entry => {

      // Visa inläggets kommentarer
      showComments2(entry.entryID);

    });

    // showComments2(1);
    
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
    let markup = '';
    users.forEach(user => {
      markup += `<li> ${user.username} </li>`;
    })

    showUsers.innerHTML = markup;

  })
  .catch(error => {
    console.error(error)
  });
}

// LOGGA UT
function bindLogoutEvents() {
  const logoutBtn = document.querySelector('#logoutBtn')
  
  logoutBtn.addEventListener('click', e =>{
    e.preventDefault();

    console.log('Log out?');
  
    fetch('/api/logout').then(() =>
      renderView(views.login)
    )
    .catch(error => {
      console.error(error)
    });
  

  })
}