function _injectScript (src, cb, additionalAttrs) {
  var head = document.querySelector('head');
  var script = document.createElement('script');

  script.onload = function () {
    cb.call(this);
  }.bind(this);
  script.setAttribute('async', false);
  script.src = src;
  if (additionalAttrs) {
    for (var attr in additionalAttrs) {
      script.setAttribute(attr, additionalAttrs[ attr ]);
    }
  }
  head.appendChild(script);
};

function addCubblesDynamically () {
  var crcRoot = document.querySelector('[cubx-core-crc]');
  console.log('crcRoot', crcRoot);
  var elem = document.createElement('review-compound');
  elem.setAttribute('cubx-dependency', 'this/review-compound/main');
  crcRoot.appendChild(elem);

  var rteWebpackage = 'cubx.core.rte@1.10.0-SNAPSHOT';
  var baseUrl = 'http://localhost:8282/';
  var crcLoaderUrl = baseUrl + rteWebpackage + '/crc-loader/js/main.js';
  var webComponentsUrl = baseUrl + rteWebpackage + '/webcomponents/webcomponents-lite.js';

  _injectScript(webComponentsUrl, function () {
    console.log('Webcomponents injected...');
  });

  _injectScript(crcLoaderUrl, function () {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('iframeReady', true, true, {});
    // Dispatch this 'iframeReady' event so that the CRC starts working
    document.dispatchEvent(event);
  },
  { 'data-crcinit-loadcif': 'true', 'data-cubx-startevent': 'iframeReady' });
}

window.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded');
  addCubblesDynamically();
});
