window.mainHeader = (function() {
  'use strict';

  var mainHeader = document.querySelector('.main-header');
  var mainHeaderMainNavWrapper = mainHeader.querySelector('.main-header__main-nav-wrapper');
  var wrappermainHeader = document.createElement('div');
  var mainHeaderOffsetTop = 0;

  wrappermainHeader.classList.add('main-header__wrapper');
  mainHeader.insertAdjacentElement('beforeBegin', wrappermainHeader);
  wrappermainHeader.appendChild(mainHeader);
  mainHeaderOffsetTop = mainHeader.offsetTop;
  wrappermainHeader.style.height = mainHeader.offsetHeight + 'px';

  var stickmainHeader = function() {
    mainHeader.classList.add('main-header--sticky');
  };

  var unstickmainHeader = function() {
    mainHeader.classList.remove('main-header--sticky');
  };

  var updateScroll = window.util.debounce(function() {
    if (window.pageYOffset > mainHeaderOffsetTop) {
      stickmainHeader();
    } else {
      unstickmainHeader();
    }
  }, 16);

  updateScroll();
  window.addEventListener('scroll', updateScroll);

  return {
    mainNavWrapper: mainHeaderMainNavWrapper,
    stick: stickmainHeader,
    unstick: unstickmainHeader
  };
})();
