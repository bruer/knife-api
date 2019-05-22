

const views = {
    login: ['#loginFormTemplate'], 
    register: ['#registerFormTemplate']
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
        return response.json()}
    }).catch(error => {
      console.error(error)})
  })
  
  
