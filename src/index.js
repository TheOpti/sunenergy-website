require('normalize.css/normalize.css');
require('./styles/index.scss');
require('./styles/about-company.scss');
require('./styles/choose-us.scss');
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
  const navBar = document.querySelector('#nav-bar');
  const navBarSticky = document.querySelector('#nav-bar-sticky');
  const mobileMenuToggleBtn = document.querySelector('#menu-toggle-btn');
  const mobileMenu = document.querySelector('.navigation__menu-mobile');
  const formLoader = document.querySelector('.contact__loader-wrapper');
  const submitFormBtn = document.querySelector('#submit-btn');
  const loaderInfoBox = document.querySelector('.contact__info-box');

  setTimeout(() => {
    init();
    initMap();
  }, 100);

  function init() {
    navBarSticky.classList.add('navigation--theme-fixed');

    document.addEventListener('scroll', changeNavBar);
    navBar.addEventListener('click', handleNavbarClick);
    navBarSticky.addEventListener('click', handleNavbarClick);
    submitFormBtn.addEventListener('click', submitForm);

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

  function submitForm() {
    const nameValue = document.querySelector('#name').value;
    const emailValue = document.querySelector('#email').value;
    const topicValue = document.querySelector('#subject').value;
    const messageValue = document.querySelector('#message').value;

    formLoader.classList.toggle('contact__loader-wrapper--active');

    console.log('PRZED WYSLANIEM FORMULARZA, nameValue', nameValue);
    console.log('PRZED WYSLANIEM FORMULARZA, emailValue', emailValue);
    console.log('PRZED WYSLANIEM FORMULARZA, topicValue', topicValue);
    console.log('PRZED WYSLANIEM FORMULARZA, messageValue', messageValue);

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

  // Slider installation and config
  new Splide( '#image-slider', {
    rewind: true,
    pagination: true,
    cover: true,
    arrows: true,
    height: 600,
    autoplay: true,
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
    const warsaw = { lat: 52.20722, lng: 20.86833 };
    const chrusty = { lat: 51.72599, lng: 20.20336 };

    const firstMap = new google.maps.Map(document.getElementById('map-first'), { zoom: 12, center: warsaw });
    const secondMap = new google.maps.Map(document.getElementById('map-second'), { zoom: 12, center: chrusty });

    const warsawInfowindow = new google.maps.InfoWindow({
      content: `<div class="maps__marker">
         <p>Konotopska 9/12</p>
         <p>02-496 Warszawa</p>
      </div>`,
    });

    const chrustyInfowindow = new google.maps.InfoWindow({
      content: `<div class="maps__marker">
         <p>Chrusty 66A</p>
         <p>96-200 Rawa Mazowiecka</p>
      </div>`,
    });

    const warsawMarker = new google.maps.Marker({
      position: warsaw,
      map: firstMap,
      // icon: 'src/assets/images/map-marker.svg',
    });

    const chrustyMarker = new google.maps.Marker({
      position: chrusty,
      map: secondMap,
      // icon: 'src/assets/images/map-marker.svg',
    });

    warsawInfowindow.open({
      anchor: warsawMarker,
      firstMap,
      shouldFocus: false,
    });

    chrustyInfowindow.open({
      anchor: chrustyMarker,
      secondMap,
      shouldFocus: false,
    })
  }
});
