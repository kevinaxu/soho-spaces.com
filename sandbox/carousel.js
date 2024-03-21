
/**********************************************
 * 
 * Main Thumbnails Component Creation Method 
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
    bindCarouselEventListeners(carouselElement, flowbiteCarousel);
    bindThumbnailEventListeners(thumbnailsElement, flowbiteModal, flowbiteCarousel);
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
            console.log("thumbnail clicked", thumbnail);
            flowbiteCarousel.slideTo(i);
            flowbiteModal.show();
        });
    }
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
        onHide:      () => { console.log('modal is hidden'); },
        onShow:      () => { console.log('modal is shown'); },
        onToggle:    () => { console.log('modal has been toggled'); },
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
        onNext: () => {
            console.log('next slider item is shown');
        },
        onPrev: () => {
            console.log('previous slider item is shown');
        },
        onChange: () => {
            console.log('new slider item has been shown');
        },    
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

/**
 * Generates a unique identifier using a random algorithm.
 * @returns {string} The generated unique identifier.
 */
function uuidv4() {
    return "10000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
