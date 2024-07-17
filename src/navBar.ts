import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

let enableTransparency: boolean = true;
let topOfPage: boolean = true;
let flowbiteCollapse: CollapseInterface = null;

export function initializeNavbar() {
    let pixelAnchor: HTMLElement = document.getElementById("top-of-site-pixel-anchor") as HTMLElement;

    flowbiteCollapse = initializeFlowbiteNavbar();
    if (pixelAnchor != null) {
        console.log("pixel anchor exists, enabling transparency");
        enableTransparency = true 
        initializeIntersectionObserver();
    } else {
        console.log("pixel anchor does not exist, removing")
        enableTransparency = false 
        setNavbarSlate();
    }
}

function initializeFlowbiteNavbar(): CollapseInterface {
    const $targetEl:  HTMLElement = document.getElementById("navbar-hamburger") as HTMLElement;

    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl: HTMLElement = document.getElementById('navbar-button') as HTMLElement;

    // optional options with default values and callback functions
    const options: CollapseOptions = {
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
        onToggle: () => {   console.log('element has been toggled');    },
    };

    const instanceOptions: InstanceOptions = {        
        id: 'targetEl',
        override: true,
    };
    const collapse: CollapseInterface = new Collapse($targetEl, $triggerEl, options, instanceOptions);
    return collapse;
}

function initializeIntersectionObserver(): void {
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
function updateNavbarBackgroundColor(): void {
    if (enableTransparency) {
        if (topOfPage) setNavbarTransparent();
        else setNavbarSlate();
    }
}

function setNavbarTransparent(): void {
    document.getElementById("navbar").classList.add("bg-transparent");
    document.getElementById("navbar").classList.remove("bg-slate-950");
}
function setNavbarSlate() {
    document.getElementById("navbar").classList.add("bg-slate-950");
    document.getElementById("navbar").classList.remove("bg-transparent");
}
