require('normalize.css/normalize.css');
require('./styles/index.scss');
require('./styles/about-company.scss');
require('./styles/choose-us.scss');
require('./styles/contact.scss');
require('./styles/footer.scss');
require('./styles/get-started.scss');
require('./styles/maps.scss');
require('./styles/nav.scss');
require('./styles/our-projects.scss');
require('./styles/welcome.scss');
require('./styles/what-we-offer.scss');

const NAVBAR_HEIGHT = 200;

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('#nav-bar');
  const navBarSticky = document.querySelector('#nav-bar-sticky');
  const mobileMenuToggleBtn = document.querySelector('#menu-toggle-btn');
  const mobileMenu = document.querySelector('.navigation__menu-mobile');

  setTimeout(() => {
    init();
    initMap();
  }, 100);

  function init() {
    navBarSticky.classList.add('navigation--theme-fixed');

    document.addEventListener('scroll', changeNavBar);
    navBar.addEventListener('click', handleNavbarClick);
    navBarSticky.addEventListener('click', handleNavbarClick);

    mobileMenuToggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('navigation__menu-mobile--hidden');
    });

    changeNavBar();
  }

  function handleNavbarClick(event) {
    if (event.target.classList.contains('navigation__menu-item')) {
      const isMobile = window.innerWidth < 768;

      const elementToScroll = document.querySelector(`#${event.target.dataset.section}`);
      const elemOffset = elementToScroll.offsetTop;
      const diff = isMobile ? 20 : NAVBAR_HEIGHT + 20;

      window.scroll({
        top: elemOffset - diff,
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

  // Slider installation and config
  new Splide( '#image-slider', {
    rewind: true,
    pagination: true,
    cover: true,
    arrows: true,
    height: 600,
    breakpoints: {
      768: {
        height: 400,
      },
      992: {
        height: 500,
      },
    }
  }).mount();

  function initMap() {
    const uluru = { lat: 52.20722, lng: 20.86833 };
    const newYork = { lat: 51.72599, lng: 20.20336 };

    const firstMap = new google.maps.Map(document.getElementById('map-first'), { zoom: 9, center: uluru });
    const secondMap = new google.maps.Map(document.getElementById('map-second'), { zoom: 8, center: newYork });

    new google.maps.Marker({ position: uluru, map: firstMap });
    new google.maps.Marker({ position: newYork, map: secondMap });
  }
});
