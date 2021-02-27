import { fetchPosts } from './fetchPosts.js';
import PostManager from './state.js';

const app = document.querySelector('#root');
const postTemplate = document.querySelector('#postTemplate');
const labelButton = document.querySelector('#label');
const addPostButton = document.querySelector('#add-post');

let markAll = false;

const postManager = new PostManager();

const updateButton = () => (labelButton.textContent = postManager.getButtonValue());

const postObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting && !markAll) {
        target.classList.add('seen');
        postManager.seenPosts++;
        updateButton();
        observer.unobserve(target);
      }
    });
  },
  { threshold: 0.75 },
);

fetchPosts().then(() => {
  const articles = document.querySelectorAll('article');
  postManager.postCount = articles.length;

  articles.forEach((post) => postObserver.observe(post));

  const urlParams = new URLSearchParams(window.location.search);
  const unreadPostsCount = urlParams.get('unread');

  if (unreadPostsCount > 0) {
    const selectedPostPosition = app.childElementCount - unreadPostsCount;
    const selectedPost = app.querySelector(`article:nth-child(${selectedPostPosition})`);

    const previousPosts = app.querySelectorAll(
      `article:not(article:nth-child(${selectedPostPosition}) ~ article)`,
    );

    postManager.seenPosts = previousPosts.length;
    previousPosts.forEach((node) => postObserver.unobserve(node));
    selectedPost.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
  }

  updateButton();
});

const appObserver = new MutationObserver((mutationList) => {
  mutationList.forEach(({ target, addedNodes }) => {
    const nodes = Array.from(addedNodes).filter((node) => node instanceof HTMLElement);
    nodes.forEach((node) => postObserver.observe(node));

    postManager.postsCount = target.children.length;
    updateButton();
  });
});

appObserver.observe(app, { childList: true });

addPostButton.addEventListener('click', () => {
  const post = document.importNode(postTemplate.content, true);
  post.querySelector('h3').textContent = 'New Post';
  post.querySelector('p').textContent = 'hi';
  app.append(post);

  postManager.postCount++;
  updateButton();
});

labelButton.addEventListener('click', () => {
  app.lastElementChild.scrollIntoView({ behavior: 'smooth' });
  markAll = true;

  postManager.postCount = app.childElementCount;
  postManager.seenPosts = app.childElementCount;

  updateButton();
});
