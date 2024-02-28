function header() {
    return `
    <div class="header m-4">
        <h1 class="text-4xl py-4 font-bold font-normal uppercase tracking-wider">
            <a href="../index.html" class="hover:overline">Soho Spaces</a>
        </h1>
    </div>
    `;
}

function paragraph(heading, description) {
    return `
    <div class="paragraph">
        <div class="my-8 mx-4">
            <h1 class="text-2xl py-4">${heading}</h1>
            <p class="font-normal text-md">${description}</p>
        </div>
    </div>
    `;
}

function heroVideo(video_url) {
    return `
    <div class="hero-video-container h-96 m-4 rounded-lg">
        <video id="hero-video" autoplay loop muted playsinline class="object-cover object-center h-full w-full lg:max-w-screen-lg rounded-lg">
            <source src="${video_url}" type="video/mp4">
        </video>
    </div>
    `;
}

function thumbnails(photos) {
    return `
    <div id="thumbnails" class="mx-4">
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

function photoGrid4(photos) {
    return `
    <div id="photo-grid-4" class="flex justify-center m-4 pb-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-scroll">
            <div class="grid gap-2 overflow-auto">
                <div>
                    <img class="h-56 w-44 max-w-full rounded-lg object-cover" src="${photos[0]}" alt="">
                </div>
                <div>
                    <img class="h-36 w-44 max-w-full rounded-lg object-cover" src="${photos[1]}" alt="">
                </div>
            </div>
            <div class="grid gap-2 ">
                <div>
                    <img class="h-44 w-44 max-w-full rounded-lg object-cover" src="${photos[2]}" alt="">
                </div>
                <div>
                    <img class="h-48 w-44 max-w-full rounded-lg object-cover" src="${photos[3]}" alt="">
                </div>
            </div>
        </div>
    </div>
    `;
}


function photoGrid6(photos) {
    return `
    <div id="photo-grid-4" class="flex justify-center m-4 pb-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-scroll">
            <div class="grid gap-2 overflow-auto">
                <div>
                    <img class="h-56 w-44 max-w-full rounded-lg object-cover" src="${photos[0]}">
                </div>
                <div>
                    <img class="h-36 w-44 max-w-full rounded-lg object-cover" src="${photos[1]}">
                </div>
                <div>
                    <img class="h-40 w-44 max-w-full rounded-lg object-cover" src="${photos[2]}">
                </div>
            </div>
            <div class="grid gap-2 ">
                <div>
                    <img class="h-44 w-44 max-w-full rounded-lg object-cover" src="${photos[3]}">
                </div>
                <div>
                    <img class="h-60 w-44 max-w-full rounded-lg object-cover" src="${photos[4]}">
                </div>
                <div>
                    <img class="h-28 w-44 max-w-full rounded-lg object-cover" src="${photos[5]}">
                </div>
            </div>
        </div>
    </div>
    `;
}


function footer() {
    return `
    <div class="footer m-6">
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
    
        <!-- Copyright / Email -->
        <div class="text-center mb-4">
            <p class="text-2xl text-gray-700 dark:text-gray-400">
                &copy; 2019 Soho Spaces
            </p>
            <p class="text-md text-gray-700 dark:text-gray-400">
                <a href = "mailto: sohospacesatl@gmail.com">sohospacesatl@gmail.com</a>
            </p>
        </div>

        <!-- Social Icons -->
        <div class="flex flex-row justify-center m-auto pb-8">
            <div class="p-2">
                <a class="h-4 w-4 rounded-full outline-none focus:outline-none" type="button" href="https://www.instagram.com/">
                    <svg
                        class="fill-current transition duration-700 ease-in-out h-8 w-8 text-gray-700 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-600"
                        role="img" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">       
                        <title>Instagram</title>         
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
            </div>
            <div class="p-2">
                <a class="h-4 w-4 rounded-full outline-none focus:outline-none" type="button" href="https://www.pinterest.com/">
                <svg
                    class="fill-current transition duration-700 ease-in-out h-8 w-8 text-gray-700 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-600"
                    role="img" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">       
                    <title>Pinterest</title>         
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fill-rule="evenodd" clip-rule="evenodd" />
                </svg>
                </a>
            </div>
            <div class="p-2">
                <a class="h-4 w-4 rounded-full outline-none focus:outline-none" type="button" href="https://www.youtube.com/">
                <svg
                    class="fill-current transition duration-700 ease-in-out h-8 w-8 text-gray-700 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-600"
                    role="img" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">       
                    <title>Youtube</title>         
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                </a>
            </div>
            <div class="p-2">
                <a class="h-4 w-4 rounded-full outline-none focus:outline-none" type="button" href="https://www.tiktok.com/">
                <svg
                    class="fill-current transition duration-700 ease-in-out h-8 w-8 text-gray-700 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-600"
                    role="img" viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg">       
                    <title>TikTok</title>         
                    <path
                        fill="currentColor"
                        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
                </a>
            </div>
            <div class="p-2">
                <a class="h-4 w-4 rounded-full outline-none focus:outline-none" type="button" href="https://www.facebook.com/">
                <svg
                    class="fill-current transition duration-700 ease-in-out h-8 w-8 text-gray-700 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-600"
                    role="img" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">       
                    <title>Facebook</title>         
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                </a>  
            </div>
            <div class="p-2">
                <a class="h-4 w-4 rounded-full outline-none focus:outline-none" type="button" href="https://www.x.com/">
                <svg
                    class="fill-current transition duration-700 ease-in-out h-8 w-8 text-gray-700 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-600"
                    role="img" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">       
                    <title>Twitter</title>         
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                </a>
            </div>

        </div>
    </div>
    `;
}
