import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js"; // posts - массив постов

export function renderPostsPageComponent({ appEl }) {
  console.log("Актуальный список постов:", posts); // Отладка

  // @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
  // можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow

  const postsHtml = posts.map((post) => {
    const postDate = new Date(post.createdAt);
    // ПОКА ПРОСТО ВЫВОДИТСЯ ДАТА
    const formattedDate = postDate.toLocaleDateString() + ' ' + postDate.toLocaleTimeString();

    //ДОДЕЛАТЬ ЛАЙКИ
    const isLikedClass = post.isLiked ? '-active' : ''; 
    const likeImageSrc = post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'; 
    const likesCount = post.likes ? post.likes.length : 0; 

    return `
      <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl || './assets/images/user-placeholder.png'}" class="post-header__user-image" alt="Аватар пользователя">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}" alt="Фотография поста">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button ${isLikedClass}">
            <img src="${likeImageSrc}" alt="Лайк">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${likesCount}</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          ${formattedDate}
        </p>
      </li>
    `;
  }).join('');

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHtml} </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
