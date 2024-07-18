const SiteGenerator = require('./scripts/SiteGenerator');

const siteGenerator = SiteGenerator.loadFromConfigFile("config.json")
siteGenerator
    .load()
    .render()
    .clean()
    .flush();