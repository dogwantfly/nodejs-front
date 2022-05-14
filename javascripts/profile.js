const navProfile = document.querySelector('#nav-profile');
const nickname = navProfile.querySelector('#nickname');
const userName = document.querySelector('.sidebar h3');
const password = document.querySelector('#newPassword');
const confirmPassword = document.querySelector('#comfirmPassword');
const submitProfileBtn = document.querySelector('.submit-profile');
const submitPasswordBtn = document.querySelector('.submit-password');
const profileForm = navProfile.querySelector('form');
const passwordForm = document.querySelector('#nav-password form');
let genderInput;
function showAlert(alertText, message) {
  alertText.textContent = message;
  alertText.classList.remove('d-none');
  alertText.classList.add('d-block');
}
function clearAlert(form) {
  let arr = [...form.querySelectorAll('input')];
  
  arr.forEach(item => {
    item.nextElementSibling.classList.remove('d-block');
    item.nextElementSibling.classList.add('d-none');
  })
}
function getProfile() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  let url = 'https://quiet-dawn-95060.herokuapp.com/users/profile';
  let nicknameAlert = document.querySelector('#nickname').nextElementSibling;
  nicknameAlert.classList.remove('d-block');
  nicknameAlert.classList.add('d-none');;
  axios.get(url)
    .then(function (response) {
      
      let { name, gender } = response.data.data;
      if (!gender) {
        document.querySelector('input[name="gender"][id="female"]').checked = true;
      } else {
        document.querySelector(`input[name="gender"][id="${gender}"]`).checked = true;
      }
      
      genderValue = document.querySelector('[name="gender"]:checked');
      
      nickname.value = name;
      userName.textContent = name;
      if (nickname.value && genderValue.value) {
        submitProfileBtn.disabled = false;
      }
  
    })
    .catch(function (error) {
      console.log(error);
    })
}
function updateProfile(e) {
  e.preventDefault();
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  let url = 'https://quiet-dawn-95060.herokuapp.com/users/profile';
  genderInput = document.querySelector('[name="gender"]:checked');
  const obj = {
    photo: "",
    name: nickname.value,
    gender: genderInput.value,
  };

  axios.patch(url, obj)
    .then(function (response) {
      
      
      getProfile();
    })
    .catch(function (error) {
      
      if (error.response) {
        let { message, status } = error.response.data;
        
        if (!status) {
          let nicknameAlert = document.querySelector('#nickname').nextElementSibling;
          
          
          if (Array.isArray(message)) {
            message = message.join(', ');
            
          }
          switch (message) {
            case '暱稱至少 2 個字元以上':
              showAlert(nicknameAlert, message)
              break;
          }
          
          submitProfileBtn.disabled = true;
          return;
        }
      }
    })
}

function updatePassword(e) {
  e.preventDefault();
  clearAlert(passwordForm);
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  let url = 'https://quiet-dawn-95060.herokuapp.com/users/updatePassword';
  
  const obj = {
    password: password.value,
    confirmPassword: confirmPassword.value
  };

  axios.post(url, obj)
    .then(function (response) {
      
      
      window.location = "login.html";
    })
    .catch(function (error) {
      
      if (error.response) {
        let { message, status } = error.response.data;
        
        if (!status) {
          let passwordAlert = password.nextElementSibling;
          let confirmPasswordAlert = confirmPassword.nextElementSibling;
          
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
              showAlert(confirmPasswordAlert, message)
              break;
            
          }
          
          submitPasswordBtn.disabled = true;
          return;
        }
      }
    })
}




getProfile();
function validateProfile(e) {
  genderInput = document.querySelector('input[name="gender"]:checked');
  e.target.checked = true;
  if (nickname.value && genderInput.value) {
    submitProfileBtn.disabled = false;
  } else {
    submitProfileBtn.disabled = true;
  }
}
function validatePassword(e) {
  if (e.target.closest('.tab-pane').id === 'nav-password') {
    if (password.value && confirmPassword.value) {
      submitPasswordBtn.disabled = false;
    }
  }
}
profileForm.addEventListener('input', validateProfile);
passwordForm.addEventListener('input', validatePassword);
profileForm.addEventListener('submit', updateProfile);
passwordForm.addEventListener('submit', updatePassword);