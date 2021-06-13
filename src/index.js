require('normalize.css/normalize.css');
require('./styles/index.scss');
require('./styles/about-company.scss');
require('./styles/contact.scss');
require('./styles/footer.scss');
require('./styles/get-started.scss');
require('./styles/nav.scss');
require('./styles/our-projects.scss');
require('./styles/pricing.scss');
require('./styles/welcome.scss');
require('./styles/what-we-offer.scss');

const NAVBAR_HEIGHT = 210;

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('#nav-bar');
  const navBarSticky = document.querySelector('#nav-bar-sticky');
  let sections, offsets;

  setTimeout(() => {
    sections = [...document.querySelectorAll('section[id]')];
    offsets = sections.map((elem) => elem.offsetTop);

    init();
  }, 100);

  const navigationMenuBtns = [
    ...document.querySelectorAll('.navigation__menu-item'),
  ];

  function init() {
    navBarSticky.classList.add('navigation--theme-fixed');

    navBar.addEventListener('click', handleNavbarClick);
    navBarSticky.addEventListener('click', handleNavbarClick);

    document.addEventListener('scroll', changeNavBar);
    window.addEventListener('scroll', throttle(handleScrollMovement, 275));

    changeNavBar();
  }

  function handleNavbarClick(event) {
    if (event.target.classList.contains('navigation__menu-item')) {
      const elementToScroll = document.querySelector(
        `#${event.target.dataset.section}`
      );
      const elemOffset = elementToScroll.offsetTop;

      window.scroll({
        top: elemOffset - NAVBAR_HEIGHT,
        behavior: 'smooth',
      });
    }
  }

  function changeNavBar() {
    if (window.scrollY > 170) {
      navBarSticky.classList.remove('navigation--theme-fixed');
      navBarSticky.classList.add('navigation--theme-fixed-on');
    } else {
      navBarSticky.classList.remove('navigation--theme-fixed-on');
      navBarSticky.classList.add('navigation--theme-fixed');
    }
  }

  function handleScrollMovement() {
    const scrollPosition = window.scrollY;

    const matchingOffset = offsets
      .slice()
      .reverse()
      .find((offset) => scrollPosition > offset - 300);

    const matchingOffsetIdx = offsets.findIndex(
      (offset) => offset === matchingOffset
    );

    offsets.forEach((_, idx) => {
      if (matchingOffsetIdx === idx) {
        navigationMenuBtns[idx].classList.add('navigation__menu-item--active');
      } else {
        navigationMenuBtns[idx].classList.remove(
          'navigation__menu-item--active'
        );
      }
    });
  }

  function throttle(func, wait) {
    let inThrottle;

    return (...args) => {
      const context = this;
      if (!inThrottle) {
        func.apply(context, ...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), wait);
      }
    };
  }

  // Slider installation and config
  new Splide( '#image-slider', {
    rewind: true,
    pagination: true,
    cover: true,
    arrows: true,
    height: 600,
  }).mount();
});
