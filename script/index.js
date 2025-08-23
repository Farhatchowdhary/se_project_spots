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
   },
  
 ];




const cardTemplate = document
.querySelector("#card-template").content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function openModal(modalElement) {
 modalElement.classList.add('modalisopened'); 
  
}

function closeModal(modalElement) {
  modalElement.classList.remove('modalisopened');
}


// image preview modal

const imageModal = document.getElementById("imagePreviewModal");
const modalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
const modalCloseButton = imageModal.querySelector(".modal__close-button");

modalCloseButton.addEventListener("click", () => closeModal(imageModal));



function getCardElement(data)  {
const cardElement = cardTemplate.cloneNode(true);
const cardTitle = cardElement.querySelector(".card__title");
const cardImage = cardElement.querySelector(".card__image");



cardImage.src = data.link;
cardImage.alt = data.name;
cardTitle.textContent = data.name;

// // // open image preview modal
cardImage.addEventListener("click", () => {
  if (!modalImage || !modalCaption || !imageModal) return;
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;
  openModal(imageModal);
});

const cardLikeButton = cardElement.querySelector(".card__like-button");
cardLikeButton.addEventListener("click", () => {
  cardLikeButton.classList.toggle("card__like-button_active");
});


return cardElement;
}


 initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
 cardsList.append(cardElement);
});





// ===== Profile Modal =====
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editModal = document.querySelector('#editModal');
const editModalName = editModal.querySelector('#title');
const editModalDescription = editModal.querySelector('#subtitle');

const editProfileButton = document.querySelector(".profile__edit-button");
const editmodalCloseButton = editModal.querySelector(".modal__close-button");
const editForm = editModal.querySelector('form');


// // Open profile modal
// editProfileButton.addEventListener("click", () => {
//   editModalName.value = profileTitle.textContent;
//   editModalDescription.value = profileSubtitle.textContent;
//   openModal(editModal);
// });

// // Close profile modal
// editmodalCloseButton.addEventListener("click", () => closeModal(editModal));

// // Profile form submit
// // const editForm = editModal.querySelector('form');
// editForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   profileTitle.textContent = editModalName.value;
//   profileSubtitle.textContent = editModalDescription.value;
//   closeModal(editModal);
// });

// ===== Post Modal =====
// const postModal = document.querySelector('#postModal');
// const PostProfileButton = document.querySelector(".profile__post-button");
// const postmodalCloseBtn = postModal.querySelector(".modal__close-btn");
// const postForm = postModal.querySelector('form');

// Open post modal
// PostProfileButton.addEventListener("click", () => openModal(postModal));

// // Close post modal
// postmodalCloseBtn.addEventListener("click", () => closeModal(postModal));

// // Post form submit

// postForm.addEventListener('submit', (e) => {
//   e.preventDefault();

  
//   const newImage = postForm.querySelector('#image').value;
//   const newCaption = postForm.querySelector('#caption').value;

//   const newCard = getCardElement({
//     name: newCaption,
//     link: newImage });
//      cardsList.prepend(newCard);

//   closeModal(postModal);

// postForm.reset();
// });
 

const resetForm = (form) =>  {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input =>  {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    error.textContent = '';
error.classList.remove(settings.errorClass);
  });
};


//   Edit Profile Modal
editProfileButton.addEventListener("click", () => {
  editModalName.value = profileTitle.textContent;

  resetForm(editForm);
  openModal(editModal);
});

editModal.addEventListener("submit", (e) =>  {
  e.preventDefault();
  profileTitle.textContent = editForm.title.value;
  profileSubtitle.textContent = editForm.subtitle.value;

  closeModal(editModal);
  resetForm(editForm);
});

//  New post Modal

  const PostProfileButton = document.querySelector(".profile__post-button");
  const postModal = document.querySelector("#postModal");
  const postForm = postModal.querySelector("form");
  PostProfileButton.addEventListener("click", () =>  {
  resetForm(postForm);
 openModal(postModal);
});

postForm.addEventListener("submit", (e) => {
e.preventDefault();

const newCard = getCardElement({
  name: postForm.caption.value,
  link: postForm.image.value
});

cardsList.prepend(newCard);
closeModal(postModal);

postForm.reset();
  resetForm(postForm);
});

// Select all Modals
const modals = document.querySelectorAll(".modal, .modalisopened");

// Add click listener to each modal
modals.forEach(modal => {
  modal.addEventListener("click", (e) =>  {
    if(e.target === modal)  {
      closeModal(modal);
    }
  });
});

// Handler function for Escape key
const handleEscClose = (e) => {
  if (e.key === "Escape") {
    const openModalElement = document.querySelector(".modalisopened");
    if (openModalElement) closeModal(openModalElement);
  }
};

// Modify your openModal/closeModal functions
function openModal(modalElement) {
  modalElement.classList.add("modalisopened"); 
  document.addEventListener("keydown", handleEscClose); // add listener when modal opens
}

function closeModal(modalElement) {
  modalElement.classList.remove("modalisopened");
  document.removeEventListener("keydown", handleEscClose); // remove listener when modal closes
}

// Close modal when clicking on overlay
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("mousedown", (event) => {


    // Check if the click is exactly on the overlay, not inside modal content
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});


// Attach close button functionality for all modals
document.querySelectorAll(".modal").forEach(modal => {
  const closeButton = modal.querySelector(".modal__close-button, .modal__close-btn");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(modal));
  }

  // Close modal when clicking on overlay
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});






















