    document.addEventListener('DOMContentLoaded', function () {
        var paralaxContainer = document.getElementById('paralax-container');
        paralaxContainer.style.height = window.innerHeight + 'px';
        var image = document.getElementById('image');
        window.addEventListener('scroll', function (){
                image.style.top = window.pageYOffset * 0.5 + 'px';
            }, {
            passive: true
        });
    });