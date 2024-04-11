
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
    <div class="slider-container px-4 md:px-0 md:mx-auto md:max-w-4xl">
        <div class="image-container md:h-[44rem]">
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
        <div class="hidden md:block">
            ${generatePhotoGridDesktopHTML(photoGridId, photos)}
        </div>
        <div class="md:hidden">
            ${generatePhotoGridMobileHTML(photoGridId, photos)}
        </div>
    </div>`;
}

/**
 * Generates the HTML for a photo grid
 * Supports any mulitple of 4 or 6 photos
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
    } else if (photos.length % 4 === 0) {
        for (var i = 0; i < (photos.length / 4); i++) {
            HTML += generatePhotoGrid4HTML(photos.slice(i * 4, i * 4 + 4));
        }
        return generatePhotoGridWrapperHTML(id, HTML);
    } else {
        alert("Photo Grid supports only multiples of 4 or 6 photos");
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
 * Generates the HTML for a photo grid with 4 photos
 *
 * @param {string[]} photos - An array of photo URLs.
 * @returns {string} The generated HTML for the photo grid.
 */
function generatePhotoGrid4HTML(photos) {
    return `
        <div class="grid gap-4 overflow-auto">
            <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[0]}" alt=""></div>
            <div><img class="h-36 w-52 max-w-full rounded-lg object-cover" src="${photos[1]}" alt=""></div>
        </div>
        <div class="grid gap-4">
            <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[2]}" alt=""></div>
            <div><img class="h-48 w-52 max-w-full rounded-lg object-cover" src="${photos[3]}" alt=""></div>
        </div>
    `;
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
            <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[0]}" alt=""></div>
            <div><img class="h-32 w-52 max-w-full rounded-lg object-cover" src="${photos[1]}" alt=""></div>
            <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[2]}" alt=""></div>
        </div>
        <div class="grid gap-4">
            <div><img class="h-44 w-52 max-w-full rounded-lg object-cover" src="${photos[3]}" alt=""></div>
            <div><img class="h-56 w-52 max-w-full rounded-lg object-cover" src="${photos[4]}" alt=""></div>
            <div><img class="h-32 w-52 max-w-full rounded-lg object-cover" src="${photos[5]}" alt=""></div>
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
    return `
    <div id="${id}" class="md:mx-auto md:max-w-4xl">

        <!-- 2 Col with Vertical Photos-->
        <section class="pb-4 px-4">
            <div class="flex flex-wrap -mx-4">
                <div class="md:w-2/5 h-auto pr-4">
                    <div class="mb-4">
                        <img class="md:hover:cursor-pointer" src="${photos[0]}" alt="">
                    </div>
                    <div>
                        <img class="md:hover:cursor-pointer" src="${photos[1]}" alt="">
                    </div>
                </div>
                <div class="hidden md:block md:w-3/5">
                    <img class="md:w-full md:min-h-full md:object-cover md:hover:cursor-pointer" src="${photos[2]}" alt="">
                </div>
            </div>
        </section>

        <!-- Two Photo -->
        <section class="pb-4 px-4">
            <div class="flex flex-wrap -mx-4 h-full">
                <div class="md:w-1/2 pr-2 mb-2 md:mb-0 h-full">
                    <img class="h-full object-cover w-full md:hover:cursor-pointer" src="${photos[3]}" alt="">
                </div>
                <div class="md:w-1/2 pl-2 mb-2 md:mb-0 h-full">
                    <img class="h-full object-cover md:hover:cursor-pointer" src="${photos[4]}" alt="">
                </div>
            </div>
        </section>

        <!-- Large Photo -->
        <section class="pb-4 px-4 h-3/4">
            <div class="flex flex-wrap -mx-4 h-full">
                <div class="mb-2 md:mb-0 h-full w-full block">
                    <img class="w-full object-cover h-full md:hover:cursor-pointer" src="${photos[5]}" alt="">
                </div>
            </div>
        </section>
    </div>
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
            activeClasses: 'bg-gray-950 dark:bg-gray-800 md:dark:bg-gray-500',
            inactiveClasses:
                'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 md:dark:bg-gray-800',
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
        <div class="relative w-full max-w-2xl max-h-full md:h-full md:max-w-6xl">

            <!-- Modal content -->
            <div class="relative bg-white dark:bg-gray-950">

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
    <div id="${id}" class="my-4 relative w-full md:px-12 md:top-10 md:my-0">

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


function heroVideo(video_url) {
    return `
    <div class="lg:h-auto">
        <video id="hero-video" autoplay loop  muted playsinline class="h-screen w-full object-cover object-center" src="${video_url}" type="video/mp4"></video>
    </div>

    `;
}

function heroImage(image_url) {
    return `
    <div class="lg:h-auto">
        <img class="object-cover object-center h-full w-full" src="${image_url}" alt="">
    </div>
    `;
}

function textTitle(t1, t2) {
    return `
    <div class="px-4 py-8 md:px-0 md:mt-8 md:mx-auto md:max-w-4xl">
        <div class="py-2">
            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 italic inline align-bottom pr-2 md:pr-4" style="font-family: 'Homemade Apple'">${t1}</h1>
            <div class="text-xl md:text-4xl h-full inline">${t2}</div>
        </div>
        <div class="py-2">
            <p class="leading-relaxed md:text-lg md:leading-loose">
                This bedroom is a perfect blend of moody romanticism and modern comfort. The room is bathed in natural light that highlights the rich, dark tones of the furniture and decor. The bed, adorned with plush pillows and a cozy throw, invites relaxation and rest. The room's design is a nod to the Dark Academia aesthetic, with a focus on deep, rich colors, vintage furniture, and an abundance of books. The room's large windows not only provide a stunning view but also fill the room with an abundance of natural light, creating a warm and inviting atmosphere. This is a space where you can unwind, read a good book, and drift off to sleep dreaming of romantic adventures.
            </p>
        </div>
    </div>
    `;
}

function textBeforeAfter() {
    return `
    <div class="px-4 py-2 md:px-0 md:mx-auto md:max-w-4xl">
        <div class="py-2 md:py-4">
            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 italic inline align-bottom pr-2" style="font-family: 'Homemade Apple'">before</h1>
            <div class="text-xl md:text-4xl h-full inline">+ after</div>
        </div>
        <div class="flex justify-between items-center">
            <p class="leading-relaxed md:text-lg">slide to see transformation</p>
            <svg class="align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd">
                <path d="m21.883 12-7.527 6.235L15 19l9-7.521L15 4l-.645.764L21.884 11H0v1h21.883z"/>
                <script/>
            </svg>
        </div>
    </div>
    `;
}

function textStory() {
    return `
    <div class="px-4 py-8 md:px-0 md:mt-8 md:mx-auto md:max-w-4xl">
        <div class="py-2">
            <div class="text-xl md:text-4xl pr-2 h-full inline">the</div>
            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 italic inline align-bottom pr-2" style="font-family: 'Homemade Apple'">story</h1>
        </div>
        <div class="py-2">
            <p class="leading-relaxed md:text-lg md:leading-loose">This living room draws inspiration from the dark academia aesthetic, a style that is deeply rooted in literature, self-discovery, and a love of learning and knowledge. The room is filled with rich, dark tones, creating a cozy and inviting atmosphere. Antique furniture, a grand bookshelf filled with classic literature, and vintage decor items contribute to the room's old-world charm. The walls are adorned with artwork and memorabilia, adding a personal touch to the space.</p>
        </div>
    </div>`;
}

function generateNavbarDesktopHTML() {
    return `
    <div id="navbar" class="fixed z-20 flex h-12 w-full bg-slate-950 text-slate-100">
        <div class="mt-5 hidden text-xs md:flex md:w-1/4">
            <div class="w-full text-center">
                <a href="/#section-about-us" class="block h-full px-3">ABOUT</a>
            </div>
            <div class="w-full text-center">
                <a href="/portfolio.html" class="block h-full px-3">PORTFOLIO</a>
            </div>
        </div>
        <div class="mt-1 w-full md:w-1/2">
            <div class="w-full text-center text-3xl">
                <a href="/" class="block h-full px-3" style="font-family: 'Poiret One'">soho spaces</a>
            </div>
        </div>
        <div class="mt-5 hidden text-xs md:flex md:w-1/4">
            <div class="w-full text-center">
                <a href="/#section-our-services" class="block h-full px-3">SERVICES</a>
            </div>
            <div class="w-full text-center">
                <a href="/#section-contact-us" class="block h-full px-3">CONTACT</a>
            </div>
        </div>
    </div>`;
}


function footer() {
    return `
    <div class="footer mt-8">
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
    
        <!-- Contact Info -->
        <div class="text-center my-2">
            <p class="text-sm text-gray-700 dark:text-gray-400 hover:underline">
                <a href="mailto: sohospacesatl@gmail.com">hello@soho-spaces.com</a>
            </p>
            <p class="text-sm text-gray-700 dark:text-gray-400 hover:underline">
                <a href="tel:404-566-5796">404.566.5796</a>
            </p>
        </div>

        <!-- Social Icons -->
        <div class="flex flex-row justify-center space-x-4">
            <a href="https://www.pinterest.com/">
                <svg class="opacity-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16px" height="16px">
                    <path d="M448 80v352c0 26.5-21.5 48-48 48H154.4c9.8-16.4 22.4-40 27.4-59.3 3-11.5 15.3-58.4 15.3-58.4 8 15.3 31.4 28.2 56.3 28.2 74.1 0 127.4-68.1 127.4-152.7 0-81.1-66.2-141.8-151.4-141.8-106 0-162.2 71.1-162.2 148.6 0 36 19.2 80.8 49.8 95.1 4.7 2.2 7.1 1.2 8.2-3.3.8-3.4 5-20.1 6.8-27.8.6-2.5.3-4.6-1.7-7-10.1-12.3-18.3-34.9-18.3-56 0-54.2 41-106.6 110.9-106.6 60.3 0 102.6 41.1 102.6 99.9 0 66.4-33.5 112.4-77.2 112.4-24.1 0-42.1-19.9-36.4-44.4 6.9-29.2 20.3-60.7 20.3-81.8 0-53-75.5-45.7-75.5 25 0 21.7 7.3 36.5 7.3 36.5-31.4 132.8-36.1 134.5-29.6 192.6l2.2.8H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                </svg>
            </a>
            <a href="https://www.facebook.com/">
                <svg class="opacity-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16px" height="16px">
                    <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h98.2V334.2h-52.8V256h52.8v-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480h129c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                </svg>
            </a>
            <a href="https://www.instagram.com/">
                <svg class="opacity-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16px" height="16px">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
            </a>
        </div>

        <!-- Copyright -->
        <div class="text-center my-2">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                &copy; 2019 Soho Spaces / All Rights Reserved
            </p>
        </div>
    </div>
    `;
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



/**********************************************
 * 
 * Intersection Observer for transparent navbar
 * 
 *********************************************/

function generatePixelAnchorHTML() {
    return `
        <div id="top-of-site-pixel-anchor" class="absolute w-px h-px top-[36rem] md:top-[44rem] left-0"></div>
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
                // header not at top
                document.getElementById("navbar").classList.add("bg-slate-950");
                document.getElementById("navbar").classList.remove("bg-transparent");
            } else {
                // header at top 
                document.getElementById("navbar").classList.add("bg-transparent");
                document.getElementById("navbar").classList.remove("bg-slate-950");
            }
        });
        observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
    }
}