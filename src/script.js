const cardItem = document.querySelector('.template').content;
const container = document.querySelector('.cards');//место рендеринга карточек

const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddPopupImage = document.querySelector('.profile__button-add');

const popupUserProfile = document.querySelector('.popup-user');
const popupAddImg = document.querySelector('.popup-img');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__interest');

const formEditProfile = popupUserProfile.querySelector('.form');// Находим форму popup-user
// Находим поля формы в DOM
const nameInput = formEditProfile.querySelector('#name-user');
const jobInput = formEditProfile.querySelector('#interest-user');

const formElementImg = popupAddImg.querySelector('.form');//Находим форму popup-user
// Находим поля формы в DOM
const inputCardName = formElementImg.querySelector('#name-card');
const inputCardLink = formElementImg.querySelector('#src-card');

const popupImage = document.querySelector('.popup-card');
const popupPicture = popupImage.querySelector('.popup__image');
const popupImageTxt = popupImage.querySelector('.popup__text');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createCard(cardData) {
  const cardElement = cardItem.querySelector('.element').cloneNode(true);
  const imgCard = cardElement.querySelector('.element__image');
  const textCard = cardElement.querySelector('.element__title');
  const buttonDelete = cardElement.querySelector('.element__button-delete');
  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  textCard.textContent = cardData.name;

  cardElement.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });

  buttonDelete.addEventListener('click', () => {
    const deleteCard = buttonDelete.closest('.element');
    deleteCard.remove();
  });

  imgCard.addEventListener('click', () => {
    popupPicture.src = imgCard.src;
    popupPicture.alt = imgCard.alt;
    popupImageTxt.textContent = textCard.textContent;
    openPopup(popupImage);
  })
  return cardElement;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formEditProfile.reset();
  closePopup(popupUserProfile);
}

function addDataCard(evt) {
  evt.preventDefault();
  const element = {};
  element.link = inputCardLink.value;
  element.name = inputCardName.value;
  const card = createCard(element);
  container.prepend(card);
  formElementImg.reset();
  closePopup(popupAddImg);
}

buttonAddPopupImage.addEventListener('click', () => { openPopup(popupAddImg) });// слушатель на отрытие формы пользывателя

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupUserProfile)});// слушатель на открытие формы добавления карточек

formEditProfile.addEventListener('submit', submitEditProfileForm);// слушатель на добавление данных в форме пользывателя

formElementImg.addEventListener('submit', addDataCard);

initialCards.forEach(item => { container.append(createCard(item)) }); //рендеринг карточек

popupAddImg.querySelector('.popup__button').addEventListener('click', () => closePopup(popupAddImg));

popupUserProfile.querySelector('.popup__button').addEventListener('click', () => closePopup(popupUserProfile));

popupImage.querySelector('.popup__button').addEventListener('click', () => closePopup(popupImage));
