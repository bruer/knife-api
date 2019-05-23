  const views = {
    login: ['#loginFormTemplate', '#registerFormTemplate', '#entriesTemplate', ], 
    loggedin: ['#entriesTemplate', '#usersTemplate']
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

      // 7. Bind Events
      if (template === '#registerFormTemplate') { bindRegisterEvents(); }
      if (template === '#loginFormTemplate') { bindLoginEvents(); }
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
    let idCollapse = 0;
    entries.forEach(entry => {
      idCollapse++;
      markup += `    <div id="accordion${idCollapse}" class="mb-2">
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
          </div>
        </div>
      </div>
    </div>`;
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

