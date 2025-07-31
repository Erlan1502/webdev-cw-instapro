import { renderHeaderComponent } from './header-component.js';
import { renderUploadImageComponent } from './upload-image-component.js';

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let postImageUrl = ''; 

  const render = () => {
    appEl.innerHTML = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container-for-post">
              </div>
            <label>
              Опишите фотографию:
              <textarea class="input textarea" data-post-description rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
          </div>
        </div>
      </div>
    `;

    // Шапка
    renderHeaderComponent({
      element: document.querySelector('.header-container'),
    });

    // Инициализация компонента загрузки изображения
    const uploadImageContainer = appEl.querySelector('.upload-image-container-for-post');
    renderUploadImageComponent({
      element: uploadImageContainer, // Элемент изображения
      onImageUrlChange: (newImageUrl) => {
        postImageUrl = newImageUrl; 
      },
      imageUrl: postImageUrl, // Текущий урл
    });

    document.getElementById('add-button').addEventListener('click', () => {
      const description = appEl.querySelector('[data-post-description]').value;
      
      // Валидация
      if (!postImageUrl) {
        alert('Необходимо выбрать фотографию для поста');
        return;
      }
      if (!description) {
        alert('Добавьте описание для поста');
        return;
      }

      onAddPostClick({
        description: description,
        imageUrl: postImageUrl, // Используем URL, полученный от upload-image-component
      });
    });

  };

  render();
}
