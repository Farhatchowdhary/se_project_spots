function openProfileModal() { 
  // change that to id in the future
  document.querySelector('.modal__container').classList.add('modalisopened');
  //  document.querySelector('.formLogin').classList.add('showformlogin');
}
function closeProfileModal() {
   document.querySelector('.modal__container').classList.remove('modalisopened');
  
}
const editProfileButton  = document.querySelector(".profile__edit-button")

editProfileButton.addEventListener("click", openProfileModal)


const modalCloseButton  = document.querySelector(".modal__close-button")

modalCloseButton.addEventListener("click", closeProfileModal)


function openPostModal() {
  document.querySelector('#postModal').classList.add('modalisopened');
  // document.querySelector('#postModal .formLogin').classList.add('showformlogin');
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

