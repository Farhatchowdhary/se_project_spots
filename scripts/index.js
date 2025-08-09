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

