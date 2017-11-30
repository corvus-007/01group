window.outCover = (function() {
  'use strict';

  var outCover = document.querySelector('.out-cover');
  var outCoverCloseWrapper = outCover.querySelector(
    '.out-cover__close-wrapper'
  );
  var outCoverBody = outCover.querySelector('.out-cover__body');
  var outCoverMainNavWrapper = outCover.querySelector(
    '.out-cover__main-nav-wrapper'
  );
  var outCoverFooter = outCover.querySelector('.out-cover__footer');
  var outCoverToggler = document.querySelector('.out-cover-toggler');
  var outCoverClose = outCover.querySelector('.out-cover__close');
  var scrollWidth = window.util.getScrollbarWidth();
  var scrollPageValue = 0;

  var onOutCoverEscPress = function(event) {
    if (event.keyCode === window.util.KEYCODE_ESC) {
      hideOutCover();
    }
  };

  var getSumHeight = function() {
    var result = 0;

    for (var i = 0; i < arguments.length; i++) {
      result += arguments[i].offsetHeight;
    }

    return result;
  };

  var showOutCover = function() {
    scrollPageValue = window.pageYOffset;
    outCoverBody.style.height =
      'calc(100% - (' +
      getSumHeight(outCoverCloseWrapper, outCoverFooter) +
      'px))';
    document.body.classList.add('no-scroll');
    outCover.classList.add('out-cover--opened');
    document.addEventListener('keydown', onOutCoverEscPress);
  };

  var hideOutCover = function() {
    outCover.classList.remove('out-cover--opened');
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, scrollPageValue);
    document.removeEventListener('keydown', onOutCoverEscPress);
  };

  outCoverToggler.addEventListener('click', function(event) {
    event.preventDefault();
    showOutCover();
  });

  outCoverClose.addEventListener('click', function(event) {
    event.preventDefault();
    hideOutCover();
  });

  return {
    mainNavWrapper: outCoverMainNavWrapper,
    show: showOutCover,
    hide: hideOutCover
  };
})();
