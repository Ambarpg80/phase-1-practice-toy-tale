let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }); // addBtn EventListener


/*============================ GET REQUEST ========================================*/

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then((allToys) => { 
       toyCard(allToys)
  
})

  function toyCard(allToys){
    for (let toy of allToys){ 
      let collectionDiv = document.getElementById("toy-collection")
      let toyInfoDiv = document.createElement('div')
      toyInfoDiv.className = "card";
      collectionDiv.append(toyInfoDiv)
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let p = document.createElement('p')
      p.className = "update-likes"
      let btn = document.createElement('button')
      btn.className = 'like-btn'
     
        h2.innerText = `${toy.name}`;
        img.src = (toy.image);
        img.style.width = "100%";
        img.style.height = "250px";
        img.style.objectFit= "contain";
        p.innerText = `${toy.likes} Likes`;
        btn.innerText = " Like ❤️ ";

  btn.addEventListener("click", ()=>{
          p.innerText= `${toy.likes+1} Likes`;
              toy.likes = toy.likes+1
              updateToy(toy)
        
            })
  toyInfoDiv.append( h2, img, p, btn) 
          }
    
  }
     /*======================================== POST REQUEST ===================================*/
const form = document.querySelector('.add-toy-form')
const input = document.getElementsByTagName('input')
input[0].id = 'text-input'
input[1].id = 'image-Input'
let inputText = document.getElementById('text-input')
let inputImg = document.getElementById('image-Input')

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    postAToy(inputText.value ,inputImg.value)
   //toyCard()
})

function postAToy(name,image){
fetch("http://localhost:3000/toys",{
method: 'POST',
headers: {
  "content-type" : "application/json",
  "accept" : "application/json "
},
  body: JSON.stringify(
    toy= {
  "name": name,      //`${textField.value}`
  "image": image, //`${textField.value}`
  "likes": 0,
  })
})
.then(response => response.json()) 
.then(() => toyCard)
}






/*======================================== PATCH REQUEST ===================================*/

function updateToy(toy){
  console.log(toy)
  console.log(`http://localhost:3000/toys/${toy.id}`)
fetch (`http://localhost:3000/toys/${toy.id}`,{
method: 'PATCH' ,
headers:{
  'content-type' : 'application/json' ,
  'accept' : 'application/json ',
},
body: JSON.stringify({
  "likes" : toy.likes
})
})
}






}); //DOM CONTENT LOADED
