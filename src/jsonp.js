/**
 * Data to string
 * @param {Object}
 * return {String}
 */
var serialize = function(data) {
  let str = '';
  for (var i in data) { str += `${i}=${data[i]}&`; }
  return str.replace(/&$/, '');
};

/**
 * Sends get request
 * @param {String}
 * @param {Object}
 */
let jsonp = function(url, options) {
  let callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || (() => {}),
      on_timeout = options.onTimeout || (() => {}),
      timeout = options.timeout || 10,
      data = options.data || {};

  let timeout_trigger = window.setTimeout(() => {
    window[callback_name] = () => {};
    on_timeout();
  }, timeout * 1000);

  window[callback_name] = (data) => {
    window.clearTimeout(timeout_trigger);
    on_success(data);
  }

  let urlWithData =  data ? `${url}?${serialize(data)}` : url;

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = urlWithData;

  document.getElementsByTagName('head')[0].appendChild(script);
}

export default jsonp;
