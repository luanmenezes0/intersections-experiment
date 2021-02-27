export default class PostManager {
  #postCount = 0;
  #seenPosts = 0;

  get postCount() {
    return this.#postCount;
  }

  set postCount(value) {
    this.#postCount = value;
    return this.#postCount;
  }

  get seenPosts() {
    return this.#seenPosts;
  }

  set seenPosts(value) {
    this.#seenPosts = value;
    return this.#seenPosts;
  }

  getButtonValue() {
    return this.#postCount - this.#seenPosts;
  }

  markAllAsRead() {
    this.#postCount -= this.#postCount;
  }
}
