let addToy = false;
document.addEventListener("DOMContentLoaded", () => {


  const addBtn = document.querySelector("#new-toy-btn");

  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyForm = document.querySelector(".add-toy-form");



  addBtn.addEventListener("click", () => {
    // hide & seek with the form

    addToy = !addToy;

    if (addToy) {

      toyFormContainer.style.display = "block";

    } else {
      toyFormContainer.style.display = "none";
    }


  });


  fetch ("http://localhost:3000/toys")
  .then (response => response.json()
  .then (toys => {
    toys.forEach(toy => {
      renderToy(toy)
    })
    })
  )

  function renderToy(toy) {
    let div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image } class = "toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class= "like-btn">Like <3</button>
    `

    toyCollection.append(div)

  }

  toyForm.addEventListener("submit", function(e) {
    e.preventDefault()
    let name = e.target.name.value
    let image = e.target.image.value
    let likes = 0
    let newtoy = {
      name: name,
      image: image,
      likes: likes

    }
    fetch("https://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body : JSON.stringify(newtoy)

    })
    .then(response => response.json())
    .then(toy => {
      renderToy(toy)

    })
  })


  toyCollection.addEventListener("click", function(e) {
    if (e.target.className === "like-btn") {
      let likes = e.target.previousElementSibling
      let currentLikes = parseInt (likes.textContent)
      let newLikes = currentLikes +1
      likes.textContent = `${newLikes} Likes`
      let id = e.target.parentElement.dataset.id
      fetch ('http://localhost:3000/toys/${id}', {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        
        },
        body: JSON.stringify({
          likes: newLikes
        })
 }) 

 then(response => response.json()
        .then(toy => {
          toy.querySelector("p").innerText = `${toy.likes} Likes`
        })
 )



}


  })
});

