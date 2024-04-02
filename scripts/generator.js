
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

function heroVideo(video_url) {
    return `
    <div class="hero-video-container h-96 lg:h-auto my-4 rounded-lg">
        <video id="hero-video" autoplay loop muted playsinline class="object-cover object-center h-full w-full rounded-lg" style="object-position:20%">
            <source src="${video_url}" type="video/mp4">
        </video>
    </div>
    `;
}

function heroImage(image_url) {
    return `
    <div class="hero-image-container h-96 lg:h-auto my-4">
        <img class="object-cover object-center h-full w-full rounded-lg" src="${image_url}" alt="">
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

function thumbnailsDesktop(photos) {
    return `
    <div class="thumbnails modal-open my-4">
        <div class="flex">
            <div class="lg:mr-8">
                <img class="h-36 w-36 max-w-full rounded-lg object-cover" src="${photos[0]}" alt="">
            </div>
            <div class="lg:mr-8">
                <img class="h-36 w-36 max-w-full rounded-lg object-cover" src="${photos[1]}" alt="">
            </div>
            <div class="lg:mr-8">
                <img class="h-36 w-36 max-w-full rounded-lg object-cover" src="${photos[2]}" alt="">
            </div>
        </div>
    </div>`
}

function footer() {
    return `
    <div class="footer m-6">
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
