import '../pages/index.css';
import { enableValidation } from './validation.js';
import Api from './api.js';
import logo from '../images/Logo.svg';

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const headerLogo = document.querySelector('.header__logo');
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const profileAvatar = document.querySelector('.profile__picture');
  const cardsList = document.querySelector(".cards__list");
  const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const deleteConfirmBtn = deleteConfirmModal.querySelector(".modal__delete-confirm");
const cancelDeleteBtn = deleteConfirmModal.querySelector(".modal__cancel");
const closeDeleteModalBtn = deleteConfirmModal.querySelector(".modal__close-btn");

let cardToDelete = null; // to store which card user wants to delete

  if (headerLogo) headerLogo.src = logo;

  // --- Form Validation ---
  const validationConfig = {
    formSelector: ".formlogin, .formLogin",
    inputSelector: ".modal__label",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "modal__label_type_error",
    errorClass: "form__error_visible"
  };
  enableValidation(validationConfig);

  // --- API Setup ---
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "08f0a5eb-07f8-4212-a1d7-f9c4ef9d5d0f",
      "Content-Type": "application/json"
    }
  });

  let currentUserId = null;

  // --- Load User Info ---
  api.getUserInfo()
    .then(user => {
      currentUserId = user._id;
      profileTitle.textContent = user.name;
      profileSubtitle.textContent = user.about;
      profileAvatar.src = user.avatar;
    })
    .catch(err => console.log(err));

  // --- Modals ---
  function openModal(modal) {
    modal.classList.add("modalisopened");
    document.addEventListener("keydown", handleEscClose);
  }

  function closeModal(modal) {
    modal.classList.remove("modalisopened");
    document.removeEventListener("keydown", handleEscClose);
  }

  function openDeleteModal(card) {
  cardToDelete = card;
  openModal(deleteConfirmModal);
}

function closeDeleteModal() {
  closeModal(deleteConfirmModal);
  cardToDelete = null;
}

// Delete modal buttons
cancelDeleteBtn.addEventListener("click", closeDeleteModal);
closeDeleteModalBtn.addEventListener("click", closeDeleteModal);
deleteConfirmModal.addEventListener("mousedown", (e) => {
  if (e.target === deleteConfirmModal) closeDeleteModal();
});

// Confirm deletion
deleteConfirmBtn.addEventListener("click", () => {
  if (!cardToDelete) return;

  const cardId = cardToDelete.dataset.id; // make sure card.dataset.id is set in createCard
  api.deleteCard(cardId)
    .then(() => {
      cardToDelete.remove();
      closeDeleteModal();
    })
    .catch(err => console.log(err));
});


  function handleEscClose(e) {
    if (e.key === "Escape") {
      const openModalEl = document.querySelector(".modalisopened");
      if (openModalEl) closeModal(openModalEl);
    }
  }

  document.querySelectorAll(".modal").forEach(modal => {
    const closeButton = modal.querySelector(".modal__close-button, .modal__close-btn");
    if (closeButton) {
      closeButton.addEventListener("click", () => closeModal(modal));
    }
    modal.addEventListener("mousedown", e => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // --- Card Template ---
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const title = card.querySelector(".card__title");
  const img = card.querySelector(".card__image");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  // Like counter span
  const likeCount = document.createElement("span");
  likeCount.classList.add("card__like-count");
  card.querySelector(".card__description").append(likeCount);

  title.textContent = data.name;
  img.src = data.link;
  img.alt = data.name;

  //  set initial like count
  likeCount.textContent = data.likes.length;

  // highlight button if user already liked
  if (data.likes.some(like => like._id === currentUserId)) {
    likeBtn.classList.add("card__like-button_active");
  }

  // Like button handler
  likeBtn.addEventListener("click", () => {
    const isLiked = likeBtn.classList.contains("card__like-button_active");
    const request = isLiked ? api.unlikeCard(data._id) : api.likeCard(data._id);

    request
      .then(updatedCard => {
       console.log("API response:", updatedCard);
        likeBtn.classList.toggle("card__like-button_active");
        likeCount.textContent = updated.likes.length;
      })
      .catch(err => console.log(err));
  });

  // Store card id
  card.dataset.id = data._id;

  if (data.owner && data.owner._id === currentUserId) {
    deleteBtn.addEventListener("click", () => {
      openDeleteModal(card);
    });
  } else {
    deleteBtn.style.display = "none";
  }

  // Image modal
  const imageModal = document.getElementById("imagePreviewModal");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");
  img.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalCaption.textContent = data.name;
    openModal(imageModal);
  });

  return card;
}

// --- Profile Edit ---
/// Utility function to force a delay
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generic handler for forms with "Saving..." button
async function handleFormSubmit(form, apiCall) {
  const saveBtn = form.querySelector(".modal__save-button");
  const originalText = saveBtn.textContent;
  saveBtn.textContent = "Saving...";
  saveBtn.disabled = true;

  try {
    // Run API call and minimum delay together
    await Promise.all([
      apiCall(),
      wait(1500) // Adjust this to make saving text visible longer
    ]);
  } catch (err) {
    console.log(err);
  } finally {
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
  }
}

// --- Profile Edit Form ---
const editForm = document.querySelector("#editModal form");
editForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = editForm.querySelector("#title").value;
  const about = editForm.querySelector("#subtitle").value;

  handleFormSubmit(editForm, () => 
    api.updateUserInfo({ name, about })
      .then(updated => {
        profileTitle.textContent = updated.name;
        profileSubtitle.textContent = updated.about;
        closeModal(document.querySelector("#editModal"));
      })
  );
});

// --- New Post / Add Card Form ---
const postForm = document.querySelector("#postModal form");
postForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = postForm.querySelector("#caption").value;
  const link = postForm.querySelector("#image").value;

  handleFormSubmit(postForm, () =>
    api.addCard({ name, link })
      .then(newCard => {
        const cardElement = createCard({ ...newCard, owner: { _id: currentUserId }, likes: [] });
        cardsList.prepend(cardElement);
        postForm.reset();
        closeModal(document.querySelector("#postModal"));
      })
  );
});


  // --- Modal Open Buttons ---
  document.querySelector(".profile__edit-button").addEventListener("click", () => {
    openModal(document.querySelector("#editModal"));
  });

  document.querySelector(".profile__post-button").addEventListener("click", () => {
    openModal(document.querySelector("#postModal"));
  });

});
