const fs = require('fs');
const mustache = require('mustache');

const data = {
    title: "Home | Soho Spaces",
    debug: true
}

// Read the Mustache template file
const template = fs.readFileSync('layouts/index.mustache', 'utf8');

// Render the template with the data
const partials = {
    'head':     fs.readFileSync('partials/head.mustache', 'utf8'),
    'footer':   fs.readFileSync('partials/footer.mustache', 'utf8'),
}
const output = mustache.render(template, data, partials);

// Optional: Save the rendered output to a file
fs.writeFileSync('output.html', output);