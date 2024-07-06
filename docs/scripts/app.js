
function initializeCarousel() {
    const carouselElement   = document.getElementsByClassName('js-photo-carousel')[0];
    if (!carouselElement) {
        return; 
    }
    const photoGridElement  = document.getElementsByClassName('js-photo-grid')[0];
    const modalElement      = document.getElementsByClassName('js-photo-carousel-modal')[0];

    // Step 2: Initialize Flowbite components
    const flowbiteCarousel  = initializeFlowbiteCarousel(carouselElement);
    const flowbiteModal     = initializeFlowbiteModal(modalElement);

    // Step 3: Bind event listeners (Carousel <> Flowbite Carousel, Thumbnails <> Flowbite Modal)
    bindCarouselEventListeners(carouselElement, flowbiteCarousel);
    bindPhotoGridEventListeners(photoGridElement, flowbiteModal, flowbiteCarousel);
    bindSwipeGestureEventListeners(carouselElement, flowbiteCarousel);
    bindModalCloseEventListeners(modalElement, flowbiteModal);
}

/**
 * Binds Image Carousel event listeners to both Photo Grid Mobile / Desktop
 *
 * @param {Array} photos - The array of photos.
 * @param {HTMLElement} photoGridElement - The photo grid element.
 * @param {Object} flowbiteModal - The Flowbite modal object.
 * @param {Object} flowbiteCarousel - The Flowbite carousel object.
 */
function bindPhotoGridEventListeners(photoGridElement, flowbiteModal, flowbiteCarousel) {
    const imgElements   = Array.from(photoGridElement.querySelectorAll('img'));
    const numPhotos     = imgElements.length / 2;
    const desktopImg    = imgElements.slice(0, numPhotos);
    const mobileImg     = imgElements.slice(numPhotos);

    for (let i = 0; i < numPhotos; i++) {
        desktopImg[i].addEventListener('click', function() {
            flowbiteCarousel.slideTo(i);
            flowbiteModal.show();
        });
        mobileImg[i].addEventListener('click', function() {
            flowbiteCarousel.slideTo(i);
            flowbiteModal.show();
        });
    }
}

/**
 * Binds event listeners to the previous and next buttons of a carousel element.
 * @param {HTMLElement} carouselElement - The carousel element to bind the event listeners to.
 * @param {Object} flowbiteCarousel - The Flowbite carousel object.
 */
function bindCarouselEventListeners(carouselElement, flowbiteCarousel) {
    const $prevButton = carouselElement.querySelectorAll('[data-id=data-carousel-prev]')[0]; 
    const $nextButton = carouselElement.querySelectorAll('[data-id=data-carousel-next]')[0]; 
    $prevButton.addEventListener('click', () => {
        flowbiteCarousel.prev();
    });
    $nextButton.addEventListener('click', () => {
        flowbiteCarousel.next();
    });
}

/**
 * Binds event listeners to thumbnail elements.
 *
 * @param {Element} thumbnailsElement - The parent element containing the thumbnail elements.
 * @param {Object} flowbiteModal - The Flowbite modal object.
 * @param {Object} flowbiteCarousel - The Flowbite carousel object.
 */
function bindThumbnailEventListeners(thumbnailsElement, flowbiteModal, flowbiteCarousel) {
    const thumbnails = thumbnailsElement.querySelectorAll('img');
    for (let i = 0; i < thumbnails.length; i++) {
        const thumbnail = thumbnails[i];
        thumbnail.addEventListener('click', function() {
            console.log("thumbnail clicked", thumbnail);
            flowbiteCarousel.slideTo(i);
            flowbiteModal.show();
        });
    }
}

const SWIPE_THRESHOLD = 25;
let touch = { startX: 0, startY: 0, endX: 0, endY: 0 };

/**
 * Binds swipe gesture event listeners to the carousel element.
 *
 * @param {HTMLElement} carouselElement - The carousel element to bind the event listeners to.
 * @param {FlowbiteCarousel} flowbiteCarousel - The FlowbiteCarousel instance.
 */
function bindSwipeGestureEventListeners(carouselElement, flowbiteCarousel) {
    carouselElement.addEventListener('touchstart', function(e) {
        touch.startX = e.changedTouches[0].screenX
        touch.startY = e.changedTouches[0].screenY
    });
    carouselElement.addEventListener('touchend', function(e) {
        touch.endX = e.changedTouches[0].screenX
        touch.endY = e.changedTouches[0].screenY

        // if (isSwipeUp() || isSwipeDown())   flowbiteModal.toggle();
        if (isSwipeRight())     flowbiteCarousel.prev();
        if (isSwipeLeft())      flowbiteCarousel.next();
    })
}

/**
 * Binds event listeners to the close button of a modal element.
 * @param {Element} modalElement - The modal element containing the close button.
 * @param {Object} flowbiteModal - The Flowbite modal object.
 */
function bindModalCloseEventListeners(modalElement, flowbiteModal) {
    const $closeButton = modalElement.querySelectorAll('.modal-close')[0];
    $closeButton.addEventListener('click', () => {
        flowbiteModal.hide();
    });
}


/**
 * Initializes a Flowbite modal with the specified modal ID.
 * @returns {Modal} The initialized modal instance.
 */
function initializeFlowbiteModal(modalElement) {
    const options = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
            // 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            'fixed inset-0 z-40',
        closable: true,
        onHide:      () => { console.log('modal is hidden'); },
        onShow:      () => { console.log('modal is shown'); },
        onToggle:    () => { console.log('modal has been toggled'); },
    };

    const instanceOptions = {
        override: true
    };
    const modal = new Modal(modalElement, options, instanceOptions);
    return modal;
}

/**
 * Initializes a Flowbite carousel.
 *
 * @param {Array} photos - An array of photos for the carousel.
 * @returns {Carousel} The initialized carousel instance.
 */
function initializeFlowbiteCarousel(carouselElement) {
    var n = carouselElement.getElementsByTagName('img').length;
    var items = [], indicators = []; 
    for (var i = 0; i < n; i++) {
        items.push({
            position:   i,
            el:         carouselElement.querySelector(`[data-id=carousel-item-${i}]`) 
        });
        indicators.push({
            position:   i,
            el:         carouselElement.querySelector(`[data-id=carousel-indicator-${i}]`) 
        })
    }

    const options = {
        defaultPosition: 1,
        interval: 3000,
        indicators: {
            activeClasses: 'bg-gray-500',
            inactiveClasses:
                'bg-gray-800',
            items: indicators,
        },

        onNext:     () => { console.log('next slider item is shown'); },
        onPrev:     () => { console.log('previous slider item is shown'); },
        onChange:   () => { console.log('new slider item has been shown'); },    
    };

    const instanceOptions = {
        override: false
    };
    const carousel = new Carousel(carouselElement, items, options, instanceOptions);
    return carousel;
}

/**
 * Check swipe gesture directions
 *
 * @returns {boolean} Returns true if the swipe is up / down / left / right
 */
function isSwipeUp() {
    const distY = Math.abs(touch.endY - touch.startY);
    return (touch.endY < touch.startY && distY > SWIPE_THRESHOLD);
}
function isSwipeDown() {
    const distY = Math.abs(touch.endY - touch.startY);
    return (touch.endY > touch.startY && distY > SWIPE_THRESHOLD);
}
function isSwipeRight() {
    const distX = Math.abs(touch.endX - touch.startX);
    return (touch.endX > touch.startX && distX > SWIPE_THRESHOLD);
}
function isSwipeLeft() {
    const distX = Math.abs(touch.endX - touch.startX);
    return (touch.endX < touch.startX && distX > SWIPE_THRESHOLD);
}

/**********************************************
 * 
 * Navbar Component 
 * 
 *********************************************/

let enableTransparency = true;
let topOfPage = true;
let flowbiteCarousel = null;

function initializeNavbar() {
    pixelAnchor = document.getElementById("top-of-site-pixel-anchor");
    flowbiteCarousel = initializeFlowbiteNavbar();
    if (pixelAnchor != null) {
        enableTransparency = true 
        initializeIntersectionObserver();
    } else {
        enableTransparency = false 
        setNavbarSlate();
    }
}

function collapseNavbar() {
    flowbiteCarousel.collapse();
} 

function initializeFlowbiteNavbar() {
    const $targetEl = document.getElementById("navbar-hamburger");

    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl = document.getElementById('navbar-button');

    // optional options with default values and callback functions
    const options = {
        onCollapse: () => {
            console.log("collapsed navbar");
            document.body.classList.remove("overflow-hidden");
            updateNavbarBackgroundColor();
        },
        onExpand: () => {
            console.log("expanded navbar");
            document.body.classList.add("overflow-hidden");
            setNavbarSlate();
        },
        // onToggle: () => {   console.log('element has been toggled');    },
    };

    const instanceOptions = {
        id: 'targetEl',
        override: true,
    };
    const collapse = new Collapse($targetEl, $triggerEl, options, instanceOptions);
    return collapse;
}

function initializeIntersectionObserver() {
    if (
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
        let observer = new IntersectionObserver(entries => {
            if (entries[0].boundingClientRect.y < 0) {
                topOfPage = false;
                updateNavbarBackgroundColor();
            } else {
                topOfPage = true;
                updateNavbarBackgroundColor();            
            }
        });
        observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
    }
}

// if we're on Mobile, the background color is going to depend on where we are on the page AND whether the navbar is expanded or collapsed
// if the navbar is expanded, the background color is always going to be the same (bg-slate-950)
// if the navbar is collapsed,
//      if we're at the top of the page, the navbar will be trasnparent
//      if we're at further down the page (based on Intersection Observer), the navbar will be bg-slate-950
// if we're on Desktop, then backgrouhnd color is only determined by position on page
function updateNavbarBackgroundColor() {
    if (enableTransparency) {
        if (topOfPage) setNavbarTransparent();
        else setNavbarSlate();
    }
}

function setNavbarTransparent() {
    document.getElementById("navbar").classList.add("bg-transparent");
    document.getElementById("navbar").classList.remove("bg-slate-950");
}
function setNavbarSlate() {
    document.getElementById("navbar").classList.add("bg-slate-950");
    document.getElementById("navbar").classList.remove("bg-transparent");
}


/**********************************************
 * 
 * Before / After Component 
 * 
 *********************************************/

/**
 * Binds event listeners for a before-after element.
 * 
 * @param {HTMLElement} beforeAfterElement - The before-after element to bind event listeners to.
 */
function initializeBeforeAfterComponent() {
    const beforeAfterElement    = document.getElementsByClassName("before-after-slider")[0]
    if (!beforeAfterElement) {
        return; 
    }
    const beforeImageContainer  = beforeAfterElement.getElementsByClassName('before-image')[0];
    const beforeImageElement    = beforeImageContainer.getElementsByTagName('img')[0];
    const resizerElement        = beforeAfterElement.getElementsByClassName('resizer')[0];

    // The active variable is likely used to track whether the slider is currently being interacted with.
    let active = false;

    // Sort overflow out for Overlay Image
    let width = beforeAfterElement.offsetWidth;
    beforeImageElement.style.width = width + 'px';

    // Adjust width of image on resize 
    window.addEventListener('resize', function () {
        let width = beforeAfterElement.offsetWidth;
        beforeImageElement.style.width = width + 'px';
    })

    resizerElement.addEventListener('mousedown',   () => active = true);
    resizerElement.addEventListener('touchstart',  () => active = true);
    beforeAfterElement.addEventListener('mouseup',      () => active = false);
    beforeAfterElement.addEventListener('mouseleave',   () => active = false);
    beforeAfterElement.addEventListener('touchend',     () => active = false);
    beforeAfterElement.addEventListener('touchcancel',  () => active = false);
    
    beforeAfterElement.addEventListener('mousemove', function (e) {
        if (!active) return;
        let x = e.pageX;
        x -= beforeAfterElement.getBoundingClientRect().left;
        sliderDivider(x);
        pauseEvent(e);
    });

    // Touch support for mobile devices
    beforeAfterElement.addEventListener('touchmove', function (e) {
        if (!active) return;
        let x;
        for (let i = 0; i < e.changedTouches.length; i++) {
            x = e.changedTouches[i].pageX;
        }
        x -= beforeAfterElement.getBoundingClientRect().left;
        sliderDivider(x);
        pauseEvent(e);
    });

    function sliderDivider(x) {
        let transform = Math.max(0, (Math.min(x, beforeAfterElement.offsetWidth)));
        beforeImageContainer.style.width = transform + "px";
        resizerElement.style.left = transform - 0 + "px";
    }

    function pauseEvent(e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}

/**********************************************
 * 
 * Main Runner Code  
 * 
 *********************************************/

document.addEventListener('DOMContentLoaded', function () {
    initializeNavbar();
    initializeBeforeAfterComponent();
    initializeCarousel();
});