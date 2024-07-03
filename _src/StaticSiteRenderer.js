const fs = require('fs');
const mustache = require('mustache');

// Portfolio Listing page 
const data = {
    title: "Portfolio | Soho Spaces",
    pages: [
        {
            "name": "modern gothic",
            "featured_image_src": '/assets/modern-gothic/IMG_0964.jpeg',
            "page_path": "./portfolio/modern-gothic-kitchen",
            "image_position": "object-top"
        },
        {
            "name": "dark academia",
            "featured_image_src": '/assets/dark-academia/IMG_0020.jpeg',
            "page_path": "./portfolio/dark-academia-living-room",
            "image_position": "object-center"
        },
        {
            "name": "moody romantic",
            "featured_image_src": '/assets/moody-romantic/IMG_0008.jpeg',
            "page_path": "./portfolio/moody-romantic-bedroom",
            "image_position": "object-center"
        },
        {
            "name": "muted mediterranean",
            "featured_image_src": '/assets/muted-mediterranean/IMG_3696.jpeg',
            "page_path": "./portfolio/muted-mediterranean-breakfast-nook",
            "image_position": "object-center"
        },
        {
            "name": "east meets west",
            "featured_image_src": "/assets/east-meets-west/umbrella.jpeg",
            "page_path": "./portfolio/east-meets-west-entryway",
            "image_position": "object-center"
        },
        {
            "name": "gingkos + greys",
            "featured_image_src": "/assets/gingkos-and-greys/IMG_0967.jpeg",
            "page_path": "./portfolio/gingkos-and-greys-powder-room",
            "image_position": "object-left"
        },
    ],
    enableTransparency: false,
    debug: false,
}

const template = fs.readFileSync('_templates/portfolio.mustache', 'utf8');

// get heroMedia.desktop - if it's .mp4, use the hero-video.mustache template, else hero-image.mustache
// get heroMedia.mobile - if it's .mp4, use hero-video mustache template, else use hero-image.mustache

// Render the template with the data
const partials = {
    'head':     fs.readFileSync('_templates/partials/head.mustache', 'utf8'),
    'footer':   fs.readFileSync('_templates/partials/footer.mustache', 'utf8'),
    'navbar':   fs.readFileSync('_templates/partials/navbar.mustache', 'utf8'),
    'portfolioGrid': fs.readFileSync('_templates/partials/portfolioGrid.mustache', 'utf8'),
    'portfolioItem': fs.readFileSync('_templates/partials/portfolioItem.mustache', 'utf8'),
}
const output = mustache.render(template, data, partials);

// Optional: Save the rendered output to a file
fs.writeFileSync('_site/portfolio.html', output);

/*
// Data for 404
const data = {
    title: "404 Not Found | Soho Spaces",
    enableTransparency: false,
    debug: false,
}

// Read the Mustache template file
const template = fs.readFileSync('_templates/404.mustache', 'utf8');

// get heroMedia.desktop - if it's .mp4, use the hero-video.mustache template, else hero-image.mustache
// get heroMedia.mobile - if it's .mp4, use hero-video mustache template, else use hero-image.mustache

// Render the template with the data
const partials = {
    'head':     fs.readFileSync('_templates/partials/head.mustache', 'utf8'),
    'footer':   fs.readFileSync('_templates/partials/footer.mustache', 'utf8'),
    'navbar':   fs.readFileSync('_templates/partials/navbar.mustache', 'utf8'),
}
const output = mustache.render(template, data, partials);

// Optional: Save the rendered output to a file
fs.writeFileSync('_site/404.html', output);
*/



/*
// Data for Homepage
const data = {
    title: "Home | Soho Spaces",
    heroMedia: {
        desktop: {
            url: "/assets/dark-academia/hero_video.mp4",
            isVideo: true,
        },
        mobile: {
            url: "/assets/home/hero_video_portrait.mp4",
            isVideo: true,
        }
    },
    enableTransparency: true,
    debug: false,
}

// Read the Mustache template file
const template = fs.readFileSync('_templates/index.mustache', 'utf8');

// get heroMedia.desktop - if it's .mp4, use the hero-video.mustache template, else hero-image.mustache
// get heroMedia.mobile - if it's .mp4, use hero-video mustache template, else use hero-image.mustache

// Render the template with the data
const partials = {
    'head':     fs.readFileSync('_templates/partials/head.mustache', 'utf8'),
    'footer':   fs.readFileSync('_templates/partials/footer.mustache', 'utf8'),
    'navbar':   fs.readFileSync('_templates/partials/navbar.mustache', 'utf8'),
    'heroMedia':    fs.readFileSync('_templates/partials/heroMedia.mustache', 'utf8'),
    'heroImage':    fs.readFileSync('_templates/partials/heroImage.mustache', 'utf8'),
    'heroVideo':    fs.readFileSync('_templates/partials/heroVideo.mustache', 'utf8'),
}
const output = mustache.render(template, data, partials);

// Optional: Save the rendered output to a file
fs.writeFileSync('_site/output.html', output);
*/