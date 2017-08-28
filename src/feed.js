export default class Feed {
  constructor(posts) {
    this.posts = posts;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'feed');

    this.render();
  }

  getElement() {
    return this.element;
  }

  render() {
    if (this.element) {
      this.element.innerHTML = '';
    }

    let posts = this.posts;

    for (var i = 0; i < posts.length; i++) {
      let postElement = posts[i].getElement();
      this.element.appendChild(postElement);
    }
  }
}
