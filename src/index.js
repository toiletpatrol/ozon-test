import { jsonp } from './request.js';
import Post from './post.js';
import Feed from './feed.js';

class App {
  constructor() {
    this.fetch();

    let preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div>Loading...</div>';

    document.body.appendChild(preloader);
  }

  fetch() {
    jsonp.get('https://api.instagram.com/v1/users/691623/media/recent', {
      data: {
        access_token: '691623.1419b97.479e4603aff24de596b1bf18891729f3',
        count: 20,
        callback: 'instagramFeedCallback'
      },
      callbackName: 'instagramFeedCallback',
      onSuccess: (data) => {
        this.posts = this.parseData(data);
        this.render();
      },
      onTimeout: () => {
        console.log('timeout');
      }
    });
  }

  parseData(data) {
    var posts = [];

    for (var i = 0; i < data.data.length; i++) {
      posts.push(new Post(data.data[i]));
    }

    return posts;
  }

  render() {
    let feed = new Feed(this.posts);
    let feedElement = feed.getElement();

    document.body.innerHTML = '';
    document.body.appendChild(feedElement);

    feed.render();
  }
}

let app = new App();
