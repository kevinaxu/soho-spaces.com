var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function (event) {
        event.preventDefault()
        toggleModal(event);
    })
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

// var closemodal = document.querySelectorAll('.modal-close')
// for (var i = 0; i < closemodal.length; i++) {
//     closemodal[i].addEventListener('click', toggleModal)
// }

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal(evt)
    }
};


function getThumbnailImages(event) {
    var images = [];
    var parent = event.target.parentElement.parentElement;
    for (var i = 0; i < parent.children.length; i++) {
        var child = parent.children[i].children[0];
        if (child.nodeName === "IMG") {
            images.push(child.src);
        }
    }
    return images;
}

let modalImages = [];
let modalPosition = 0;

function toggleModal(event) {
    console.log("toggle modal");
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')

    if (!event) {
        modalImages = [];
        modalPosition = 0;
        return;     // modal is being closed
    }

    if (event.target.nodeName === "IMG") {

        // load all images from thumbnails 
        modalImages = getThumbnailImages(event);
        console.log("images:", modalImages);

        // get current position of carousel
        modalPosition = modalImages.indexOf(event.target.src);
        console.log("position:", modalPosition);

        // console.log("toggleModal(): clicked on image:", event.target.src);
        const modalImage = document.getElementById('modal-image');
        modalImage.src = event.target.src;  
        modalImage.style.marginTop = calculateMarginTop(modalImage);

    }
}

function calculateMarginTop(image) {
    if (image.width > image.height) {      // landscape
        return "128px";
    } else {                                // portrait, or square
        return "16px";
    }
}


// SWIPE HANDLING
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;
    
function checkDirection() {
    // console.log("X:", touchstartX, touchendX)
    // console.log("Y:", touchstartY, touchendY)

    var distX = Math.abs(touchendX - touchstartX);
    var distY = Math.abs(touchendY - touchstartY);

    const modalImage = document.getElementById('modal-image');

    const threshold = 50;

    if (touchendY < touchstartY && distY > threshold) {
        toggleModal();
    }
    if (touchendY > touchstartY && distY > threshold) {
        toggleModal();
    }

    if (touchendX < touchstartX && distX > threshold) {         // swipe left 
        console.log("modalPosition", modalPosition);

        if (modalPosition < modalImages.length - 1) {
            modalPosition++;
            modalImage.src = modalImages[modalPosition];
            modalImage.style.marginTop = calculateMarginTop(modalImage);
        }
    }
    if (touchendX > touchstartX && distX > threshold) {         // swipe right 
        console.log("modalPosition", modalPosition);
        if (modalPosition > 0) {
            modalPosition--;
            modalImage.src = modalImages[modalPosition];
            modalImage.style.marginTop = calculateMarginTop(modalImage);
        }
    }
}

const modal = document.querySelector('.modal')
modal.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
})

modal.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    checkDirection()
})