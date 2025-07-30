import { renderHeaderComponent } from './header-component.js'; // Возвращаем импорт компонента заголовка

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    appEl.innerHTML = `
      <div class="page-container">
        <div class="header-container"></div> <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container">
              <div class="upload=image"> <label class="file-upload-label secondary-button">
                    <input type="file" id="file-input" class="file-upload-input" style="display:none">
                    Выберите фото
                </label>
              </div>
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

    document.getElementById('add-button').addEventListener('click', () => {
      const description = appEl.querySelector('[data-post-description]').value;
      const imageUrl = ''; // Реализация URL

      onAddPostClick({
        description: description,
        imageUrl: imageUrl,
      });
    });

    const fileInput = appEl.querySelector('#file-input'); // Для диалогового окна в дальнейшем
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Выбран файл:', file.name); // Проверка
      }
    });
  };

  render();
}
