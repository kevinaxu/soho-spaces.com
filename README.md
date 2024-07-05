This repo contains code, templates, and assets used for the static generation of soho-spaces.com. The structure of this static site generator is inspired by Jekyll.

## Directory Structure

```
soho-spaces.com
├── pages/
│   ├── index.json
│   ├── portfolio.json
│   ├── 404.json
│   └── portfolio/
│       ├── dark-academia-living-room.json
│       ├── modern-gothic-kitchen.json
│       └── moody-romantic-bedroom.json
├── templates/
│   ├── pages/
│   │   ├── index.mustache
│   │   ├── 404.mustache
│   │   └── portfolio.mustache
│   └── partials/
│       ├── navBar.mustache
│       ├── footer.mustache
│       └── head.mustache
├── public/
│   ├── assets/
|   ├── styles/
│   └── scripts/
│       ├── PhotoGrid.js
│       └── NavBar.js
├── _site/
├── config.json
└── generate.js
```

| File/Directory | Description                                                                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/pages`       | Contains all page data as `json` files. All data in this directory is loaded in recursively by the `SiteGenerator`  class.                                                                                     |
| `/templates`   | Contains all `partial` and `page` templates. This project uses `mustache` as the template engine.                                                                                                              |
| `/public`      | Contains any static files that need to get copied over wholesale to the generate site. Includes image and video `assets`, client-side `scripts`, and css `styles`.                                             |
| `/_site`       | Directory containing the generated output site. The contents of this directory are copied over to CDN during deploy process.                                                                                   |
| `config.json`  | Contains all data and mapping related to the site configuration. This is consumed by the `SiteGenerator` class which will read data and templates, render, and write the site based on configured directories. |
| `generate.js`  | Thin runner script used for (re)generating the site.                                                                                                                                                           |

## Getting Started

```javascript
npm install
npm run generate 
```
## Binding Event Listeners

The `StaticSiteRenderer` generates the static HTML for dynamic components such as `PhotoGrid.ts` and `PhotoCarousel.ts`. On the client-side, `/scripts/client/app.js` binds event listeners to each respective components based on `class` selectors. 

Example: 
```html
<div class="photo-grid">
  <div class="photo-grid__item js-photo-item" data-photo-id="1">
    <img src="photo1.jpg" alt="Photo 1" class="photo-grid__image">
  </div>
  <div class="photo-grid__item js-photo-item" data-photo-id="2">
    <img src="photo2.jpg" alt="Photo 2" class="photo-grid__image">
  </div>
</div>
```

```javascript
document.querySelectorAll('.js-photo-item').forEach(item => {
  item.addEventListener('click', (event) => {
    const photoId = item.getAttribute('data-photo-id');
    console.log('Photo item clicked', photoId);
  });
});
```


## Build Process 

[![Asciiflow" which can create a flow diagram with ASCII art - GIGAZINE](https://i.gzn.jp/img/2014/01/23/asciiflow/20_m.png)

Build process includes the following steps: 
- Clean up old files in `/site`
- Process images and video 
- Read in all directories
- Load all templates, partials,  post data 
- Copy over all data from `/public`, ignoring any subdirectories matching `config.ignore[]`
- Write files to `/site`
- Output stats



## Processing Images 

- `/og`
- `/sharp` 

```

const compressionOptions = {    // JPG - compression options 
    quality: 90                 // Adjust the quality as needed (0-100)
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
```
## Processing Video 

![[hero_video.mp4]]

There are a few full-size videos that get featured as a Hero section (Homepage, Dark Academia). At a high-level, videos need to be: 
- Imported into `/assets` directory 
- Stripped of audio tracks and other metadata
- Trimmed, if necessary 

Video playback is at `0.5x` speed in order to create a more subtle motion and to extend the time the video plays before looping

Subsequent versions should look into: 
- Converting videos to `.gif` to minimize storage.

### FFMPEG Parameters

FFMPEG is used for video processing. Relevant options are shown below. 

| Option                                     | Description                                                                                                                                                                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -c:v libx264                               | Sets the video codec to H.264 (libx264).                                                                                                                                                                                                                 |
| -i input.mov                               | Specifies the input file name (replace input.mov with the actual filename).                                                                                                                                                                              |
| -crf 23                                    | Constant Rate Factor (CRF) for video quality. Lower values result in higher quality but larger file sizes. A CRF value of around 23 is considered a good balance.                                                                                        |
| -preset medium                             | Sets the encoding preset. The medium preset offers a good balance between encoding speed and compression efficiency.                                                                                                                                     |
| -c:a aac -b:a 128k                         | Sets the audio codec to AAC with a bitrate of 128 kbps.                                                                                                                                                                                                  |
| -vf "scale=-1:1080"                        | Resizes the video to a height of 1080 pixels while maintaining the aspect ratio. The -1 for width tells FFmpeg to automatically calculate the width based on the aspect ratio.                                                                           |
| -vf "crop=in_w:in_h-50:0:50,scale=-1:1080" | This part of the command applies two video filters sequentially. First, it crops the video to remove the top 50 pixels (crop=in_w:in_h-50:0:50), then it scales the video to a height of 1080 pixels while maintaining the aspect ratio (scale=-1:1080). |
| -an                                        | This option tells FFmpeg to disable audio recording completely.                                                                                                                                                                                          |
| -ss 2                                      | This option tells FFmpeg to start the input from 2 seconds into the video, effectively skipping the first 2 seconds.                                                                                                                                     |
| output.mp4                                 | Specifies the output file name (replace output.mp4 with your desired filename).                                                                                                                                                                          |

```shell
ffmpeg -i kitchen_lq.mov -c:v libx264 -crf 18 -preset medium -an -vf "crop=in_w:in_h-50:0:50,scale=-1:1080" out.mp4
```

```
for i in *.jpeg; do
convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% "${i}" "${i%}_compressed.jpeg"
done

// convert and compress .mov to mp4
ffmpeg -i powder.mov -qscale 0 powder.mp4

```


## Tests

- Data validation
	- Verify required fields in `page.json` 
- Template rendering logic 
	- Given test data, assert that the generated template is correct 
- Client-side JS
	- bindEventListeners() is binding everything correctly 
	- I can invoke all `FlowbiteCarousel` methods to force  transitions 
- Unit testing
	- Isolated Tests: Ensure individual functions or components work as expected.
	- Mocking Dependencies: Use tools like Jest with mock functions to isolate the component under test.
	- Mocha: Flexible testing framework, often used with Chai for assertions.
	- Chai: Assertion library that can be used with Mocha.
- Static Site Generation (SSG) Specific Testing
	- Build Output Verification: Validate that the output HTML, CSS, and JS files are generated correctly.
	- Content Integrity: Ensure that the content, such as blog posts or pages, is correctly rendered.
	- Link Validation: Check for broken internal and external links.
	- Asset Optimization: Validate that assets like images, fonts, and scripts are correctly optimized and referenced.


## FAQ

- Why `json` over `md`?
- Why didn't I use Jekyll instead of building custom rendering code? 
	- Wanted to keep things in Node.js 
	- Already built an original version, keep it going 
- For dynamic components such as `PhotoGrid` and `PhotoCarousel`, when do I need to use `class` vs `id`? When do components need to be unique? 
