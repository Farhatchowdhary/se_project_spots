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

api.getInitialCards()
  .then(cards => {
    cards.forEach(cardData => {
      const cardElement = createCard({ ...cardData, owner: { _id: cardData.owner._id }, likes: cardData.likes });
      cardsList.append(cardElement);
    });
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

  function handleEscClose(e) {
    if (e.key === "Escape") {
      const openModalEl = document.querySelector(".modalisopened");
      if (openModalEl) closeModal(openModalEl);
    }
  }

  // Close modals on background click or close button
  document.querySelectorAll(".modal").forEach(modal => {
    const closeButton = modal.querySelector(".modal__close-button, .modal__close-btn");
    if (closeButton) {
      closeButton.addEventListener("click", () => closeModal(modal));
    }
    modal.addEventListener("mousedown", e => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // --- Delete Card Modal ---
  const deleteConfirmModal = document.getElementById("deleteConfirmModal");
  const deleteConfirmBtn = deleteConfirmModal.querySelector(".modal__delete-confirm");
  const cancelDeleteBtn = deleteConfirmModal.querySelector(".modal__cancel");
  const closeDeleteModalBtn = deleteConfirmModal.querySelector(".modal__close-btn");

  let cardToDelete = null;

  function openDeleteModal(card) {
    cardToDelete = card;
    openModal(deleteConfirmModal);
  }

  function closeDeleteModal() {
    closeModal(deleteConfirmModal);
    cardToDelete = null;
  }

  cancelDeleteBtn.addEventListener("click", closeDeleteModal);
  closeDeleteModalBtn.addEventListener("click", closeDeleteModal);
  deleteConfirmModal.addEventListener("mousedown", (e) => {
    if (e.target === deleteConfirmModal) closeDeleteModal();
  });

  deleteConfirmBtn.addEventListener("click", () => {
    if (!cardToDelete) return;
    const cardId = cardToDelete.dataset.id;
    api.deleteCard(cardId)
      .then(() => {
        cardToDelete.remove();
        closeDeleteModal();
      })
      .catch(err => console.log(err));
  });

  // --- Card Template ---
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

  function createCard(data) {
    const card = cardTemplate.cloneNode(true);
    const title = card.querySelector(".card__title");
    const img = card.querySelector(".card__image");
    const likeBtn = card.querySelector(".card__like-button");
    const deleteBtn = card.querySelector(".card__delete-button");
    const likeCount = card.querySelector(".card__like-count");

    title.textContent = data.name;
    img.src = data.link;
    img.alt = data.name;
    likeCount.textContent = data.likes.length;

    if (data.likes.some(like => like._id === currentUserId)) {
      likeBtn.classList.add("card__like-button_active");
    }

    likeBtn.addEventListener("click", () => {
      const isLiked = likeBtn.classList.contains("card__like-button_active");
      const request = isLiked ? api.unlikeCard(data._id) : api.likeCard(data._id);
      request
        .then(updated => {
          likeBtn.classList.toggle("card__like-button_active");
          likeCount.textContent = updated.likes.length;
        })
        .catch(err => console.log(err));
    });

    card.dataset.id = data._id;

    if (data.owner && data.owner._id === currentUserId) {
      deleteBtn.addEventListener("click", () => openDeleteModal(card));
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
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleFormSubmit(form, apiCall) {
    const saveBtn = form.querySelector(".modal__save-button");
    const originalText = saveBtn.textContent;
    saveBtn.textContent = "Saving...";
    saveBtn.disabled = true;

    try {
      await Promise.all([apiCall(), wait(1500)]);
    } catch (err) {
      console.log(err);
    } finally {
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  }

  const editModal = document.querySelector("#editModal");
  const postModal = document.querySelector("#postModal");
  const avatarModal = document.querySelector("#avatarModal");

  const editForm = editModal.querySelector("form");
  const postForm = postModal.querySelector("form");
  const avatarForm = avatarModal.querySelector("form");
  const currentAvatarImg = avatarModal.querySelector(".modal__current-avatar");

  // --- Open Modals ---
  document.querySelector(".profile__edit-button").addEventListener("click", () => {
    editForm.querySelector("#title").value = profileTitle.textContent;
    editForm.querySelector("#subtitle").value = profileSubtitle.textContent;
    openModal(editModal);
  });

  document.querySelector(".profile__post-button").addEventListener("click", () => {
    postForm.reset();
    openModal(postModal);
  });

  profileAvatar.addEventListener("click", () => {
    avatarForm.reset();
    currentAvatarImg.src = profileAvatar.src;
    openModal(avatarModal);
  });

  // --- Form Submissions ---
  editForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = editForm.querySelector("#title").value;
    const about = editForm.querySelector("#subtitle").value;

    handleFormSubmit(editForm, () =>
      api.updateUserInfo({ name, about })
        .then(updated => {
          profileTitle.textContent = updated.name;
          profileSubtitle.textContent = updated.about;
          closeModal(editModal);
        })
    );
  });

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
          closeModal(postModal);
        })
    );
  });


  avatarForm.addEventListener("submit", e => {
    e.preventDefault();
    const avatarUrl = avatarForm.querySelector("#avatar").value;

    handleFormSubmit(avatarForm, () =>

      api.updateAvatar({ avatar: avatarUrl })
        .then(updated => {
          profileAvatar.src = updated.avatar;
          currentAvatarImg.src = updated.avatar;
          closeModal(avatarModal);
          avatarForm.reset();
        })
        .catch(err => console.log(err))
    );
  });
});
