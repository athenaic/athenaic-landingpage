$(document).ready(function(){

    // Navbar shrink function
    var navbarShrink = function () {
        const $navbarCollapsible = $('#mainNav');
        if (!$navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            $navbarCollapsible.removeClass('navbar-shrink')
        } else {
            $navbarCollapsible.addClass('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    $(document).on('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = $('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    $('#navbarResponsive .nav-link').on('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
            navbarToggler.trigger("click");
        }
    });
});

