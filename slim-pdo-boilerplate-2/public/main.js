const views = {
  login: ['#loginFormTemplate', '#registerFormTemplate'],
  register: ['#registerFormTemplate']
}

function renderView(view) {
  // definera target
  const target = document.querySelector('main');

  // loopa igenom view
  view.forEach(template => {

    // hämta innehåll i template
    const templateMarkup = document.querySelector(template).innerHTML;
    // console.log(templateMarkup);

    // skapa div
    const div = document.createElement('div');
    
    // fyll div med innehåll
    div.innerHTML = templateMarkup;

    // lägg in div i target 
    target.append(div);

  });

  // skriva ut innehåll i target
  // console.log(view);
}

// function fetchEndpoint() {
//   fetch('api/users')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//     });
// }

// fetchEndpoint();

renderView(views.login);

const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('hej', e);

  const formData = new FormData(loginForm);
  fetch('/api/login', {
    method: 'POST',
    body: formData
  }).then(response => {
    console.log(response);
    if(!response.ok) {
      return Error(response.statusText);
    }
    else {
      return response.json();
    }
  }).catch(error => {
    console.error(error);
  })
});
