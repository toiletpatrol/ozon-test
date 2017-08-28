import jsonp from './jsonp.js';
import Post from './post.js';
import Feed from './feed.js';

class App {
  constructor() {
    let preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div>Loading...</div>';

    document.body.appendChild(preloader);

    this.fetch();
  }

  fetch() {
    jsonp('https://api.instagram.com/v1/users/691623/media/recent', {
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
    return data.data.map((e) => new Post(e));
  }

  render() {
    let feed = new Feed(this.posts);
    let feedElement = feed.getElement();

    document.body.innerHTML = '';
    document.body.appendChild(feedElement);
  }
}

let app = new App();
