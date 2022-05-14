const postsList = document.querySelector('.posts-list');
const sortSelect = document.querySelector('.form-select');
const searchBtn = document.querySelector('.search-posts');
const searchText = document.querySelector('.search-text');
let timeSort = '';
let query = '';
function getPostsList(query, timeSort) {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  let url = '';
  if (timeSort && query) {
    url = `https://quiet-dawn-95060.herokuapp.com/posts?timeSort=${timeSort}&q=${query}`;
  } else if (timeSort) {
    url = `https://quiet-dawn-95060.herokuapp.com/posts?timeSort=${timeSort}`;
  } else if (query) {
    url = `https://quiet-dawn-95060.herokuapp.com/posts?q=${query}`;
  } else {
    url = `https://quiet-dawn-95060.herokuapp.com/posts`
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

      let tagsStr = '';
      if(item.tags.length) {
        item.tags.forEach((tag) => {
          tagsStr += `<li>
          <a href="#" class="badge bg-secondary link-dark text-decoration-none fs-6 me-2">
          #${tag}
          </a>
          </li>`
        })
      }
      
      if (item.user.photo) {
        str += `<li class="card mb-3" data-id="${item._id}">
        <div class="card-header d-flex bg-white border-bottom-0"><img class="avatar rounded-circle me-2 border border-2 border-dark" src="${item.user.photo}"/>
          <div class="card-text">
            <h3 class="fs-6 mb-0" data-user="${item.user._id}">${item.user.name} </h3>
            <time class="small text-muted">${new Date(item.createdAt).toLocaleString()}</time>
          </div>
        </div>
        <div class="card-body p-4" data-type="${item.type}">
          <p class="post-content mb-3 text-pre-line">
            ${item.content}
          </p>
          <img class="post-img img-fluid object-fit-cover w-100 mb-3" src="${item.image ? item.image : "https://images.unsplash.com/photo-1644574522654-ba30b2cd5df3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4NXxKcGc2S2lkbC1Ia3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}" alt="post's picture"/>
          <ul class="post-tags list-unstyled ps-0 d-flex" data-tags="${item.tags}"> ${tagsStr}</ul>
          <button type="button" class="post-likes btn ${item.likes > 0 ? "text-primary" : "text-muted"}" data-likes="${item.likes}">
           <i class="bi bi-hand-thumbs-up fs-4 "></i>
           ${item.likes > 0 ? item.likes : "成為第一個按讚的人"}
          </button>
          
        </div>
      </li>`
      }
    })
  } else {
    str += `<li class="card mb-3">
      <div class="card-header py-3 bg-white border-bottom-0">
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
  
  getPostsList(query, timeSort);
}
function searchPosts() {
  query = searchText.value;
  if (!query) return;
  getPostsList(query, timeSort);
}

sortSelect.addEventListener('change', sortPosts);
searchBtn.addEventListener('click', searchPosts);
