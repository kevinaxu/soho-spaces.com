
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
    document.body.append(fromHTML(thumbnailsHTML));
    const carouselHTML   = generateCarouselHTML(carouselId, photos);
    const modalHTML      = generateModalHTML(modalId, carouselHTML);
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
 * Event Listeners 
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
 * Flowbite Component Setup
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
            'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
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

    var items = [];
    for (let i = 0; i < photos.length; i++) {
        items.push({
            position: i,
            el: carouselElement.querySelectorAll(`[data-id=carousel-item-${i}]`)[0],
        });
    }

    const options = {
        defaultPosition: 1,
        indicators: {
            activeClasses: 'bg-white dark:bg-gray-800',
            inactiveClasses:
                'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
            items: items,
        }
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
 * HTML Generation Methods
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
    <div id="${id}" class="relative w-full">
        <!-- Carousel wrapper -->
        <div
            class="relative h-56 overflow-hidden rounded-lg sm:h-64 xl:h-80 2xl:h-96"
        >
            ` + 
            photos.map((photo, idx) => {
                return `
                <div data-id="carousel-item-${idx}" class="hidden duration-700 ease-in-out">
                    <img
                        src="${photo}"
                        class="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="..."
                    />
                </div>
                `;
            }).join('') +
            `
        </div>
        <!-- Slider indicators -->
        <div
            class="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse"
        >
            ` + 
            photos.map((photo, idx) => {
                return `
                    <button
                        data-id="carousel-indicator-${idx}"
                        type="button"
                        class="h-3 w-3 rounded-full"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                `;
            }).join('') +
            `
        </div>
        <!-- Slider controls -->
        <button
            data-id="data-carousel-prev"
            type="button"
            class="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        >
            <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
            >
                <svg
                    class="h-4 w-4 text-white dark:text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1 1 5l4 4"
                    />
                </svg>
                <span class="hidden">Previous</span>
            </span>
        </button>
        <button
            data-id="data-carousel-next"
            type="button"
            class="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        >
            <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
            >
                <svg
                    class="h-4 w-4 text-white dark:text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                    />
                </svg>
                <span class="hidden">Next</span>
            </span>
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
