
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
    <div class="slider-container">
        <div class="image-container">
            <div id="${id}" class="before-after-slider">
                <div class="before-image">
                    <img class="slider-image" src=${beforeImage} alt=""/>
                </div>
                <div class="after-image">
                    <img class="slider-image" src=${afterImage} alt=""/>
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
 * Photo Grid Component (4 or 6 photos)
 * 
 *********************************************/

function createPhotoGridComponent(photos) {
    var uuid = uuidv4();
    const carouselId    = `carousel-${uuid}`;
    const modalId       = `modal-${uuid}`;
    const photoGridId   = `photo-grid-${uuid}`;
    
    // Step 1: Add thumbnails, carousel, and modal to the DOM
    const photoGridHTML  = (photos.length === 6) ?
        generatePhotoGrid6HTML(photoGridId, photos) :
        generatePhotoGrid4HTML(photoGridId, photos);
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
    bindPhotoGridEventListeners(photoGridElement, flowbiteModal, flowbiteCarousel);
    bindSwipeGestureEventListeners(carouselElement, flowbiteCarousel);
    bindModalCloseEventListeners(modalElement, flowbiteModal);
}

/**
 * Generates the HTML for a photo grid with 4 photos
 *
 * @param {string} id - The ID of the container element.
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The generated HTML for the photo grid.
 */
function generatePhotoGrid4HTML(id, photos) {
    return `
    <div id="${id}" class="flex justify-center my-4 pb-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="grid gap-4 overflow-auto">
                <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[0]}" alt=""></div>
                <div><img class="h-36 w-52 max-w-full rounded-lg object-cover" src="${photos[1]}" alt=""></div>
            </div>
            <div class="grid gap-4">
                <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[2]}" alt=""></div>
                <div><img class="h-48 w-52 max-w-full rounded-lg object-cover" src="${photos[3]}" alt=""></div>
            </div>
        </div>
    </div>
    `;
}

/**
 * Generates the HTML for a photo grid with 6 photos
 *
 * @param {string} id - The ID of the container element.
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The generated HTML for the photo grid.
 */
function generatePhotoGrid6HTML(id, photos) {
    return `
    <div id="${id}" class="flex justify-center my-4 pb-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="grid gap-4 overflow-auto">
                <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[0]}" alt=""></div>
                <div><img class="h-32 w-52 max-w-full rounded-lg object-cover" src="${photos[1]}" alt=""></div>
                <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[2]}" alt=""></div>
            </div>
            <div class="grid gap-4">
                <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[3]}" alt=""></div>
                <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[4]}" alt=""></div>
                <div><img class="h-32 w-52 max-w-full rounded-lg object-cover" src="${photos[5]}" alt=""></div>
            </div>
        </div>
    </div>
    `;
}

function bindPhotoGridEventListeners(photoGridElement, flowbiteModal, flowbiteCarousel) {
    const photos = photoGridElement.querySelectorAll('img');
    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        photo.addEventListener('click', function() {
            flowbiteCarousel.slideTo(i);
            flowbiteModal.show();
        });
    }
}

/**********************************************
 * 
 * Thumbnails Component
 * 
 *********************************************/

function createThumbnailsComponent(photos) {
    var uuid = uuidv4();
    const carouselId    = `carousel-${uuid}`;
    const modalId       = `modal-${uuid}`;
    const thumbnailsID  = `thumbnails-${uuid}`;
    
    // Step 1: Add thumbnails, carousel, and modal to the DOM
    const thumbnailsHTML = generateThumbnailsHTML(thumbnailsID, photos);
    const carouselHTML   = generateCarouselHTML(carouselId, photos);
    const modalHTML      = generateModalHTML(modalId, carouselHTML);
    document.body.append(fromHTML(thumbnailsHTML));
    document.body.append(fromHTML(modalHTML));

    // Step 2: Initialize Flowbite components
    const flowbiteCarousel  = initializeFlowbiteCarousel(carouselId, photos);
    const flowbiteModal     = initializeFlowbiteModal(modalId);

    // Step 3: Bind event listeners (Carousel <> Flowbite Carousel, Thumbnails <> Flowbite Modal)
    const carouselElement   = document.getElementById(carouselId);
    const thumbnailsElement = document.getElementById(thumbnailsID);
    const modalElement      = document.getElementById(modalId);
    bindCarouselEventListeners(carouselElement, flowbiteCarousel);
    bindThumbnailEventListeners(thumbnailsElement, flowbiteModal, flowbiteCarousel);
    bindSwipeGestureEventListeners(carouselElement, flowbiteCarousel);
    bindModalCloseEventListeners(modalElement, flowbiteModal);
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
            activeClasses: 'bg-gray-950 dark:bg-gray-800',
            inactiveClasses:
                'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
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
 * Step 1: HTML Generation Methods
 * 
 *********************************************/

/**
 * Generates the HTML markup for a thumbnail carousel.
 *
 * @param {string} id - The ID of the carousel container.
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The HTML markup for the thumbnail carousel.
 */
function generateThumbnailsHTML(id, photos) {
    return `
    <div id="${id}" class="thumbnails my-4">
        <div class="grid grid-cols-3 md:grid-cols-3 gap-2">
            <div>
                <img class="h-28 w-28 max-w-full rounded-lg object-cover" src="${photos[0]}" alt="">
            </div>
            <div>
                <img class="h-28 w-28 max-w-full rounded-lg object-cover" src="${photos[1]}" alt="">
            </div>
            <div>
                <img class="h-28 w-28 max-w-full rounded-lg object-cover" src="${photos[2]}" alt="">
            </div>
        </div>
    </div>
    `;
}

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
    <div id="${id}" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full dark:bg-gray-950">
        <div class="relative w-full max-w-2xl max-h-full">

            <!-- Modal content -->
            <div class="relative bg-white dark:bg-gray-950">

                <!-- Modal close -->
                <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center p-4 text-black text-sm z-50">
                    <svg class="fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
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
    <div id="${id}" class="my-4 relative w-full">

        <!-- Carousel wrapper -->
        <div class="relative overflow-hidden" style="height: 32rem">
            ` + 
            photos.map((photo, idx) => {
                return `
                <div data-id="carousel-item-${idx}" data-carousel-item class="hidden duration-700 ease-in-out">
                    <img
                        src="${photo}"
                        class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                `;
            }).join('') +
            `
        </div>
        <!-- Slider indicators -->
        <div class="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
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
            <svg class="w-4 text-gray-300 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </button>
            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-id="data-carousel-next">
            <svg class="w-4 text-gray-300 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </button>
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