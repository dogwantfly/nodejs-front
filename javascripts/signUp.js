const submitBtn = document.querySelector('.submit-login');
const nickname = document.querySelector('#nickname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#comfirmPassword');
const alertText = document.querySelector('.alert-text');
const form = document.querySelector('.board form');
function showAlert(alertText, message) {
  alertText.textContent = message;
  alertText.classList.remove('d-none');
  alertText.classList.add('d-block');
}
function clearAlert() {
  let arr = [...form.querySelectorAll('input')];
  
  arr.forEach(item => {
    item.nextElementSibling.classList.remove('d-block');
    item.nextElementSibling.classList.add('d-none');
  })
}
function submitUser(e) {
  e.preventDefault();
  clearAlert();
  let obj = {};
  
  obj = {
    name: nickname.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  };
    const url = 'https://quiet-dawn-95060.herokuapp.com/users/sign_up';
    axios.post(url, obj)
    .then(function (res) {
      
      const response = res.data;
      clearAlert();

      const { token } = response;
      document.cookie = `token=${token}`;
      
      window.location = "index.html";
    })
    .catch(function (error) {
      if (error.response) {
        let { message, status } = error.response.data;
        
        if (!status) {
          let passwordAlert = document.querySelector('#password').nextElementSibling;
          let comfirmPasswordAlert = document.querySelector('#comfirmPassword').nextElementSibling;
          let emailAlert = document.querySelector('#email').nextElementSibling;
          let nicknameAlert = document.querySelector('#nickname').nextElementSibling;
          if (Array.isArray(message)) {
            message = message.join(', ');
            
          }
          switch (message) {
            case '密碼需至少 8 碼以上，並英數混合':
              showAlert(passwordAlert, message)
              break;
            case '密碼需英數混合':
              showAlert(passwordAlert, message)
              break;
            case '密碼不一致！':
              showAlert(comfirmPasswordAlert, message)
              break;
            case 'Email 格式不正確':
              showAlert(emailAlert, message)
              break;
            case '暱稱至少 2 個字元以上':
              showAlert(nicknameAlert, message)
              break;
            case 'User validation failed: email: 帳號已被註冊，請替換新的 email！':
              showAlert(emailAlert, '帳號已被註冊，請替換新的 email！')
              break;
            
          }
          
          submitBtn.disabled = true;
          return;
        }
      }
    });
}

function validateContent() {
  let hasEmptyValue = false;
  let arr = [...form.querySelectorAll('input')];
  arr.forEach(item => {
    if(!item.value) {
      hasEmptyValue = true;
      submitBtn.disabled = true;
    }
  })
  
  if (!hasEmptyValue) { 
    submitBtn.disabled = false; 
  }
}
submitBtn.addEventListener("click", submitUser);
form.addEventListener("input", validateContent);