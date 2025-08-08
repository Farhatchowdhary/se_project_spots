function openProfileModal() { 
  document.querySelector('#editModal').classList.add('modalisopened');

}
function closeProfileModal() {
   document.querySelector('#editModal').classList.remove('modalisopened');
  
}
const editProfileButton  = document.querySelector(".profile__edit-button")

editProfileButton.addEventListener("click", openProfileModal)


const modalCloseButton  = document.querySelector("#editModal .modal__close-button")

modalCloseButton.addEventListener("click", closeProfileModal)


function openPostModal() {
  document.querySelector('#postModal').classList.add('modalisopened');
  
}

function closePostModal() {
  console.log("Heloo there")
  document.querySelector('#postModal').classList.remove('modalisopened');
}

  const newPostButton  = document.querySelector(".profile__post-button")
  console.log(newPostButton)

newPostButton.addEventListener("click", openPostModal)



const modalCloseBtn  = document.querySelector("#postModal .modal__close-btn")

modalCloseBtn.addEventListener("click", closePostModal)

