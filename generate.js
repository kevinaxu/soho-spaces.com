const SiteGenerator = require('./src/SiteGenerator');

const siteGenerator = SiteGenerator.loadFromConfigFile("config.json")
siteGenerator
    .load()
    .render()
    .clean()
    .flush();