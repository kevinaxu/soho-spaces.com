import { Carousel, Modal } from 'flowbite';
import type { CarouselItem, CarouselOptions, CarouselInterface, IndicatorItem } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite'
import type { InstanceOptions } from 'flowbite';

export function initializeCarousel() {
    const $carouselElement: HTMLElement = document.getElementsByClassName('js-photo-carousel')[0] as HTMLElement;
    if (!$carouselElement) {
        return; 
    }
    const $photoGridElement: HTMLElement  = document.getElementsByClassName('js-photo-grid')[0] as HTMLElement;
    const $modalElement: HTMLElement      = document.getElementsByClassName('js-photo-carousel-modal')[0] as HTMLElement;

    // Step 2: Initialize Flowbite components
    const flowbiteCarousel: CarouselInterface   = initializeFlowbiteCarousel($carouselElement);
    const flowbiteModal: ModalInterface         = initializeFlowbiteModal($modalElement);

    // Step 3: Bind event listeners (Carousel <> Flowbite Carousel, Thumbnails <> Flowbite Modal)
    bindCarouselEventListeners($carouselElement, flowbiteCarousel);
    bindPhotoGridEventListeners($photoGridElement, flowbiteModal, flowbiteCarousel);
    bindSwipeGestureEventListeners($carouselElement, flowbiteCarousel);
    bindModalCloseEventListeners($modalElement, flowbiteModal);
}

/**
 * Binds Image Carousel event listeners to both Photo Grid Mobile / Desktop
 */
function bindPhotoGridEventListeners($photoGridElement: HTMLElement, flowbiteModal: ModalInterface, flowbiteCarousel: CarouselInterface) {
    const imgElements: HTMLImageElement[] = Array.from($photoGridElement.querySelectorAll('img'));
    const numPhotos: number = imgElements.length / 2;
    const desktopImg: HTMLImageElement[]    = imgElements.slice(0, numPhotos);
    const mobileImg: HTMLImageElement[]     = imgElements.slice(numPhotos);

    for (let i = 0; i < numPhotos; i++) {
        desktopImg[i].addEventListener('click', function() {
            console.log("clicked on desktop flowbiteCarousel");
            flowbiteCarousel.slideTo(i);
            flowbiteModal.show();
        });
        mobileImg[i].addEventListener('click', function() {
            console.log("clicked on mobile flowbiteCarousel");
            flowbiteCarousel.slideTo(i);
            flowbiteModal.show();
        });
    }
}

/**
 * Binds event listeners to the previous and next buttons of a carousel element.
 */
function bindCarouselEventListeners($carouselElement: HTMLElement, flowbiteCarousel: CarouselInterface) {
    const $prevButton = $carouselElement.querySelectorAll('[data-id=data-carousel-prev]')[0]; 
    const $nextButton = $carouselElement.querySelectorAll('[data-id=data-carousel-next]')[0]; 
    $prevButton.addEventListener('click', () => {
        flowbiteCarousel.prev();
    });
    $nextButton.addEventListener('click', () => {
        flowbiteCarousel.next();
    });
}

const SWIPE_THRESHOLD = 25;
let touch = { startX: 0, startY: 0, endX: 0, endY: 0 };

/**
 * Binds swipe gesture event listeners to the carousel element.
 * 
 */
function bindSwipeGestureEventListeners($carouselElement: HTMLElement, flowbiteCarousel: CarouselInterface) {
    $carouselElement.addEventListener('touchstart', function(e) {
        touch.startX = e.changedTouches[0].screenX
        touch.startY = e.changedTouches[0].screenY
    });
    $carouselElement.addEventListener('touchend', function(e) {
        touch.endX = e.changedTouches[0].screenX
        touch.endY = e.changedTouches[0].screenY

        if (isSwipeRight())     flowbiteCarousel.prev();
        if (isSwipeLeft())      flowbiteCarousel.next();
    })
}

/**
 * Binds event listeners to the close button of a modal element.
 */
function bindModalCloseEventListeners($modalElement: HTMLElement, flowbiteModal: ModalInterface) {
    const $closeButton = $modalElement.querySelectorAll('.modal-close')[0];
    $closeButton.addEventListener('click', () => {
        flowbiteModal.hide();
    });
}

function initializeFlowbiteModal($modalElement: HTMLElement): ModalInterface {
    const modalOptions: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
            'fixed inset-0 z-40',
        closable: true,
        onHide:      () => { console.log('modal is hidden'); },
        onShow:      () => { console.log('modal is shown'); },
        onToggle:    () => { console.log('modal has been toggled'); },
    };

    const instanceOptions: InstanceOptions = {
        override: true
    };
    const modal: ModalInterface = new Modal($modalElement, modalOptions, instanceOptions);
    return modal;
}

/**
 * Initializes a Flowbite carousel.
 */
function initializeFlowbiteCarousel($carouselElement: HTMLElement): CarouselInterface {

    let numImages: number = $carouselElement.getElementsByTagName('img').length;
    let indicators: IndicatorItem[] = []; 
    let items: CarouselItem[] = []

    for (let i = 0; i < numImages; i++) {
        items.push({
            position:   i,
            el:         $carouselElement.querySelector(`[data-id=carousel-item-${i}]`) 
        });
        indicators.push({
            position:   i,
            el:         $carouselElement.querySelector(`[data-id=carousel-indicator-${i}]`) 
        })
    }

    const options: CarouselOptions = {
        defaultPosition: 1,
        interval: 3000,
        indicators: {
            activeClasses: 'bg-gray-500',
            inactiveClasses:
                'bg-gray-800',
            items: indicators,
        },

        onNext:     () => { console.log('next slider item is shown'); },
        onPrev:     () => { console.log('previous slider item is shown'); },
        onChange:   () => { console.log('new slider item has been shown'); },    
    };

    const instanceOptions: InstanceOptions = {
        override: false
    };
    const carousel: CarouselInterface = new Carousel($carouselElement, items, options, instanceOptions);
    return carousel;
}

/**
 * Check swipe gesture directions
 */
function isSwipeRight() {
    const distX = Math.abs(touch.endX - touch.startX);
    return (touch.endX > touch.startX && distX > SWIPE_THRESHOLD);
}
function isSwipeLeft() {
    const distX = Math.abs(touch.endX - touch.startX);
    return (touch.endX < touch.startX && distX > SWIPE_THRESHOLD);
}
