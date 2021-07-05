require('normalize.css/normalize.css');
require('./styles/index.scss');
require('./styles/about-company.scss');
require('./styles/choose-us.scss');
require('./styles/cookie.scss');
require('./styles/contact.scss');
require('./styles/footer.scss');
require('./styles/get-started.scss');
require('./styles/maps.scss');
require('./styles/nav.scss');
require('./styles/prices.scss');
require('./styles/welcome.scss');
require('./styles/what-we-offer.scss');

const NAVBAR_HEIGHT = 200;

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('#navbar');
  const navBarSticky = document.querySelector('#navbar-sticky');
  const mobileMenuToggleBtn = document.querySelector('#menu-toggle-btn');
  const mobileMenu = document.querySelector('.navigation__menu-mobile');
  const formLoader = document.querySelector('.contact__loader-wrapper');
  const submitFormBtn = document.querySelector('#submit-btn');
  const loaderInfoBox = document.querySelector('.contact__info-box');
  const cookieSection = document.querySelector('#cookie-warning');
  const cookieButton = document.querySelector('#cookie-btn');

  document.addEventListener('scroll', changeNavBar);
  navBar.addEventListener('click', handleNavbarClick);
  navBarSticky.addEventListener('click', handleNavbarClick);
  submitFormBtn.addEventListener('click', submitForm);

  mobileMenuToggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('navigation__menu-mobile--hidden');
  });

  const cookieAccepted = localStorage.getItem('cookie');

  if (cookieAccepted === 'accepted') {
    cookieSection.style.display = 'none';
  } else {
    cookieButton.addEventListener('click', () => {
      localStorage.setItem('cookie', 'accepted');
      cookieSection.style.display = 'none';
    });
  }

  changeNavBar();

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

  function submitForm() {
    const nameValue = document.querySelector('#name').value;
    const emailValue = document.querySelector('#email').value;
    const topicValue = document.querySelector('#subject').value;
    const messageValue = document.querySelector('#message').value;
    formLoader.classList.toggle('contact__loader-wrapper--active');

    fetch('https://submit-form.com/yxbIYTFL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        topic: topicValue,
        message: messageValue,
      }),
    })
      .then(function (response) {
        formLoader.classList.toggle('contact__loader-wrapper--active');
        loaderInfoBox.classList.toggle('contact__info-box--active');
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  new Splide('#image-slider', {
    rewind: true,
    pagination: true,
    cover: true,
    arrows: true,
    height: 600,
    autoplay: true,
    breakpoints: {
      768: {
        height: 340,
      },
      992: {
        height: 500,
      },
    }
  }).mount();
});
