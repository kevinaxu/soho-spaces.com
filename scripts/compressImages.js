const sharp = require('sharp');
const fs = require('fs');
const path = require('path');



const compressionOptions = {    // JPG - compression options 
    quality: 100                 // Adjust the quality as needed (0-100)
};
const conversionOptions = {        // WebP - conversion options
    quality: 80                 // Adjust the quality as needed (0-100)
};
const resizeOptions = {
    width: 1200,                // New width for web display
    height: 1800,               // New height for web display
    fit: 'inside',              // Maintain aspect ratio and resize to fit inside the specified dimensions
    withoutEnlargement: true    // Don't upscale the image if its dimensions are already smaller than the specified width and height
};


const directoryPath = process.argv[2] || null;
if (!directoryPath) {
    console.error('Please provide a directory path as an argument.');
    process.exit(1);
}
const inputDirectory    = path.join(directoryPath, "og/");
const outputDirectory   = path.join(directoryPath, "sharp/");

fs.readdir(inputDirectory, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    } 

    // create output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
        console.log(`Creating directory: ${outputDirectory}...`);
        fs.mkdirSync(outputDirectory);
    }

    // Compress all images in the directory
    files.forEach((file) => {
        const filePath      = path.join(inputDirectory, file);
        const outputFile    = path.join(outputDirectory, file);

        if (path.extname(file).match(/.(jpg|jpeg|png|gif)$/i)) {
            sharp(filePath)
                .rotate()
                .resize(resizeOptions)
                .jpeg(compressionOptions)
                // .toFormat('webp', conversionOptions)
                .toFile(outputFile)
                .then(() => {
                    console.log(`Compressed: ${filePath}...`);
                })
                .catch(err => {
                    console.error('Error compressing image:', filePath, err);
                });
        }
    });
});
