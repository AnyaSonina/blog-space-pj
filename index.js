let postsArray = []
const form = document.getElementById("form")
const titleInput = document.getElementById("post__title")
const bodyInput = document.getElementById("post__body")
let posts = JSON.parse(localStorage.getItem("posts"))

document.addEventListener("click", function(e) {
  if(e.target.dataset.id) {
    handleClick(e.target.dataset.id)
  }
})


fetch("https://apis.scrimba.com/jsonplaceholder/posts")
.then(res => res.json())
.then(data => {
  postsArray = data.slice(0,5)
  renderPost()
})


form.addEventListener("submit", function(event){
event.preventDefault()

const postTitle = titleInput.value
const postBody = bodyInput.value
const dataObject = {
  title: postTitle,
  body: postBody 
}

const options = {
  method: "POST",
  body: JSON.stringify(dataObject),
  headers: {
    "Content-type":"application/json"
  }
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
.then(res => res.json())
.then(post => {
  if(post.title && post.body)
  postsArray.unshift(post)
  localStorage.setItem("posts", JSON.stringify(postsArray))
  renderPost()
  form.reset()
})
})

function handleClick(id) {
  let filteredArr = postsArray.filter(post => {
    return post.id == id
  })[0]
  let index = postsArray.indexOf(filteredArr)
  postsArray.splice(index, 1)
  localStorage.setItem("posts", JSON.stringify(postsArray))
  renderPost()
}

function renderPost() {
  let html = ""
  
  if(posts.length) {
    postsArray = posts
  }

  for (let post of postsArray) {
    html += `<div class="post"><h1>${post.title}</h1>
    <p>${post.body}</p>
    <button data-id="${post.id}" class="post_btn" >Delete</button></div>` 
  }
  document.getElementById("posts__list").innerHTML = html
}

console.log(posts)