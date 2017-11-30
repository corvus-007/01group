window.mainNav = (function() {
  'use strict';

  var mainNav = document.querySelector('.main-nav');

  var moveMainNavToNavbar = function() {
    window.mainHeader.mainNavWrapper.appendChild(mainNav);
    mainNav.classList.remove('main-nav--mobile');
  };

  var moveMainNavToOutCover = function() {
    window.outCover.mainNavWrapper.appendChild(mainNav);
    mainNav.classList.add('main-nav--mobile');
  };

  var updatePlaceNav = window.util.debounce(function() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      moveMainNavToNavbar();
    } else {
      moveMainNavToOutCover();
    }
  }, 150);

  updatePlaceNav();

  window.addEventListener('resize', updatePlaceNav);
})();
