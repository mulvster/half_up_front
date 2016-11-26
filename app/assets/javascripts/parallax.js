document.addEventListener('DOMContentLoaded', function () {
    var paralaxContainer = document.getElementById('paralax-container');
    if(paralaxContainer) {
        paralaxContainer.style.height = window.innerHeight + 'px';
        var image = document.getElementById('image');
        window.addEventListener('scroll', function (){
                image.style.top = window.pageYOffset * 0.5 + 'px';
            }, {
            passive: true
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var paralaxContainer = document.getElementById('second-container');
    if(paralaxContainer) {
        paralaxContainer.style.height = window.innerHeight + 'px';
        var image = document.getElementById('secondimage');
        window.addEventListener('scroll', function (){
                image.style.top = window.pageYOffset * 0.5 + 'px';
            }, {
            passive: true
        });
    }

});