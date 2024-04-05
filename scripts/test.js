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

    const photoGridHTML  = generatePhotoGridHTML(photoGridId, photos);
    const carouselHTML   = generateCarouselHTML(carouselId, photos);
    const modalHTML      = generateModalHTML(modalId, carouselHTML);

    document.body.append(fromHTML(photoGridHTML));
    document.body.append(fromHTML(modalHTML));


    const flowbiteCarousel  = initializeFlowbiteCarousel(carouselId, photos);
    const flowbiteModal     = initializeFlowbiteModal(modalId);

    flowbiteModal.show();
    flowbiteCarousel.slideTo(1);

    // const carouselElement   = document.getElementById(carouselId);
    // const photoGridElement = document.getElementById(photoGridId);
    // const modalElement      = document.getElementById(modalId);
    // bindCarouselEventListeners(carouselElement, flowbiteCarousel);

    /*

    // Step 1: Add phoot grid, carousel, and modal to the DOM
    const photoGridHTML  = generatePhotoGridHTML(photoGridId, photos);
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

    */
}



function generatePhotoGridHTML(id, photos) {
    return `
    <div id="${id}">

        <!-- 2 Col with Vertical Photos-->
        <section class="pb-4 px-4">
            <div class="flex flex-wrap -mx-4">
                <div class="md:w-2/5 h-auto pr-4">
                    <div class="mb-4">
                        <img class="shadow-md image-2" src="${photos[0]}" alt="">
                    </div>
                    <div>
                        <img class="shadow-md" src="${photos[1]}" alt="">
                    </div>
                </div>
                <div class="hidden md:block md:w-3/5">
                    <div class="h-full w-full bg-cover shadow-md image-1"
                        style="background-image: url(${photos[2]})">
                    </div>
                </div>
            </div>
        </section>


        <!-- Two Photo -->
        <section class="pb-4 px-4">
            <div class="flex flex-wrap -mx-4 h-full">
                <div class="md:w-1/2 pr-2 mb-2 md:mb-0 h-full">
                    <img class="shadow-md h-full object-cover w-full" src="${photos[3]}" alt="">
                </div>
                <div class="md:w-1/2 pl-2 mb-2 md:mb-0 h-full">
                    <img class="shadow-md h-full object-cover" src="${photos[4]}" alt="">
                </div>
            </div>
        </section>

        <!-- Large Photo -->
        <section class="pb-4 px-4 h-3/4">
            <div class="flex flex-wrap -mx-4 h-full">
                <div class="mb-2 md:mb-0 h-full w-full block">
                    <img class="shadow-md w-full object-cover h-full" src="${photos[5]}" alt="">
                </div>
            </div>
        </section>
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
                    <img class="md:h-full md:block md:mx-auto" src="${photo}" alt="">
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


function bindPhotoGridEventListeners(photoGridElement, flowbiteModal, flowbiteCarousel) {
    console.log(photoGridElement);


    // const photos = photoGridElement.querySelectorAll('img');
    // for (let i = 0; i < photos.length; i++) {
    //     const photo = photos[i];
    //     photo.addEventListener('click', function() {
    //         flowbiteCarousel.slideTo(i);
    //         flowbiteModal.show();
    //     });
    // }
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
 * Generates a unique identifier using a random algorithm.
 * @returns {string} The generated unique identifier.
 */
function uuidv4() {
    return "10000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

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
