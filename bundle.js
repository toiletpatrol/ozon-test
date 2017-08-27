/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(1);

var _post = __webpack_require__(2);

var _post2 = _interopRequireDefault(_post);

var _feed = __webpack_require__(4);

var _feed2 = _interopRequireDefault(_feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.fetch();

    var preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div>Loading...</div>';

    document.body.appendChild(preloader);
  }

  _createClass(App, [{
    key: 'fetch',
    value: function fetch() {
      var _this = this;

      _request.jsonp.get('https://api.instagram.com/v1/users/691623/media/recent', {
        data: {
          access_token: '691623.1419b97.479e4603aff24de596b1bf18891729f3',
          count: 20,
          callback: 'instagramFeedCallback'
        },
        callbackName: 'instagramFeedCallback',
        onSuccess: function onSuccess(data) {
          _this.posts = _this.parseData(data);
          _this.render();
        },
        onTimeout: function onTimeout() {
          console.log('timeout');
        }
      });
    }
  }, {
    key: 'parseData',
    value: function parseData(data) {
      var posts = [];

      for (var i = 0; i < data.data.length; i++) {
        posts.push(new _post2.default(data.data[i]));
      }

      return posts;
    }
  }, {
    key: 'render',
    value: function render() {
      var feed = new _feed2.default(this.posts);
      var feedElement = feed.getElement();

      document.body.innerHTML = '';
      document.body.appendChild(feedElement);

      feed.render();
    }
  }]);

  return App;
}();

var app = new App();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var serialize = function serialize(data) {
  var str = '';

  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }

  return str.replace(/&$/, '');
};

var jsonp = function () {
  var that = {};

  /**
   * Sends get request
   * @param {String}
   * @param {Object}
   */
  that.get = function (url, options) {
    var callback_name = options.callbackName || 'callback',
        on_success = options.onSuccess || function () {},
        on_timeout = options.onTimeout || function () {},
        timeout = options.timeout || 10,
        data = options.data || {};

    var timeout_trigger = window.setTimeout(function () {
      window[callback_name] = function () {};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function (data) {
      window.clearTimeout(timeout_trigger);
      on_success(data);
    };

    var urlWithData = data ? url + '?' + serialize(data) : url;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = urlWithData;

    document.getElementsByTagName('head')[0].appendChild(script);
  };

  return that;
}();

var ajax = {
  get: function get(url, data, callback) {
    var urlWithData = data ? url + '?' + serialize(data) : url;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.open('GET', urlWithData, true);
    xmlHttp.send(null);
  }
};

exports.ajax = ajax;
exports.jsonp = jsonp;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formatDate = __webpack_require__(3);

var _formatDate2 = _interopRequireDefault(_formatDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Post = function () {
  function Post(data) {
    _classCallCheck(this, Post);

    this.data = data;
    this.render();
  }

  _createClass(Post, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      this.element = document.createElement('div');
      this.element.className = 'post';

      var data = this.data;

      // Assets: Header
      var pic = data.user.profile_picture;
      var username = data.user.username;
      var location = data.location && data.location.name;
      var date = (0, _formatDate2.default)(data.created_time);

      // Assets: Image
      var src = data.images && data.images.standard_resolution && data.images.standard_resolution.url;
      var alt = '@' + username;

      // Assets: Actions
      var likes = data.likes.count;

      // Assets: Caption
      var captionText = data.caption && data.caption.text;

      // Template
      var header = '\n      <div class="post_header">\n        <div class="post_header-pic" style="background-image: url(\'' + pic + '\');"></div>\n        <div class="post_header-middle">\n          <div class="post_header-name">' + username + '</div>\n          ' + (location ? '<div class="post_header-location">' + location + '</div>' : '') + '\n        </div>\n        <div class="post_header-date">' + date + '</div>\n      </div>';

      var image = function image(className) {
        return '\n      <div class="post_image ' + className + '">\n        <img src="' + src + '" alt="' + alt + '" />\n      </div>\n    ';
      };

      var actions = '\n      <div class="post_actions">\n        <div class="post_actions-like"></div>\n        <div class="post_actions-likes">' + likes + '</div>\n      </div>\n    ';

      var caption = captionText ? '<div class="post_caption">' + captionText + '</div>' : '';

      this.element.innerHTML = '\n      <div class="post_inner">\n        ' + image('post_image__horizontal') + '\n\n        <div class="post_inner-solid">\n          ' + header + '\n          ' + image('post_image__vertical') + '\n          ' + actions + '\n          ' + caption + '\n        </div>\n      </div>\n    ';

      // Actions
      this.element.getElementsByClassName('post_actions-like')[0].onclick = function () {
        alert(_this.data.id);
      };
    }
  }]);

  return Post;
}();

exports.default = Post;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SECOND = 1000;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var YEAR = DAY * 365;

var format = function format(str) {
  var date = new Date(parseInt(str) * 1000);
  var now = new Date();

  var diff = now.getTime() - date.getTime();

  if (diff >= YEAR) {
    return Math.floor(diff / YEAR) + "y";
  }

  if (diff >= WEEK) {
    return Math.floor(diff / WEEK) + "w";
  }

  if (diff >= DAY) {
    return Math.floor(diff / DAY) + "d";
  }

  if (diff >= HOUR) {
    return Math.floor(diff / HOUR) + "h";
  }

  if (diff >= MINUTE) {
    return Math.floor(diff / MINUTE) + "m";
  }

  if (diff >= SECOND) {
    return Math.floor(diff / SECOND) + "s";
  }
};

exports.default = format;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Feed = function () {
  function Feed(posts) {
    _classCallCheck(this, Feed);

    this.posts = posts;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'feed');
  }

  _createClass(Feed, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.element) {
        this.element.innerHTML = '';
      }

      var posts = this.posts;

      for (var i = 0; i < posts.length; i++) {
        var postElement = posts[i].getElement();
        this.element.appendChild(postElement);
      }
    }
  }, {
    key: 'getColumnsCount',
    value: function getColumnsCount() {
      var w = getElementContentWidth(this.element);
      var columns = 0;

      while (w > DESKTOP_COLUMN_WIDTH + DESKTOP_COLUMN_GAP) {
        w -= DESKTOP_COLUMN_WIDTH + DESKTOP_COLUMN_GAP;
        columns++;
      }

      if (w > DESKTOP_COLUMN_WIDTH) {
        columns++;
      }

      return columns ? columns : 1;
    }
  }]);

  return Feed;
}();

exports.default = Feed;

/***/ })
/******/ ]);