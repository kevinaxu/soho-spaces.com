
window.onload = function () {
    console.log("slider.js: setting slider element HTML...");

    var imgBefore = "../assets/accent_wall/console_center.jpeg";
    var imgAfter = "../assets/accent_wall/console_left.jpeg";

    // create a new div element with id="slider" with the following HTML string
    var sliderElement = document.getElementById('slider-container');
    var sliderHTML = `
      <div id="image-container">
        <div id="before-after-slider">
            <div id="before-image">
              <img class="slider-image"  src=${imgBefore} alt="before"/>
            </div>
            <div id="after-image">
              <img class="slider-image" src=${imgAfter} alt="After"/>
            </div>
            <div id="resizer"></div>
        </div>
      </div>`;
    sliderElement.innerHTML = sliderHTML;

    initSlider();
}

function initSlider() {
    console.log("slider.js: initSlider()...");
    
    const imageContainer = document.getElementById('image-container');
    console.log("image container width", imageContainer.width);

    const slider = document.getElementById('before-after-slider');
    const before = document.getElementById('before-image');
    const beforeImage = before.getElementsByTagName('img')[0];
    console.log("before image src", beforeImage.src);
    const resizer = document.getElementById('resizer');

    let active = false;

    //Sort overflow out for Overlay Image
    let width = slider.offsetWidth;
    console.log("slider.offsetWidth", width);

    console.log("DOMContentLoaded: width", width);
    beforeImage.style.width = width + 'px';

    //Adjust width of image on resize 
    window.addEventListener('resize', function () {
        let width = slider.offsetWidth;
        console.log(width);
        beforeImage.style.width = width + 'px';
    })

    resizer.addEventListener('mousedown', function () {
        active = true;
        resizer.classList.add('resize');
    });

    slider.addEventListener('mouseup', function () {
        active = false;
        resizer.classList.remove('resize');
    });

    slider.addEventListener('mouseleave', function () {
        active = false;
        resizer.classList.remove('resize');
    });

    slider.addEventListener('mousemove', function (e) {
        if (!active) return;
        let x = e.pageX;
        x -= slider.getBoundingClientRect().left;
        slideIt(x);
        pauseEvent(e);
    });

    resizer.addEventListener('touchstart', function () {
        active = true;
        resizer.classList.add('resize');
    });

    slider.addEventListener('touchend', function () {
        active = false;
        resizer.classList.remove('resize');
    });

    slider.addEventListener('touchcancel', function () {
        active = false;
        resizer.classList.remove('resize');
    });

    //calculation for dragging on touch devices
    slider.addEventListener('touchmove', function (e) {
        if (!active) return;
        let x;

        let i;
        for (i = 0; i < e.changedTouches.length; i++) {
            x = e.changedTouches[i].pageX;
        }

        x -= slider.getBoundingClientRect().left;
        slideIt(x);
        pauseEvent(e);
    });

    function slideIt(x) {
        let transform = Math.max(0, (Math.min(x, slider.offsetWidth)));
        before.style.width = transform + "px";
        resizer.style.left = transform - 0 + "px";
    }

    //stop divs being selected.
    function pauseEvent(e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}