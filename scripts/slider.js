function initSliders() {
    const sliderContainers = document.getElementsByClassName('slider-container');
    for (let i = 0; i < sliderContainers.length; i++) {
        const slider    = sliderContainers[i].getElementsByClassName('before-after-slider')[0];
        const before    = sliderContainers[i].getElementsByClassName('before-image')[0];
        const resizer   = sliderContainers[i].getElementsByClassName('resizer')[0];
        addSliderEventListeners(slider, before, resizer);
    }
}

function addSliderEventListeners(slider, before, resizer) {

    const beforeImage = before.getElementsByTagName('img')[0];

    let active = false;

    //Sort overflow out for Overlay Image
    let width = slider.offsetWidth;
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