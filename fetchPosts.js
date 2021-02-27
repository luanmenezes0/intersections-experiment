const postTemplate = document.querySelector('#postTemplate');
const app = document.querySelector('#root');

const getPosts = async () => {
  const data = await window.fetch('https://jsonplaceholder.typicode.com/posts');

  const posts = await data.json();

  posts.forEach(({ id, title, body }) => {
    const post = document.importNode(postTemplate.content, true);
    post.querySelector('article').id = id;
    post.querySelector('h3').textContent = title;
    post.querySelector('p').textContent = body;
    app.append(post);
  });
};

export const fetchPosts = () => new Promise((resolve) => resolve(getPosts()));
