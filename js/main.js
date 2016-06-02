//following code control the hamburger menu
var menu = document.querySelector('#menu');
var main = document.querySelector('body');
var drawer = document.querySelector('.menu-bar');

menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open'); e.stopPropagation();
});
main.addEventListener('click', function() {
    drawer.classList.remove('open');
});

//the following code control the resume generating
