

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


