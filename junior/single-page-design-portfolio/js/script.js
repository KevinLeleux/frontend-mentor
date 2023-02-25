document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide', {
        pagination: false,
        type: 'loop',
        perPage: 3,
        perMove: 1,
        focus: 'center',
        autoWidth: true,
        gap: '3rem',
    });
    splide.mount();
});
