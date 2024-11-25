// Получение ссылок на HTML-элементы
const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('like-button');
const likeCount = document.getElementById('like-count');
const previousButton = document.getElementById('previous-button');

// Инициализация переменных для отслеживания предыдущих фотографий
let previousPhotos = JSON.parse(localStorage.getItem('previousPhotos')) || [];
let currentPhotoIndex = 0;

// Функция для отображения текущей фотографии
function displayCurrentPhoto(photoUrl, photographerName) {
    photoElement.src = photoUrl;
    photographerElement.textContent = `Фотограф: ${photographerName}`;
}

// Асинхронная функция для получения случайной фотографии с Unsplash
async function getRandomPhoto() {
    try {
        const response = await fetch('https://api.unsplash.com/photos/random?client_id=HO2Cha3hj6rAcoecUszRNtR_Mp_WvXkXq0uvuBBWKXs');
        const data = await response.json();
        const photoUrl = data.urls.regular;
        const photographerName = data.user.name;
        displayCurrentPhoto(photoUrl, photographerName);
        previousPhotos.push({photoUrl, photographerName});
        localStorage.setItem('previousPhotos', JSON.stringify(previousPhotos));
        currentPhotoIndex = previousPhotos.length - 1;
    } catch (error) {
        console.error('Ошибка получения изображения:', error);
    }
}

// Обработчик события для кнопки "лайк"
likeButton.addEventListener('click', function() {
    let currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = currentLikes + 1;
    localStorage.setItem('likeCount', likeCount.textContent);
});

// Обработчик события для кнопки "Предыдущее фото"
previousButton.addEventListener('click', function() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        displayCurrentPhoto(previousPhotos[currentPhotoIndex].photoUrl, previousPhotos[currentPhotoIndex].photographerName);
    }
});

// Загрузка страницы: установка количества лайков и получение случайной фотографии
window.onload = function() {
    likeCount.textContent = localStorage.getItem('likeCount') || 0;
    getRandomPhoto();
};
