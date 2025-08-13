 const profileTitle = document.querySelector('.profile__title');

const editModal = document.querySelector('#editModal');
const editModalName = editModal.querySelector('#title');


   const profileSubtitle = document.querySelector('.profile__subtitle');
const editModalDescription = editModal.querySelector('#subtitle');


const initialCards = [
  {
    name: "Val Thorens",
    link: "./images/val-thorens.jpg",
    alt: "picture of a hut"
  },

  {
    name: "Restaurant Terrace",
    link: "./images/restaurant.jpg",
    alt: "picture of a restaurant"
  },
  {
    name: "An outdoor cafe",
    link: "./images/an-outdoor-cafe.jpg",
    alt: "picture of outdoor cafe"
  },
  {
    name: "A very long bridge over the forest",
    link: "./images/a-very-long-bridge.jpg",
    alt: "picture of long bridge"
  },
  {
    name: "Tunnel with morning light",
    link: "./images/tunnel.jpg",
    alt: "picture of a tunnel"
  },
  {
    name: "Mountain house",
    link: "./images/mountain.jpg",
    alt: "picture of a mountain"
  }
];

initialCards.forEach(card => {
  console.log(card.name);
  console.log(card.link);
});


function openProfileModal() {
   editModalName.value = profileTitle.textContent;
  editModalDescription.value = profileSubtitle.textContent 
  document.querySelector('#editModal').classList.add('modalisopened');

}





 function closeProfileModal() {
  document.querySelector('#editModal').classList.remove('modalisopened');
}
 const editProfileButton = document.querySelector(".profile__edit-button");
const modalCloseButton = document.querySelector("#editModal .modal__close-button");

 editProfileButton.addEventListener("click", openProfileModal)
 modalCloseButton.addEventListener("click", closeProfileModal);

const editForm = document.querySelector('#editModal form');
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // const newName = editForm.querySelector('#title').value;
  // const newDesc = editForm.querySelector('#subtitle').value;

  // document.querySelector('.profile__title').textContent = newName;
  // document.querySelector('.profile__subtitle').textContent = newDesc;

  closeProfileModal();
});


// Post Modal
function openPostModal() {
  document.querySelector('#postModal').classList.add('modalisopened');
}

function closePostModal() {
  document.querySelector('#postModal').classList.remove('modalisopened');
}

 const PostProfileButton = document.querySelector(".profile__post-button");
 const modalCloseBtn = document.querySelector("#postModal .modal__close-btn");

 PostProfileButton.addEventListener("click", openPostModal);
modalCloseBtn.addEventListener("click", closePostModal);

const postForm = document.querySelector('#postModal form');
 postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newImage = postForm.querySelector('#image').value;
  const newCaption = postForm.querySelector('#caption').value;

console.log(newImage , newCaption);

  closePostModal();
});








