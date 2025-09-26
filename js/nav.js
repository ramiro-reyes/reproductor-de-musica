const hamburger = document.getElementById('hamburger');
const navWrapper = document.querySelector('.nav-wrapper');

hamburger.addEventListener('click', () => {
  navWrapper.classList.toggle('active');
});