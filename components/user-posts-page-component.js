import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { likePost, dislikePost } from "../api.js";
import { formatDistanceToNow } from 'date-fns';
import { ru } from "date-fns/locale";
export function renderUserPostsPageComponent({ appEl }) {
  
  if (posts.length === 0) {
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="posts-user-header">
            <img src="./assets/images/user-placeholder.png" class="posts-user-header__user-image">
            <p class="posts-user-header__user-name">Пользователь</p>
        </div>
        <p class="post-text">У этого пользователя еще нет постов</p>
      </div>`;
    appEl.innerHTML = appHtml;
    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });
    return;
  }

  const postsHtml = posts.map((post) => {
    const postDate = new Date(post.createdAt);
    const formattedDate = formatDistanceToNow(postDate, { addSuffix: true, locale: ru });
    const isLikedClass = post.isLiked ? '-active' : '';
    const likeImageSrc = post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg';
    const likesCount = post.likes ? post.likes.length : 0;

    return `
      <li class="post">
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

  const postUser = posts[0].user;

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="posts-user-header">
          <img src="${postUser.imageUrl}" class="posts-user-header__user-image">
          <p class="posts-user-header__user-name">${postUser.name}</p>
      </div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (const likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const postId = likeButton.dataset.postId;
      const post = posts.find(p => p.id === postId);

      const handleLike = () => {
        if (post.isLiked) {
          dislikePost({ token: getToken(), postId }).then(() => {
            goToPage(USER_POSTS_PAGE, { userId: post.user.id }); 
          });
        } else {
          likePost({ token: getToken(), postId }).then(() => {
            goToPage(USER_POSTS_PAGE, { userId: post.user.id }); 
          });
        }
      };

      handleLike();
    });
  }
}