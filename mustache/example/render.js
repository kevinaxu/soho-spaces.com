const fs = require('fs');
const mustache = require('mustache');

// Read the Mustache template file
const template = fs.readFileSync('template.mustache', 'utf8');

const data = {
    "title1": "Dark Academia",
    "title2": "Living Room",
    "heroMedia": {
        "desktop": "/assets/dark-academia/hero_video.mp4",
        "mobile":  "/assets/home/hero_video_portrait.mp4"
    },
    "projectOverviewText":
        `When we asked Kevin to tell us about a place that brought back good memories and made him feel at ease, he began describing the Sterling Memorial Library at Yale University. It's where he used to spend many late nights listening to music while studying or reading a book. He loved the Gothic architecture and how the stained glass windows cast colorful patterns across the floors. He missed the smell of old books mixed with the faint aroma of wood polish. With its rows of towering bookshelves and dimly-lit brass lamps, somehow the library felt both grand and cozy at the same time. With that inspiration in mind, we created this Dark Academia living room - a space where Kevin could gather his thoughts, put on a record, and relax with a good book. We chose modern yet timeless furniture, complemented it with some antique pieces, and balanced rich, dark hues with ornate gold detailing. Full story below.`,
    "beforeImg": "/assets/dark-academia/IMG_3265_2x.jpeg",
    "afterImg": "/assets/dark-academia/IMG_1234.jpeg",
    "storyText":
        `As a first-time homeowner, Kevin was excited to finally invest in quality pieces that would withstand the test of time. He also wanted to include some antiques because they were rooted in history and had a story to tell. For timeless elegance and refined comfort, we selected modern versions of the Chesterfield sofa and Wingback chair. To mimic the reflection of stained glass on the floor, we procured an antique, hand-woven Heriz Perisan rug, famous for its vibrant colors and bold geometric patterns. We then refinished a green marble coffee table and painting that Kevin fell in love with at a local antique store, their intricate gold detailing reminiscent of European cathedrals. 
        <br><br>
        To tie everything together, we painted the walls in shades of dark green and greige, carrying the color from the baseboards to the crown molding to make the walls feel taller. We then added classic European wainscoting to serve as a subtle backdrop behind the Chesterfield and a frame for the wall sconces. We saw potential in the cabinets, but the dark wood and frosted glass doors made the room look dark and dated. We wanted them to look like built-ins, which would be perfect for housing Kevin's extensive book collection, so we removed the doors and painted them dark green as well. However, we left the fireplace as-is because the ornate carvings seemed to fit the Gothic style Kevin described, and now the dark wood popped nicely against its green surroundings. To complete the library wall and give it a worldly, personalized touch, we added gold gingko leaf hardware and mementos from Kevin's travels.
        <br><br>
        Finally, the unique dimensions of the room and bay windows allowed us to divide the space into separate areas that resembled the alcoves at Yale Library. We placed Kevin's piano, record player, sheet music and record collection in one “music alcove” while turning another into a reading nook with plush seating, a brass lamp, and tobacco pipe. The result was a refuge for contemplation that pays homage to the architectural grandeur of his original safe space. It is both cozy and a reflection of Kevin: a Yale graduate who loves traveling and anything that tells a story — be it a book, music, memento,  or art.`,
    "photoGridImages": [
        '/assets/dark-academia/crop_this2.jpeg',
        '/assets/dark-academia/IMG_3779.jpeg',
        '/assets/dark-academia/IMG_0005.jpeg',
        '/assets/dark-academia/sconce2.jpeg',
        '/assets/dark-academia/IMG_0003.jpeg',
        '/assets/dark-academia/IMG_0006.jpeg'
    ],
    "enableNavBarTransparentEffect": true,
};


// TODO: modularize data! 
// const data = {
//     title: "Home Page",
//     header: {
//       title: "My Website"
//     },
//     footer: {
//       year: new Date().getFullYear(),
//       siteName: "My Website"
//     },
//     navigation: {
//       links: [
//         { name: "Home", url: "/" },
//         { name: "About", url: "/about" }
//       ]
//     },
//     home: {
//       heading: "Welcome to the Home Page",
//       content: "This is the home page content."
//     }
// };

// Render the template with the data
const partials = {
    'media':    fs.readFileSync('media.mustache', 'utf8'),
    'content':  fs.readFileSync('content.mustache', 'utf8')
}
const output = mustache.render(template, data, partials);

// Output the result
// console.log(output);

// Optional: Save the rendered output to a file
fs.writeFileSync('output.html', output);