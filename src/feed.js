export default class Feed {
  constructor(posts) {
    this.posts = posts;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'feed');
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

  getColumnsCount() {
    let w = getElementContentWidth(this.element);
    let columns = 0;

    while (w > (DESKTOP_COLUMN_WIDTH + DESKTOP_COLUMN_GAP)) {
      w -= (DESKTOP_COLUMN_WIDTH + DESKTOP_COLUMN_GAP);
      columns++;
    }

    if (w > DESKTOP_COLUMN_WIDTH) {
      columns++;
    }

    return columns ? columns : 1;
  }
}
