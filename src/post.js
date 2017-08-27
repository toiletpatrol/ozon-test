import format from './format-date.js';

export default class Post {
  constructor(data) {
    this.data = data;
    this.render()
  }

  getElement() {
    return this.element;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'post';

    let data = this.data;

    // Header
    let pic = data.user.profile_picture;
    let username = data.user.username;
    let location = data.location && data.location.name;
    let date = format(data.created_time);

    let header = `
      <div class="post_header">
        <div class="post_header-pic" style="background-image: url('${pic}');"></div>
        <div class="post_header-middle">
          <div class="post_header-name">${username}</div>
          ${location ? `<div class="post_header-location">${location}</div>`: ''}
        </div>
        <div class="post_header-date">${date}</div>
      </div>`;

    let src = data.images && data.images.standard_resolution && data.images.standard_resolution.url;
    let alt = `@${username}`;

    let image = `
      <div class="post_image">
        <img src="${src}" alt="${alt}" />
      </div>
    `;

    let likes = data.likes.count;

    let actions = `
      <div class="post_actions">
        <div class="post_actions-like"></div>
        <div class="post_actions-likes">${likes}</div>
      </div>
    `;

    let captionText = data.caption && data.caption.text;
    let caption = captionText ? `<div class="post_caption">${captionText}</div>` : '';

    this.element.innerHTML = header + image + actions + caption;

    this.element.getElementsByClassName('post_actions-like')[0].onclick = () => {
      alert(this.data.id);
    };
  }
}
