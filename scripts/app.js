/**********************************************
 * 
 * Main Entry Point 
 * 
 *********************************************/

function renderPageFromConfig(config) {
    createNavbarComponent();

    if (config.enableNavBarTransparentEffect) {
        document.body.append(fromHTML(generatePixelAnchorHTML()));
        initializeIntersectionObserver();
    }

    if (config.heroMedia) {
        (isMobile()) ?
            document.body.append(fromHTML(generateHeroHTML(config.heroMedia.mobile))) :
            document.body.append(fromHTML(generateHeroHTML(config.heroMedia.desktop)));
    }

    if (config.title1 && config.title2 && config.projectOverviewText) {
        document.body.append(fromHTML(generateProjectOverviewSection(config.title1, config.title2, config.projectOverviewText)));
    }

    if (config.beforeImg && config.afterImg) {
        document.body.append(fromHTML(generateBeforeAfterHeader()));
        createBeforeAfterComponent(config.beforeImg, config.afterImg);
    }
    if (config.beforeImg2 && config.afterImg2) {
        createBeforeAfterComponent(config.beforeImg2, config.afterImg2);
    }

    if (config.photoGridImages) {
        document.body.append(fromHTML(generateTheDetailsHeader()));
        createPhotoGridComponent(config.photoGridImages);
    }

    if (config.storyText) {
        document.body.append(fromHTML(generateTheStorySection(config.storyText)));
    }

    document.body.append(fromHTML(generateFooterHTML()));
}


/**********************************************
 * 
 * Before / After Comparison Component
 * 
 *********************************************/

/**
 * Creates a before-after component and adds it to the DOM.
 * 
 * @param {string} beforeImage - The URL of the before image.
 * @param {string} afterImage - The URL of the after image.
 */
function createBeforeAfterComponent(beforeImage, afterImage) {
    var uuid = uuidv4();
    const beforeAfterId   = `before-after-${uuid}`;

    // Step 1: Add to the DOM
    const beforeAfterHTML  = generateBeforeAfterHTML(beforeAfterId, beforeImage, afterImage);
    document.body.append(fromHTML(beforeAfterHTML));

    // Step 3: Bind event listeners
    const beforeAfterElement = document.getElementById(beforeAfterId);
    bindBeforeAfterEventListeners(beforeAfterElement);
}

/**
 * Generates the HTML markup for a before-after image slider.
 *
 * @param {string} id - The ID of the slider container.
 * @param {string} beforeImage - The URL of the before image.
 * @param {string} afterImage - The URL of the after image.
 * @returns {string} The HTML markup for the before-after image slider.
 */
function generateBeforeAfterHTML(id, beforeImage, afterImage) {
    return `
    <div class="slider-container px-4 md:px-0 pb-4 md:mx-auto md:max-w-4xl">
        <div class="image-container md:h-[44rem]">
            <div id="${id}" class="before-after-slider">
                <div class="before-image">
                    <img class="slider-image" src=${beforeImage} loading="lazy" alt=""/>
                </div>
                <div class="after-image">
                    <img class="slider-image" src=${afterImage} loading="lazy" alt=""/>
                </div>
                <div class="resizer"></div>
            </div>
        </div>
    </div>`;
}

/**
 * Binds event listeners for a before-after element.
 * 
 * @param {HTMLElement} beforeAfterElement - The before-after element to bind event listeners to.
 */
function bindBeforeAfterEventListeners(beforeAfterElement) {
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
 * Photo Grid Component (supports any mulitple of 4 or 6 photos)
 * 
 *********************************************/

function createPhotoGridComponent(photos) {
    var uuid = uuidv4();
    const carouselId    = `carousel-${uuid}`;
    const modalId       = `modal-${uuid}`;
    const photoGridId   = `photo-grid-${uuid}`;

    // create Mobile photo grid and append to document body
    // create Desktop photo grid and append to document body
    // update the Tailwind classes on both of those so that they are hidden on the opposite view
    // do we need to create two modals? or can we just use the same modal for both views?

    // Step 1: Add photo grid, carousel, and modal to the DOM
    // const photoGridHTML  = isMobile() ? 
    //     generatePhotoGridMobileHTML(photoGridId, photos) :
    //     generatePhotoGridDesktopHTML(photoGridId, photos);
    const photoGridHTML = generatePhotoGridHTML(photoGridId, photos);

    const carouselHTML   = generateCarouselHTML(carouselId, photos);
    const modalHTML      = generateModalHTML(modalId, carouselHTML);
    document.body.append(fromHTML(photoGridHTML));
    document.body.append(fromHTML(modalHTML));

    // Step 2: Initialize Flowbite components
    const flowbiteCarousel  = initializeFlowbiteCarousel(carouselId, photos);
    const flowbiteModal     = initializeFlowbiteModal(modalId);

    // Step 3: Bind event listeners (Carousel <> Flowbite Carousel, Thumbnails <> Flowbite Modal)
    const carouselElement   = document.getElementById(carouselId);
    const photoGridElement = document.getElementById(photoGridId);
    const modalElement      = document.getElementById(modalId);
    bindCarouselEventListeners(carouselElement, flowbiteCarousel);
    bindPhotoGridEventListeners(photos, photoGridElement, flowbiteModal, flowbiteCarousel);
    bindSwipeGestureEventListeners(carouselElement, flowbiteCarousel);
    bindModalCloseEventListeners(modalElement, flowbiteModal);
}

function generatePhotoGridHTML(photoGridId, photos) {
    return `
    <div id=${photoGridId}>
        <div class="hidden md:block pb-8">
            ${generatePhotoGridDesktopHTML(photoGridId, photos)}
        </div>
        <div class="md:hidden">
            ${generatePhotoGridMobileHTML(photoGridId, photos)}
        </div>
    </div>`;
}

/**
 * Generates the HTML for a photo grid
 * Supports any mulitple of 6 photos
 *
 * @param {string} id - The ID of the container element.
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The generated HTML for the photo grid.
 */
function generatePhotoGridMobileHTML(id, photos) {
    var HTML = "";
    if (photos.length % 6 === 0) {
        for (var i = 0; i < (photos.length / 6); i++) {
            HTML += generatePhotoGrid6HTML(photos.slice(i * 6, i * 6 + 6));
        }
        return generatePhotoGridWrapperHTML(id, HTML);
    } else {
        alert("Photo Grid supports only multiples of 6 photos");
        return "<div></div>";
    }
}

/**
 * Generates the HTML for the carousel wrapper
 * 
 * @param {string} id - id of the carousel
 * @param {string} HTML - inner HTML for the photo grid
 * @returns {string} The generated HTML for the photo grid.
 */
function generatePhotoGridWrapperHTML(id, innerHTML) {
    return `
    <div class="flex justify-center my-4 pb-4 px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${innerHTML}
        </div>
    </div>`;
}

/**
 * Generates the HTML for a photo grid with 6 photos
 *
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The generated HTML for the photo grid.
 */
function generatePhotoGrid6HTML(photos) {
    return `
        <div class="grid gap-4 overflow-auto">
            <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[0]}" loading="lazy" alt=""></div>
            <div><img class="h-32 w-52 max-w-full rounded-lg object-cover" src="${photos[1]}" loading="lazy" alt=""></div>
            <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[2]}" loading="lazy" alt=""></div>
        </div>
        <div class="grid gap-4">
            <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[3]}" loading="lazy" alt=""></div>
            <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[4]}" loading="lazy" alt=""></div>
            <div><img class="h-32 w-52 max-w-full rounded-lg object-cover" src="${photos[5]}" loading="lazy" alt=""></div>
        </div>
    `;
}

/**
 * Generates the HTML for a photo grid on desktop view.
 * 
 * @param {string} id - The ID of the container element.
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The generated HTML.
 */
function generatePhotoGridDesktopHTML(id, photos) {
    var HTML = "";
    const chunkSize = 6;
    for (let i = 0; i < photos.length; i += chunkSize) {
        let photosSubset = photos.slice(i, i + chunkSize);
        HTML += generatePhotoGrid6DesktopHTML(photosSubset);
    }
    return generatePhotoGridWrapperDesktopHTML(id, HTML);
}

/**
 * Generates the HTML for the desktop version of the photo grid wrapper.
 *
 * @param {string} id - The ID of the wrapper element.
 * @param {string} innerHTML - The inner HTML content of the wrapper element.
 * @returns {string} The generated HTML for the desktop photo grid wrapper.
 */
function generatePhotoGridWrapperDesktopHTML(id, innerHTML) {
    return `
    <div id="${id}" class="md:mx-auto md:max-w-4xl">
        ${innerHTML}
    </div>`;
}

/**
 * Generates the HTML for a photo grid layout on desktop devices.
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The generated HTML for the photo grid layout.
 */
function generatePhotoGrid6DesktopHTML(photos) {
    return `
        <!-- 2 Col with Vertical Photos-->
        <section class="pb-4 px-4 h-3/4">
            <div class="flex flex-wrap -mx-4 h-full">
                <div class="md:w-2/5 h-full pr-4">
                    <div class="h-1/2 pb-2">
                        <img class="h-full w-full object-cover md:hover:cursor-pointer" src="${photos[0]}" loading="lazy" alt="">
                    </div>
                    <div class="h-1/2 pt-2">
                        <img class="h-full w-full object-cover md:hover:cursor-pointer" src="${photos[1]}" loading="lazy" alt="">
                    </div>
                </div>
                <div class="hidden md:block md:w-3/5 h-full">
                    <img class="h-full md:w-full md:min-h-full md:object-cover md:hover:cursor-pointer" src="${photos[2]}" loading="lazy" alt="">
                </div>
            </div>
        </section>

        <!-- Two Photo -->
        <section class="pb-4 px-4 h-3/4">
            <div class="flex flex-wrap -mx-4 h-full">
                <div class="h-full md:w-1/2 pr-2 mb-2 md:mb-0">
                    <img width="1200" height="1800" class="object-cover h-full w-full md:hover:cursor-pointer" src="${photos[3]}" loading="lazy" alt="">
                </div>
                <div class="h-full md:w-1/2 pl-2 mb-2 md:mb-0">
                    <img width="1200" height="1800" class="object-cover h-full w-full md:hover:cursor-pointer" src="${photos[4]}" loading="lazy" alt="">
                </div>
            </div>
        </section>

        <!-- Large Photo -->
        <section class="pb-4 px-4 h-3/4">
            <div class="flex flex-wrap -mx-4 h-full">
                <div class="mb-2 md:mb-0 h-full w-full block">
                    <img class="w-full object-cover h-full md:hover:cursor-pointer" src="${photos[5]}" loading="lazy" alt="">
                </div>
            </div>
        </section>
    `;
}

/**
 * Binds Image Carousel event listeners to both Photo Grid Mobile / Desktop
 *
 * @param {Array} photos - The array of photos.
 * @param {HTMLElement} photoGridElement - The photo grid element.
 * @param {Object} flowbiteModal - The Flowbite modal object.
 * @param {Object} flowbiteCarousel - The Flowbite carousel object.
 */
function bindPhotoGridEventListeners(photos, photoGridElement, flowbiteModal, flowbiteCarousel) {
    const imgElements   = Array.from(photoGridElement.querySelectorAll('img'));
    const desktopImg    = imgElements.slice(0, photos.length);
    const mobileImg     = imgElements.slice(photos.length);

    for (let i = 0; i < photos.length; i++) {
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

/**********************************************
 * 
 * Step 3: Bind Event Listeners 
 * 
 *********************************************/

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
            // console.log("thumbnail clicked", thumbnail);
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

/**********************************************
 * 
 * Step 2: Flowbite Component Setup
 * 
 *********************************************/

/**
 * Initializes a Flowbite modal with the specified modal ID.
 * @param {string} modalId - The ID of the modal element.
 * @returns {Modal} The initialized modal instance.
 */
function initializeFlowbiteModal(modalId) {
    const $targetEl = document.getElementById(modalId);

    const options = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
            // 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            'fixed inset-0 z-40',
        closable: true,
        // onHide:      () => { console.log('modal is hidden'); },
        // onShow:      () => { console.log('modal is shown'); },
        // onToggle:    () => { console.log('modal has been toggled'); },
    };

    const instanceOptions = {
        id: modalId,
        override: true
    };
    const modal = new Modal($targetEl, options, instanceOptions);

    return modal;
}

/**
 * Initializes a Flowbite carousel.
 *
 * @param {string} id - The ID of the carousel element.
 * @param {Array} photos - An array of photos for the carousel.
 * @returns {Carousel} The initialized carousel instance.
 */
function initializeFlowbiteCarousel(id, photos) {
    const carouselElement = document.getElementById(id);

    const items = photos.map((_, idx) => ({
        position:   idx,
        el:         carouselElement.querySelector(`[data-id=carousel-item-${idx}]`) 
    }));
    const indicators = photos.map((_, idx) => ({
        position:   idx,
        el:         carouselElement.querySelector(`[data-id=carousel-indicator-${idx}]`) 
    }));

    const options = {
        defaultPosition: 1,
        interval: 3000,
        indicators: {
            activeClasses: 'bg-gray-500',
            inactiveClasses:
                'bg-gray-800',
            items: indicators,
        },

        // onNext:     () => { console.log('next slider item is shown'); },
        // onPrev:     () => { console.log('previous slider item is shown'); },
        // onChange:   () => { console.log('new slider item has been shown'); },    
    };

    const instanceOptions = {
        id: id,
        override: false
    };
    const carousel = new Carousel(carouselElement, items, options, instanceOptions);

    return carousel;
}




/**********************************************
 * 
 * Navbar Component 
 * 
 *********************************************/

let enableTransparency = true;
let topOfPage = true;
let MOBILE_BREAKPOINT   = "36rem";
let DESKTOP_BREAKPOINT  = "44rem";
let flowbiteCarousel = null;

function createNavbarComponent(transparent = true) {
    enableTransparency = transparent;
    document.body.append(fromHTML(generateNavbarWithHamburgerHTML()));
    flowbiteCarousel = initializeFlowbiteNavbar();

    if (enableTransparency) {
        document.body.append(fromHTML(generatePixelAnchorHTML()));
        initializeIntersectionObserver();
    } else {
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

function generateNavbarWithHamburgerHTML() {
    return `
    <div id="navbar" class="fixed z-20 w-full bg-transparent text-stone-200">

        <!-- Desktop --> 
        <div class="hidden md:flex h-12">
            <div class="mt-4 text-lg font-medium md:flex md:w-1/4">
                <div class="w-full text-center">
                    <a href="/#section-about-us" class="block h-full px-3 hover:underline">about</a>
                </div>
                <div class="w-full text-center">
                    <a href="/portfolio.html" class="block h-full px-3 hover:underline">portfolio</a>
                </div>
            </div>
            <div class="text-4xl w-full md:w-1/2">
                <div class="w-full text-center">
                    <a href="/" class="block h-full px-3 hover:underline" style="font-family: 'Poiret One'">soho spaces</a>
                </div>
            </div>
            <div class="mt-4 text-lg font-medium md:flex md:w-1/4">
                <div class="w-full text-center">
                    <a href="/#section-our-services" class="block h-full px-3 hover:underline">services</a>
                </div>
                <div class="w-full text-center">
                    <a href="/#section-contact-us" class="block h-full px-3 hover:underline">contact</a>
                </div>
            </div>
        </div>

        <!-- Mobile --> 
        <div class="md:hidden border-gray-200">
            <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-1">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <div class="text-3xl" style="font-family: 'Poiret One'">soho spaces</div>
                </a>
                <button id="navbar-button" data-collapse-toggle="navbar-hamburger" type="button" class="inline-flex h-10 w-10 items-center justify-center p-2 text-sm" aria-controls="navbar-hamburger" aria-expanded="false">
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M1 1h15M1 7h15M1 13h15"></path>
                    </svg>
                </button>
                <div class="hidden w-full" id="navbar-hamburger">
                    <ul class="mt-4 flex flex-col text-lg font-medium text-center">
                        <li>
                            <a href="/#section-about-us" class="block px-3 py-2 hover:underline" aria-current="page" onclick="collapseNavbar()">about</a>
                        </li>
                        <li>
                            <a href="/portfolio.html" class="block px-3 py-2 hover:underline">portfolio</a>
                        </li>
                        <li>
                            <a href="/#section-our-services" class="block px-3 py-2 hover:underline" onclick="collapseNavbar()">services</a>
                        </li>
                        <li>
                            <a href="/#section-contact-us" class="block px-3 py-2 hover:underline" onclick="collapseNavbar()">contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
}

function generatePixelAnchorHTML() {
    return `
        <div id="top-of-site-pixel-anchor" class="absolute w-px h-px top-[${MOBILE_BREAKPOINT}] md:top-[${DESKTOP_BREAKPOINT}] left-0"></div>
    `;
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
 * Step 1: HTML Generation Methods
 * 
 *********************************************/


/**
 * Generates the HTML for a modal with the given id and content.
 *
 * @param {string} id - The id of the modal.
 * @param {string} modalContent - The content of the modal.
 * @returns {string} The HTML for the modal.
 */
function generateModalHTML(id, modalContent) {
    return `
    <!-- Main modal -->
    <div id="${id}" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-slate-950">
        <div class="relative w-full max-w-2xl max-h-full md:h-full md:max-w-6xl">

            <!-- Modal content -->
            <div class="relative bg-slate-950">

                <!-- Modal close -->
                <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center p-4 text-black text-sm z-50 md:p-2">
                    <svg class="fill-current text-gray-300 w-4 h-4 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                </div>

                ${modalContent}
            </div>
        </div>
    </div>
    `;
}

/**
 * Generates the HTML markup for a carousel component.
 *
 * @param {string} id - The ID of the carousel element.
 * @param {string[]} photos - An array of photo URLs to be displayed in the carousel.
 * @returns {string} The generated HTML markup for the carousel.
 */
function generateCarouselHTML(id, photos) {
    return `
    <div id="${id}" class="my-4 relative w-full md:px-12 md:top-10 md:my-0 bg-slate-950">

        <!-- Carousel wrapper -->
        <div class="relative overflow-hidden h-[32rem] md:h-5/6 ">
            ` + 
            photos.map((photo, idx) => {
                return `
                <div data-id="carousel-item-${idx}" data-carousel-item class="hidden duration-700 ease-in-out bg-gray-950">
                    <img class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:h-full md:block md:mx-auto" src="${photo}" alt="">
                </div>
                `;
            }).join('') +
            `
        </div>
        <!-- Slider indicators -->
        <div class="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse md:-bottom-10">
            ` + 
            photos.map((_, idx)  => {
                return `
                    <button
                        type="button"
                        data-id="carousel-indicator-${idx}"
                        class="h-3 w-3 rounded-full"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                `;
            }).join('') +
            `
        </div>
        <!-- Slider controls -->
        <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-id="data-carousel-prev">
            <svg class="w-4 text-gray-300 rtl:rotate-180 md:w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </button>
            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-id="data-carousel-next">
            <svg class="w-4 text-gray-300 rtl:rotate-180 md:w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </button>
    </div>`;
}


/**********************************************
 * 
 * HTML Partial Templates
 * 
 *********************************************/

function generateHeroHTML(url) {
    if (url.includes(".mp4")) {
        return generateHeroVideoHTML(url); 
    } else if (url.includes(".jpeg") || url.includes(".jpg") || url.includes(".png")) {
        return generateHeroImageHTML(url);
    } else {
        return `<div></div>`;
    }
}

function generateHeroVideoHTML(video_url) {
    return `
    <div class="lg:h-auto">
        <video id="hero-video" autoplay loop  muted playsinline class="h-screen w-full object-cover object-top" src="${video_url}" type="video/mp4" onloadstart="this.playbackRate=0.5;"></video>
    </div>`;
}

function generateHeroImageHTML(image_url) {
    return `
    <div class="lg:h-auto">
        <img class="object-cover object-center h-full w-full" src="${image_url}" alt="">
    </div>`;
}

function generateProjectOverviewSection(t1, t2, text) {
    return `
    <div class="px-4 py-8 md:px-0 md:mt-8 md:mx-auto md:max-w-4xl">
        <div class="py-2">
            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 italic inline align-bottom lowercase pr-2 md:pr-4" style="font-family: 'Homemade Apple'">${t1}</h1>
            <span class="md:hidden"><br></span>
            <div class="text-xl md:text-4xl h-full inline lowercase">${t2}</div>
        </div>
        <div class="py-2">
            <p class="leading-relaxed md:text-lg md:leading-loose">${text}</p>
        </div>
    </div>
    `;
}

function generateTheDetailsHeader() {
    return `
    <div class="px-4 pt-8 md:pb-2 md:px-0 md:mt-8 md:mx-auto md:max-w-4xl">
        <div class="py-2">
            <div class="text-xl md:text-4xl pr-2 h-full inline">the</div>
            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 italic inline align-bottom pr-2" style="font-family: 'Homemade Apple'">details</h1>
        </div>
    </div>`;
}

function generateBeforeAfterHeader() {
    return `
    <div class="px-4 py-2 md:px-0 md:mx-auto md:max-w-4xl">
        <div class="py-2 md:py-4">
            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 italic inline align-bottom pr-2">before +</h1>
            <div class="text-xl md:text-4xl h-full inline" style="font-family: 'Homemade Apple'">after</div>
        </div>
        <div class="flex items-center">
            <p class="pr-4 leading-relaxed md:text-lg">slide to see transformation</p>
            <svg class="align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd">
                <path d="m21.883 12-7.527 6.235L15 19l9-7.521L15 4l-.645.764L21.884 11H0v1h21.883z"/>
                <script/>
            </svg>
        </div>
    </div>
    `;
}

function generateTheStorySection(text) {
    return `
    <div class="px-4 md:px-0 pb-16 md:mt-8 md:mx-auto md:max-w-4xl">
        <div class="py-2">
            <div class="text-xl md:text-4xl pr-2 h-full inline">the</div>
            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 italic inline align-bottom pr-2" style="font-family: 'Homemade Apple'">story</h1>
        </div>
        <div class="py-2">
            <p class="leading-relaxed md:text-lg md:leading-loose">${text}</p>
        </div>
    </div>`;
}

function generateFooterHTML() {
    return `
    <div class="bg-stone-500 text-stone-200 pt-8 md:pt-16" style="font-family: 'Poiret One'">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 md:pt-8 md:pb-4">
            <div class="pb-4 md:flex md:justify-between">
            <div class="mb-8 md:mb-0">
                <a href="https://soho-spaces.com/" class="flex items-center justify-center md:justify-start">
                    <img class="h-24 md:h-36" src="../assets/assets/soho_logo_white.svg" alt="Soho Spaces Logo"/>
                </a>
            </div>
            <div class="grid grid-cols-5 gap-4 md:grid-cols-2 md:gap-8">
                <div class="col-span-2 md:col-span-1">
                    <h2 class="mb-6 text-2xl font-semibold lowercase" style="font-family: 'Poiret One'">Explore</h2>
                    <ul class="text-md">
                        <li class="mb-2">
                            <a href="/portfolio/moody-romantic-bedroom" class="lowercase hover:underline">Moody Romantic</a>
                        </li>
                        <li class="mb-2">
                            <a href="/portfolio/dark-academia-living-room" class="lowercase hover:underline">Dark Academia</a>
                        </li>
                        <li class="mb-2">
                            <a href="/portfolio/modern-gothic-kitchen" class="lowercase hover:underline">Modern Gothic</a>
                        </li>
                        <li>
                            <a href="/portfolio/east-meets-west-entryway" class="lowercase hover:underline">East Meets West</a>
                        </li>
                    </ul>
                </div>
                <div class="col-span-3 md:col-span-1">
                    <h2 class="mb-6 text-2xl font-semibold lowercase" style="font-family: 'Poiret One'">Contact Us</h2>
                    <ul class="text-md">
                        <li class="mb-2">
                            <a href="mailto: hello@soho-spaces.com" class="hover:underline">
                                <i class="fa-regular fa-envelope fa-sm pr-2"></i>
                                hello@soho-spaces.com
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="tel:404-566-5796" class="hover:underline">
                                <i class="fa-solid fa-phone fa-sm pr-2"></i>
                                404.566.5796
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="https://instagram.com" class="hover:underline">
                                <i class="fa-brands fa-instagram fa-sm pr-2"></i>
                                @sohospacesatl
                            </a>
                        </li>
                        <li>
                            <a href="https://pinterest.com/" class="hover:underline">
                                <i class="fa fa-pinterest-square fa-sm pr-2"></i>
                                @sohospacesatl
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-4 border-stone-200 sm:mx-auto"/>
        <div class="flex items-center justify-center sm:justify-between">
            <span class="text-sm sm:text-center">© 2020 <a href="https://soho-spaces.com/" class="hover:underline">Soho Spaces</a>. All Rights Reserved.
            </span>
        </div>
    </div>`;
}


/**********************************************
 * 
 * Utility Methods
 * 
 *********************************************/

/**
 * Creates a new element from the given HTML string
 * 
 * @param {string} HTML representing a single element.
 * @param {boolean} flag representing whether or not to trim input whitespace, defaults to true.
 * @return {Element | HTMLCollection | null}
 */
function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;

    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}
function fromHTMLVideo(html) {
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
}

/**
 * Generates a unique identifier using a random algorithm.
 * @returns {string} The generated unique identifier.
 */
function uuidv4() {
    return "10000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
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


/**
 * Check Mobile or Desktop viewport
 *
 * @returns {boolean} Returns true if the swipe is up / down / left / right
 */
function isMobile() {
    return window.innerWidth < 640;
}

