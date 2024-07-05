const fs = require('fs-extra');
const path = require('path');
const mustache = require('mustache');

/*
const config = {
    "siteData": "_pages",
    "siteDirectory": "_site",
    "siteTemplates": {
        "page": "_templates/pages",
        "partial": "_templates/partials"
    },
    "mapping": {
        "index.json": {
            "template": "index.mustache",
            "outputPath": "index.html",
            "partials": ["head", "navbar", "heroMedia", "heroImage", "heroVideo", "footer"]
        },
        "portfolio.json": {
            "template": "portfolio.mustache",
            "outputPath": "portfolio.html",
            "partials": ["head", "navbar", "portfolioGrid", "portfolioItem", "footer"]
        },
        "404.json": {
            "template": "404.mustache",
            "outputPath": "404.html",
            "partials": ["head", "navbar", "footer"]
        },
        "dark-academia.json": {
            "template": "portfolio-page.mustache",
            "outputPath": "portfolio/dark-academia-living-room.html",
            "partials": ["head", "navbar", "heroMedia", "heroImage", "heroVideo", "beforeAfter", "photoGrid", "photoGridDesktop", "photoGridMobile", "photoCarousel", "photoCarouselIndicator", "photoCarouselItem", "photoCarouselModal", "footer"]
        }
    },
    "dryRun": false
}
*/

// TODO: 
// - don't load/reload partials every single time 
// - change prefix of the site depending on production or local 
//      - local --> localhost:4000/
//      - prod --> soho-spaces.com 
class SiteGenerator { 
    constructor(config) {
        this.config = config;
    }

    static loadFromConfigFile(configFilePath) {
        try {
            // Read config file synchronously
            const config = fs.readJsonSync(configFilePath);
            return new SiteGenerator(config);
        } catch (err) {
            console.error('Error loading SiteGenerator from config file:', err);
            return null;
        }
    }

    load() {
        this.pageData = this._readJsonFiles(this.config.siteData);
        return this;
    }

    /**
     * Recursively reads all JSON files from a directory and its subdirectories.
     *
     * @returns {Array} - An array of objects parsed from the JSON files.
     */
    _readJsonFiles(directoryPath) {
        let jsonFiles = [];

        try {
            const files = fs.readdirSync(directoryPath);
            files.forEach(file => {
                const filePath = path.join(directoryPath, file);
                try {
                    const stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        // Recursively process subdirectories
                        jsonFiles = jsonFiles.concat(this._readJsonFiles(filePath));
                    } else if (path.extname(filePath).toLowerCase() === '.json') {
                        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                        jsonFiles.push({
                            "filePath": file, 
                            "data": jsonData
                        });
                    }
                } catch (error) {
                    console.error(`Error processing file ${filePath}: ${error.message}`);
                }
            });
        } catch (error) {
            console.error(`Error reading directory ${directoryPath}: ${error.message}`);
        }

        return jsonFiles;
    }

    /**
     * Load Mustache page templates from the specified directory.
     *
     * @param {string} page - page template name (without the .mustache extension).
     * @param {string} directoryPath - File directory to look in 
     * @returns {Object} - An object containing the partial templates, keyed by their names.
     */
    _loadPageTemplate(page, directoryPath) {
        const pagePath = path.join(directoryPath, `${page}`);
        try {
            const pageTemplate = fs.readFileSync(pagePath, 'utf8');
            return pageTemplate;
        } catch (error) {
            console.error(`Error loading page template "${page}": ${error.message}`);
        }
    }

    /**
     * Load Mustache partial templates from the specified directory.
     *
     * @param {string[]} partials - Array of partial template names (without the .mustache extension).
     * @param {string} directoryPath - File directory to look in 
     * @returns {Object} - An object containing the partial templates, keyed by their names.
     */
    _loadPartialTemplates(partials, directoryPath) {
        const partialTemplates = {};

        partials.forEach(partial => {
            const partialPath = path.join(directoryPath, `${partial}.mustache`);
            try {
                partialTemplates[partial] = fs.readFileSync(partialPath, 'utf8');
            } catch (error) {
                console.error(`Error loading partial template "${partial}": ${error.message}`);
            }
        });

        return partialTemplates;
    }

    /**
     * Processes the input object to add photoGridImages and photoCarouselImages properties.
     *
     * @param {Object} data - The input object containing an array of image URLs.
     * @returns {Object} - The enriched object with photoGridImages and photoCarouselImages properties.
     */
    _preprocessPortfolioPageData(data) {
        const images = data.images;

        // Create photoGridImages by chunking the images into size 6
        const photoGridImages = [];
        for (let i = 0; i < images.length; i += 6) {
            const chunk = {};
            for (let j = 0; j < 6; j++) {
                if (i + j < images.length) {
                    chunk[j] = images[i + j];
                }
            }
            photoGridImages.push(chunk);
        }

        // Create photoCarouselImages with index count
        const photoCarouselImages = images.map((url, index) => ({ index, url }));

        // Return the enriched object
        delete data.images;
        return {
            ...data,
            photoGridImages,
            photoCarouselImages
        };
    }

    render() {
        this.pageHTML = [] 
        for (const page of this.pageData) {
            this.pageHTML.push(
                this._renderPage(page.filePath, page.data)
            );
        }
        return this; 
    }

    _renderPage(pageName, pageData) {
        const pageMapping = this.config.mapping[pageName];
        if (pageMapping.template === "portfolio-page.mustache") {
            pageData = this._preprocessPortfolioPageData(pageData);
        }

        const html = mustache.render(
            this._loadPageTemplate(pageMapping.template, this.config.siteTemplates.page),
            pageData,
            this._loadPartialTemplates(pageMapping.partials, this.config.siteTemplates.partial)
        );

        return {
            outputPath: pageMapping.outputPath,
            pageHTML: html
        }
    }

    clean() {
        console.log(`Clearing ${this.config.siteDirectory} has been removed.`);
        if (!this.config.dryRun) {
            fs.emptyDirSync(this.config.siteDirectory);
        }
        return this;
    }

    flush() {
        // Create _site directory, if necessary
        fs.ensureDirSync("_site/");
        fs.ensureDirSync("_site/portfolio");

        // write generated pages
        for (const page of this.pageHTML) {
            const filePath = path.join("_site/", page.outputPath);
            console.log("writing page:", filePath);
            if (!this.config.dryRun) {
                fs.writeFileSync(filePath, page.pageHTML);
            }
        }

        // copy static files 
        this._copyDirectoryContents("_public", "_site/", {
            filter: (src, dest) => {
                const basename = path.basename(src);
                return basename !== 'og' && basename !== 'sharp';
            }
        });
        return this; 
    }

    _copyDirectoryContents(sourceDir, targetDir, params={}) {
        try {
            if (!this.config.dryRun) {
                fs.copySync(sourceDir, targetDir, { overwrite: true, ...params });
            }
            console.log(`Contents of ${sourceDir} have been copied to ${targetDir}.`);
        } catch (err) {
            console.error(`Error while copying directory contents:`, err);
        }
    }
}

module.exports = SiteGenerator;