
/*******************************************************************
 * Process a directory of images 
 * - lowercase all file names
 * - convert image format to jpg
 * - reduce image size / quality 
 * 
 * 
 * Input:   directory path
 * Output:  directory path
 * 
 ********************************************************************/

const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const convert = require('heic-convert');

// TODO: update these to the correct directories whenever photos get added!
const INPUT_DIR = "./media";
const OUTPUT_DIR = "./assets"; 
processImages(INPUT_DIR, OUTPUT_DIR);

async function processImages(inFileDir, outFileDir) {
    const inFiles   = fs.readdirSync(inFileDir);
    
    for (var i = 0; i < inFiles.length; i++) {
        const inFileName = inFiles[i];
        const outFileName = getNewFileName(inFileName);

        const inFilePath = inFileDir + "/" + inFileName;
        const outFilePath = outFileDir + "/" + outFileName;

        console.log("in", inFilePath);
        console.log("out:", outFilePath);


        // TODO: check if directory doesn't exist, in which case create it

        try {
            // check if output file already exists
            if (fs.existsSync(outFilePath)) {
                console.log("Output file already exists\n");
                continue;
            }

            if (path.extname(inFileName).toLowerCase() == ".heic") {
                await processHEIC(inFilePath, outFilePath);
            } else if (path.extname(inFileName).toLowerCase() == ".jpg") {
                await processJPG(inFilePath, outFilePath);
            } else {
                console.log("Skipping file:\n", inFilePath);
            }
            console.log("\n");
        } catch (err) {
            console.error("Error processing image:", err);
        }

    }
}


// convert HEIC --> JPG, resize JPG
async function processHEIC(inFilePath, outFilePath) {
    console.log("convertHEIC()");
    try {
        // Read the HEIC file into memory
        const inputBuffer = fs.readFileSync(inFilePath);

        const outputBuffer = await convert({
            buffer: inputBuffer, // the HEIC file buffer
            format: 'JPEG',      // output format
            quality: 1          // the jpeg compression quality, between 0 and 1
        });
        const image = await jimp.read(outputBuffer);
        image
            .resize(1280, jimp.AUTO) // Resize the image to a width of 300 pixels
            .quality(85) // Set the quality to 80%
            .write(outFilePath); // Save the image to a file 
        console.log("Saving File:", outFilePath);
    } catch (error) {
        console.error('Error in convertHEIC():', error);
    }
}

async function processJPG(inFilePath, outFilePath) {
    console.log("resizeJPG()");
    try {
        const inputBuffer = fs.readFileSync(inFilePath);
        const image = await jimp.read(inputBuffer);
        image
            .resize(1560, jimp.AUTO) // Resize the image to a width of 300 pixels
            .quality(80) // Set the quality to 80%
            .write(outFilePath); // Save the image to a file 
        console.log(`Saving File: ${outFilePath}`);
    } catch (error) {
        console.error('Error in resizeJPG():', error);
    }
}

function getNewFileName(fileName) {
    return fileName.toLowerCase().split(".").shift() + ".jpg";
}
function getNewFilePath(fileName) {
    return OUTPUT_DIR + "/" + getNewFileName(fileName);
}