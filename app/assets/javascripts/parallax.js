var ypos;
var image;

function parallax() {
    ypos = window.pageYOffset;
    image = document.getElementById('image');
    image.style.top = ypos * .8 + 'px';
};

window.addEventListener('scroll',parallax);