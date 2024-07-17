import { initializeBeforeAfterComponent } from './beforeAfter';
import { initializeNavbar } from './navBar';
import { initializeCarousel } from './photoCarousel';

document.addEventListener('DOMContentLoaded', function () {
    initializeCarousel();
    initializeBeforeAfterComponent();
    initializeNavbar();
});