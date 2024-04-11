

function logo() {
    return `
    <div>
        <div class="header my-4 md:my-4 lg:my-4">
            <a href="../">
                <img class="object-center" src="../assets/soho_spaces_logo.png" alt="">
            </a>
        </div>
        <div class="mt-2">
            <hr class="mx-6 h-px border-0 bg-gray-200 dark:bg-gray-700">
        </div>
    </div>
    `;
}

// TODO: add back description once blurbs are complete
function header(heading) {
    return `
    <div class="header">
        <div class="mt-8">
            <h1 class="text-2xl">${heading}</h1>
        </div>
    </div>
    `;
}

function isMobile() {
    if (window.innerWidth < 640) {
        console.log("Mobile");
    } else {
        console.log("Desktop");
    }
    return window.innerWidth < 640;
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