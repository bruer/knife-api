

const views = {
    login: ['#loginFormTemplate'], 
    register: ['#registerFormTemplate'],
    entries: ['#entriesTemplate']
  }
  
  function renderView(view) {
    // 1. Definera ett target
    const target = document.querySelector('main');
  
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
    });
  }
  renderView(views.register)
  
  // REGGA ANVÄNDARE
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
  
  //Visa alla entries på startsidan
  renderView(views.entries);

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
