const fs = require('fs');
const mustache = require('mustache');

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