const fs = require('fs');
const mustache = require('mustache');

const data = {
    title: "Dark Academia - Living Room | Soho Spaces",
    // previewCard: {
    // }
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
    beforeAfter: {
        before: {
            url: "/assets/dark-academia/IMG_3265_2x.jpeg"
        },
        after: {
            url: "/assets/dark-academia/IMG_1234.jpeg"
        }
    },
    "title1": "Dark Academia",
    "title2": "Living Room",
    "projectOverviewText":
        `When we asked Kevin to tell us about a place that brought back good memories and made him feel at ease, he began describing the Sterling Memorial Library at Yale University. It's where he used to spend many late nights listening to music while studying or reading a book. He loved the Gothic architecture and how the stained glass windows cast colorful patterns across the floors. He missed the smell of old books mixed with the faint aroma of wood polish. With its rows of towering bookshelves and dimly-lit brass lamps, somehow the library felt both grand and cozy at the same time. With that inspiration in mind, we created this Dark Academia living room - a space where Kevin could gather his thoughts, put on a record, and relax with a good book. We chose modern yet timeless furniture, complemented it with some antique pieces, and balanced rich, dark hues with ornate gold detailing. Full story below.`,

    storyText: {
        paragraphs: [
            `As a first-time homeowner, Kevin was excited to finally invest in quality pieces that would withstand the test of time. He also wanted to include some antiques because they were rooted in history and had a story to tell. For timeless elegance and refined comfort, we selected modern versions of the Chesterfield sofa and Wingback chair. To mimic the reflection of stained glass on the floor, we procured an antique, hand-woven Heriz Perisan rug, famous for its vibrant colors and bold geometric patterns. We then refinished a green marble coffee table and painting that Kevin fell in love with at a local antique store, their intricate gold detailing reminiscent of European cathedrals.`,
            `To tie everything together, we painted the walls in shades of dark green and greige, carrying the color from the baseboards to the crown molding to make the walls feel taller. We then added classic European wainscoting to serve as a subtle backdrop behind the Chesterfield and a frame for the wall sconces. We saw potential in the cabinets, but the dark wood and frosted glass doors made the room look dark and dated. We wanted them to look like built-ins, which would be perfect for housing Kevin's extensive book collection, so we removed the doors and painted them dark green as well. However, we left the fireplace as-is because the ornate carvings seemed to fit the Gothic style Kevin described, and now the dark wood popped nicely against its green surroundings. To complete the library wall and give it a worldly, personalized touch, we added gold gingko leaf hardware and mementos from Kevin's travels.`,
            `Finally, the unique dimensions of the room and bay windows allowed us to divide the space into separate areas that resembled the alcoves at Yale Library. We placed Kevin's piano, record player, sheet music and record collection in one “music alcove” while turning another into a reading nook with plush seating, a brass lamp, and tobacco pipe. The result was a refuge for contemplation that pays homage to the architectural grandeur of his original safe space. It is both cozy and a reflection of Kevin: a Yale graduate who loves traveling and anything that tells a story — be it a book, music, memento,  or art.`
        ]
    },
    "photoGridImages": [
        {
            0: '/assets/dark-academia/crop_this2.jpeg',
            1: '/assets/dark-academia/IMG_3779.jpeg',
            2: '/assets/dark-academia/IMG_0005.jpeg',
            3: '/assets/dark-academia/sconce2.jpeg',
            4: '/assets/dark-academia/IMG_0003.jpeg',
            5: '/assets/dark-academia/IMG_0006.jpeg'
        },
        // {
        //     0: '/assets/dark-academia/chair2.jpeg',
        //     1: '/assets/dark-academia/sofa_close_up.jpeg',
        //     2: '/assets/dark-academia/IMG_9150.jpeg',
        //     3: '/assets/dark-academia/IMG_0008.jpeg',
        //     4: '/assets/dark-academia/IMG_0014.jpeg',
        //     5: '/assets/dark-academia/IMG_0020.jpeg'
        // },
        // {
        //     0: '/assets/dark-academia/IMG_0010.jpeg',
        //     1: '/assets/dark-academia/IMG_3487.jpeg',
        //     2: '/assets/dark-academia/candles.jpeg',
        //     3: '/assets/dark-academia/IMG_0021.jpeg',
        //     4: '/assets/dark-academia/candlesticks.jpeg',
        //     5: '/assets/dark-academia/record1.jpeg'
        // },
    ],
    "photoCarouselImages": [
        { index: 0, url: '/assets/dark-academia/crop_this2.jpeg'},
        { index: 1, url: '/assets/dark-academia/IMG_3779.jpeg'},
        { index: 2, url: '/assets/dark-academia/IMG_0005.jpeg'},
        { index: 3, url: '/assets/dark-academia/sconce2.jpeg'},
        { index: 4, url: '/assets/dark-academia/IMG_0003.jpeg'},
        { index: 5, url: '/assets/dark-academia/IMG_0006.jpeg'},
        // { index: 6, url: '/assets/dark-academia/chair2.jpeg'},
        // { index: 7, url: '/assets/dark-academia/sofa_close_up.jpeg'},
        // { index: 8, url: '/assets/dark-academia/IMG_9150.jpeg'},
        // { index: 9, url: '/assets/dark-academia/IMG_0008.jpeg'},
        // { index: 10, url: '/assets/dark-academia/IMG_0014.jpeg'},
        // { index: 11, url: '/assets/dark-academia/IMG_0020.jpeg'},
        // { index: 12, url: '/assets/dark-academia/IMG_0010.jpeg'},
        // { index: 13, url: '/assets/dark-academia/IMG_3487.jpeg'},
        // { index: 14, url: '/assets/dark-academia/candles.jpeg'},
        // { index: 15, url: '/assets/dark-academia/IMG_0021.jpeg'},
        // { index: 16, url: '/assets/dark-academia/candlesticks.jpeg'},
        // { index: 17, url: '/assets/dark-academia/record1.jpeg' }
    ],
    enableTransparency: true,
    debug: false 
};

const partials = {
    'photoCarousel': fs.readFileSync('_templates/partials/photoCarousel.mustache', 'utf8'),
    'photoCarouselIndicator': fs.readFileSync('_templates/partials/photoCarouselIndicator.mustache', 'utf8'),
    'photoCarouselItem': fs.readFileSync('_templates/partials/photoCarouselItem.mustache', 'utf8'),
}
const template = fs.readFileSync('_templates/partials/photoCarouselModal.mustache', 'utf8');
const output = mustache.render(template, data, partials);
console.log(output)

/*
const template = fs.readFileSync('_templates/portfolio-page.mustache', 'utf8');

// Render the template with the data
const partials = {
    'head':     fs.readFileSync('_templates/partials/head.mustache', 'utf8'),
    'footer':   fs.readFileSync('_templates/partials/footer.mustache', 'utf8'),
    'navbar':   fs.readFileSync('_templates/partials/navbar.mustache', 'utf8'),
    'heroMedia':    fs.readFileSync('_templates/partials/heroMedia.mustache', 'utf8'),
    'heroImage':    fs.readFileSync('_templates/partials/heroImage.mustache', 'utf8'),
    'heroVideo':    fs.readFileSync('_templates/partials/heroVideo.mustache', 'utf8'),
    'beforeAfter':  fs.readFileSync('_templates/partials/beforeAfter.mustache', 'utf8'),
    'photoGrid':    fs.readFileSync('_templates/partials/photoGrid.mustache', 'utf8'),
    'photoGridDesktop': fs.readFileSync('_templates/partials/photoGridDesktop.mustache', 'utf8'),
    'photoGridMobile': fs.readFileSync('_templates/partials/photoGridMobile.mustache', 'utf8'),
    'photoCarousel': fs.readFileSync('_templates/partials/photoCarousel.mustache', 'utf8'),
    'photoCarouselIndicator': fs.readFileSync('_templates/partials/photoCarouselIndicator.mustache', 'utf8'),
    'photoCarouselItem': fs.readFileSync('_templates/partials/photoCarouselItem.mustache', 'utf8'),
    'photoCarouselModal': fs.readFileSync('_templates/partials/photoCarouselModal.mustache', 'utf8'),
}
const output = mustache.render(template, data, partials);

// Optional: Save the rendered output to a file
fs.writeFileSync('_site/portfolio/dark-academia-living-room.html', output);
*/


/*
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
*/

/*
// Data for 404
const data = {
    title: "404 Not Found | Soho Spaces",
    enableTransparency: false,
    debug: false,
}

// Read the Mustache template file
const template = fs.readFileSync('_templates/404.mustache', 'utf8');

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