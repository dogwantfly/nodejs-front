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
  console.log(data);
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
  console.log(query);
  getPostsList(query, timeSort);
}
function searchPosts() {
  query = searchText.value;
  if (!query) return;
  getPostsList(query, timeSort);
}
// function updatePosts(e) {
//   let likes = 0;
//   if (e.target.classList.contains('bi-hand-thumbs-up')) {
//     likes = Number(e.target.dataset.likes) + 1;
//   } else {
//     likes = Number(e.target.dataset.likes) - 1;
//   }
//   const content = e.target.closest('.card-body').querySelector('.post-content').textContent;
//   const user = e.target.closest('.card').querySelector('h3').dataset.user;
//   const type = e.target.closest('.card-body').dataset.type;
//   const tags = e.target.closest('.card-body').querySelector('.post-tags').dataset.tags.split(',');
//   const postId = e.target.closest('.card').dataset.id;
//   let isLiked = false;
//   obj = { 
//     content,
//     user,
//     type,
//     tags,
//     likes
//   };
//   console.log(obj);
//   const url = `https://obscure-basin-73103.herokuapp.com/posts/${postId}`;
//   axios.patch(url, obj)
//   .then(function (response) {
//     console.log(response);
//     isLiked = !isLiked;
//   }).catch ((error) => {
//     console.error(error);
//   })
// }
sortSelect.addEventListener('change', sortPosts);
searchBtn.addEventListener('click', searchPosts);
// postsList.addEventListener('click', updatePosts);