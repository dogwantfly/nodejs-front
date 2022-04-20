const submitBtn = document.querySelector('.submit-post');
const content = document.querySelector('.post-content')
submitBtn.disabled = true;
function submitPost(e) {
  e.preventDefault();
  const img = document.querySelector('.post-image').value;
  console.log(content);
  let obj = {};
  if (!content.value) {
    const alertText = document.querySelector('.post-content').nextElementSibling;
    alertText.style.display = 'block';
  } else if (img && !img.startsWith('https')) {
    const alertText = document.querySelector('.post-img').nextElementSibling;
    alertText.classList.add('d-block');
  } else {
    obj = { 
      content,
      user: "624db34461939813513ce238",
      type: "person",
      tags: ["感情"]
    };
    if (img && img.startsWith('https')) {
      obj.image = img;
    }
    console.log(obj);
    const url = 'https://obscure-basin-73103.herokuapp.com/posts';
    axios.post(url, obj)
    .then(function (response) {
      console.log(response);
      document.querySelector('.post-content').value = '';
      document.querySelector('.post-image').value = '';
      document.querySelectorAll('.alert-text').forEach(item => {
        item.classList.remove('d-block');
      })
      window.location = "index.html";
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
}
function validateContent() {
  if(!content.value) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
}
submitBtn.addEventListener("click", submitPost);
content.addEventListener("input", validateContent);