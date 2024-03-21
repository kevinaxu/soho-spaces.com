
const photos = [
    '../assets/bedroom/bed_2.jpeg',
    '../assets/bedroom/sitting_area.jpeg',
    '../assets/bedroom/night_stand.jpeg'
];


const carouselID2 = 'carousel-example-2';
document.body.append(
    fromHTML(generateCarousel(carouselID2, photos))
);
initCarousel(carouselID2, photos);

const carouselID = 'carousel-example';
document.body.append(
    fromHTML(generateCarousel(carouselID, photos))
);
initCarousel(carouselID, photos);

// Step 2: create the options and Carousel instace
function initCarousel(id, photos) {
    const carouselElement = document.getElementById(id);

    var items = [];
    for (let i = 0; i < photos.length; i++) {
        items.push({
            position: i,
            el: carouselElement.querySelectorAll(`[data-id=carousel-item-${i}]`)[0],
        });
    }

    // options with default values
    const options = {
        defaultPosition: 1,
        interval: 3000,

        indicators: {
            activeClasses: 'bg-white dark:bg-gray-800',
            inactiveClasses:
                'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
            items: items,
        },

        // callback functions
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

    // instance options object
    const instanceOptions = {
        id: id,
        override: false
    };

    const carousel = new Carousel(carouselElement, items, options, instanceOptions);

    const $prevButton = carouselElement.querySelectorAll('[data-id=data-carousel-prev]')[0]; 
    const $nextButton = carouselElement.querySelectorAll('[data-id=data-carousel-next]')[0]; 

    console.log("carousel", carousel);
    console.log("prevButton", id, $prevButton);
    console.log("nextButton", id, $nextButton);

    $prevButton.addEventListener('click', () => {
        carousel.prev();
    });

    $nextButton.addEventListener('click', () => {
        carousel.next();
    });
}


// Step 1: generate and inject the HTML for the image carousel into the DOM 
function generateCarousel(id, photos) {
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

/**
 * @param {String} HTML representing a single element.
 * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
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
