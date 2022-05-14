const submitBtn = document.querySelector('.submit-login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const alertText = document.querySelector('.alert-text');
const form = document.querySelector('.board form');
function submitUser(e) {
  e.preventDefault();
  let obj = {};
  
  obj = {
    email: email.value,
    password: password.value
  };
    const url = 'https://quiet-dawn-95060.herokuapp.com/users/sign_in';
    axios.post(url, obj)
    .then(function (res) {
      
      const response = res.data;
      
      alertText.classList.remove('d-block');
      alertText.classList.add('d-none');
      const { token } = response;
      document.cookie = `token=${token}`;
      
      window.location = "index.html";
    })
    .catch(function (error) {
      if (error.response) {
        const response = error.response.data;
        
        if (!response.status) {
          alertText.textContent = response.message;
          alertText.classList.remove('d-none');
          alertText.classList.add('d-block');
          submitBtn.disabled = true;
          return;
        }
      }
    });
}
function validateContent() {
  if(email.value && password.value) {
    submitBtn.disabled = false;
  }
}
submitBtn.addEventListener("click", submitUser);
form.addEventListener("input", validateContent);