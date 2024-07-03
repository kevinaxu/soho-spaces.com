const fs = require('fs');
const mustache = require('mustache');

const data = {
    title: "Home | Soho Spaces",
    debug: false
}

// Read the Mustache template file
const template = fs.readFileSync('../templates/index.mustache', 'utf8');

// Render the template with the data
const partials = {
    'head':     fs.readFileSync('../templates/partials/head.mustache', 'utf8'),
    'footer':   fs.readFileSync('../templates/partials/footer.mustache', 'utf8'),
}
const output = mustache.render(template, data, partials);

// Optional: Save the rendered output to a file
fs.writeFileSync('site/output.html', output);