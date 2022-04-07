const postsList = document.querySelector('.posts-list');
const sortSelect = document.querySelector('.form-select');
const searchBtn = document.querySelector('.search-posts');
const searchText = document.querySelector('.search-text');
let timeSort = '';
let query = '';
function getPostsList(query, timeSort) {
  let url = '';
  if (timeSort && query) {
    url = `https://obscure-basin-73103.herokuapp.com/posts?timeSort=${timeSort}&q=${query}`;
  } else if (timeSort) {
    url = `https://obscure-basin-73103.herokuapp.com/posts?timeSort=${timeSort}`;
  } else if (query) {
    url = `https://obscure-basin-73103.herokuapp.com/posts?q=${query}`;
  } else {
    url = `https://obscure-basin-73103.herokuapp.com/posts`
  }
  axios.get(url)
    .then(function (response) {
      renderData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    })
}


function renderData(data) {
  let str = '';
  if (data.length) {
    data.forEach((item) => {
      str += `<li class="card mb-3">
      <div class="card-header d-flex"><img class="avatar rounded-circle me-2" src="${item.user.photo}"/>
        <div class="card-text">
          <h3 class="fs-6 mb-0">${item.user.name} </h3>
          <time class="small text-muted">${new Date(item.createdAt).toLocaleString()}</time>
        </div>
      </div>
      <div class="card-body">
        <p class="mb-3 text-pre-line">
          ${item.content}
        </p>
        <img class="img-fluid" src="${item.image ? item.image : "https://images.unsplash.com/photo-1644574522654-ba30b2cd5df3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4NXxKcGc2S2lkbC1Ia3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}" alt="post's picture"/>
      </div>
    </li>`
    
    })
  } else {
    str += `<li class="card mb-3">
      <div class="card-header py-3">
      </div>
      <div class="card-body">
        <p class="mb-3">
          <i class="bi bi-pencil-fill fs-5"></i>
          目前尚無動態，新增一則貼文吧！
        </p>
      </div>
    </li>`
  }
  
  postsList.innerHTML = str;
}

getPostsList();
function sortPosts(e) {
  switch (e.target.value) {
    case '最新貼文':
      timeSort = 'desc';
      break;
    case '最舊到最新':
      timeSort = 'asc';
      break;
    default:
      timeSort = '';
      break;
  }
  console.log(query);
  getPostsList(query, timeSort);
}
function searchPosts() {
  query = searchText.value;
  if (!query) return;
  getPostsList(query, timeSort);
}
sortSelect.addEventListener('change', sortPosts);
searchBtn.addEventListener('click', searchPosts);