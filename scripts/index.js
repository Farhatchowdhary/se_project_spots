function openModal(modalElement) {
  modalElement.classList.add('modalisopened');
}

function closeModal(modalElement) {
  modalElement.classList.remove('modalisopened');
}

// ===== Profile Modal =====
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editModal = document.querySelector('#editModal');
const editModalName = editModal.querySelector('#title');
const editModalDescription = editModal.querySelector('#subtitle');

const editProfileButton = document.querySelector(".profile__edit-button");
const modalCloseButton = editModal.querySelector(".modal__close-button");

// Open profile modal
editProfileButton.addEventListener("click", () => {
  editModalName.value = profileTitle.textContent;
  editModalDescription.value = profileSubtitle.textContent;
  openModal(editModal);
});

// Close profile modal
modalCloseButton.addEventListener("click", () => closeModal(editModal));

// Profile form submit
const editForm = editModal.querySelector('form');
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitle.textContent = editModalName.value;
  profileSubtitle.textContent = editModalDescription.value;
  closeModal(editModal);
});

// ===== Post Modal =====
const postModal = document.querySelector('#postModal');
const PostProfileButton = document.querySelector(".profile__post-button");
const modalCloseBtn = postModal.querySelector(".modal__close-btn");

// Open post modal
PostProfileButton.addEventListener("click", () => openModal(postModal));

// Close post modal
modalCloseBtn.addEventListener("click", () => closeModal(postModal));

// Post form submit
const postForm = postModal.querySelector('form');
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newImage = postForm.querySelector('#image').value;
  const newCaption = postForm.querySelector('#caption').value;
  console.log(newImage, newCaption);
  closeModal(postModal);
});


























