const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardItem = document.querySelector('.template').content;
const container = document.querySelector('.cards');//место рендеринга карточек

const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddPopupImage = document.querySelector('.profile__button-add');

const popupUserProfile = document.querySelector('.popup-user');
const popupAddImg = document.querySelector('.popup-img');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__interest');


// Находим форму в DOM
const formElement = popupUserProfile.querySelector('.forma');// Находим форму popup-user
// Находим поля формы в DOM
const nameInput = formElement.querySelector('#name-user');
const jobInput = formElement.querySelector('#interest-user');

const formElementImg = popupAddImg.querySelector('.forma');//Находим форму popup-user
// Находим поля формы в DOM
const nameImg = formElementImg.querySelector('#name-card');
const srcImg = formElementImg.querySelector('#src-card');

const popupImage = document.querySelector('.popup-card');
const popupPicture = popupImage.querySelector('.popup__image');
const popupImageTxt = popupImage.querySelector('.popup__text');



function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__button').addEventListener('click', () => closePopup(popup))
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createCard(obj) {
  const cardElement = cardItem.querySelector('.element').cloneNode(true);
  const imgCard = cardElement.querySelector('.element__image');
  const textCard = cardElement.querySelector('.element__title');
  const buttonDelete = cardElement.querySelector('.element__button-delete');
  imgCard.src = obj.link;
  imgCard.alt = obj.name;
  textCard.textContent = obj.name;

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


function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  nameInput.value = '';
  jobInput.value = '';
  closePopup(popupUserProfile);
}

function addDataCard(evt) {
  evt.preventDefault();
  const element = {};
  element.link = srcImg.value;
  element.name = nameImg.value;
  const card = createCard(element);
  container.prepend(card);
  srcImg.value = '';
  nameImg.value = '';
  closePopup(popupAddImg);
}


buttonAddPopupImage.addEventListener('click', () => openPopup(popupAddImg));// слушатель на отрытие формы пользывателя

buttonEditProfile.addEventListener('click', () => openPopup(popupUserProfile));// слушатель на открытие формы добавления карточек

formElement.addEventListener('submit', handleFormSubmit);// слушатель на добавление данных в форме пользывателя

formElementImg.addEventListener('submit', addDataCard);

initialCards.forEach(item => { container.append(createCard(item)) }); //рендеринг карточек
