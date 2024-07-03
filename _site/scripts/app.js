

/**********************************************
 * 
 * Navbar Component 
 * 
 *********************************************/

function initializeNavbar() {
    // check if there is an element named 
    pixelAnchor = document.getElementById("top-of-site-pixel-anchor");
    navbar = document.getElementById("navbar");
    console.log("navbar", navbar)

    if (pixelAnchor != null) {
        console.log("found top-of-site-pixel-anchor")
        enableTransparency = true 
        initializeIntersectionObserver();
    } else {
        enableTransparency = false 
        setNavbarSlate();
    }
}

function collapseNavbar() {
    flowbiteCarousel.collapse();
}

function initializeFlowbiteNavbar() {
    const $targetEl = document.getElementById("navbar-hamburger");

    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl = document.getElementById('navbar-button');

    // optional options with default values and callback functions
    const options = {
        onCollapse: () => {
            console.log("collapsed navbar");
            document.body.classList.remove("overflow-hidden");
            updateNavbarBackgroundColor();
        },
        onExpand: () => {
            console.log("expanded navbar");
            document.body.classList.add("overflow-hidden");
            setNavbarSlate();
        },
        // onToggle: () => {   console.log('element has been toggled');    },
    };

    const instanceOptions = {
        id: 'targetEl',
        override: true,
    };
    const collapse = new Collapse($targetEl, $triggerEl, options, instanceOptions);
    return collapse;
}

function initializeIntersectionObserver() {
    if (
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
        let observer = new IntersectionObserver(entries => {
            if (entries[0].boundingClientRect.y < 0) {
                topOfPage = false;
                updateNavbarBackgroundColor();
            } else {
                topOfPage = true;
                updateNavbarBackgroundColor();            
            }
        });
        observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
    }
}

// if we're on Mobile, the background color is going to depend on where we are on the page AND whether the navbar is expanded or collapsed
// if the navbar is expanded, the background color is always going to be the same (bg-slate-950)
// if the navbar is collapsed,
//      if we're at the top of the page, the navbar will be trasnparent
//      if we're at further down the page (based on Intersection Observer), the navbar will be bg-slate-950
// if we're on Desktop, then backgrouhnd color is only determined by position on page
function updateNavbarBackgroundColor() {
    if (enableTransparency) {
        if (topOfPage) setNavbarTransparent();
        else setNavbarSlate();
    }
}

function setNavbarTransparent() {
    document.getElementById("navbar").classList.add("bg-transparent");
    document.getElementById("navbar").classList.remove("bg-slate-950");
}
function setNavbarSlate() {
    document.getElementById("navbar").classList.add("bg-slate-950");
    document.getElementById("navbar").classList.remove("bg-transparent");
}

/**********************************************
 * 
 * Main Runner Code  
 * 
 *********************************************/

let enableTransparency = true;
let topOfPage = true;
let flowbiteCarousel = null;

document.addEventListener('DOMContentLoaded', function () {
    initializeNavbar()
});