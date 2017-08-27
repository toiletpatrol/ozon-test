const DESKTOP_COLUMN_WIDTH = 295;
const DESKTOP_COLUMN_GAP = 30;

function getElementContentWidth(element) {
  var styles = window.getComputedStyle(element);
  var padding = parseFloat(styles.paddingLeft) +
                parseFloat(styles.paddingRight);

  return element.clientWidth - padding;
}

export default class Feed {
  constructor(posts) {
    this.posts = posts;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'feed');

    // Resize event
    window.onresize = (function(event) {
      if (this.columns != this.getColumnsCount()) {
        this.render();
      }
    }).bind(this);
  }

  getElement() {
    return this.element;
  }

  render() {
    if (this.element) {
      this.element.innerHTML = '';
    }

    let columns = this.columns = this.getColumnsCount();
    let count = Math.ceil(this.posts.length / columns);

    for (var i = 0; i < columns - 1; i++) {
      let start = i * count;
      let end = (i + 1) * count;
      let posts = this.posts.slice(start, end);

      this.renderColumn(posts);
    }

    // The rest goes to the last column
    let posts = this.posts.slice(count * (columns - 1));
    this.renderColumn(posts);
  }

  renderColumn(posts) {
    let column = document.createElement('div');
    column.setAttribute('class', 'feed_col');

    this.element.appendChild(column);

    for (var i = 0; i < posts.length; i++) {
      let postElement = posts[i].getElement();
      column.appendChild(postElement);
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
