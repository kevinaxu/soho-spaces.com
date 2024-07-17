/**
 * Binds event listeners for a before-after element.
 */
export function initializeBeforeAfterComponent() {
    const $beforeAfterElement: HTMLElement    = document.getElementsByClassName("before-after-slider")[0] as HTMLElement;
    if (!$beforeAfterElement) {
        return; 
    }
    const $beforeImageContainer: HTMLElement = $beforeAfterElement.getElementsByClassName('before-image')[0] as HTMLElement;
    const $beforeImageElement: HTMLImageElement = $beforeImageContainer.getElementsByTagName('img')[0] as HTMLImageElement;
    const $resizerElement: HTMLElement = $beforeAfterElement.getElementsByClassName('resizer')[0] as HTMLElement;

    // The active variable is likely used to track whether the slider is currently being interacted with.
    let active: boolean = false;

    // Sort overflow out for Overlay Image
    let width: number = $beforeAfterElement.offsetWidth;
    $beforeImageElement.style.width = width + 'px';

    // Adjust width of image on resize 
    window.addEventListener('resize', function () {
        let width: number = $beforeAfterElement.offsetWidth;
        $beforeImageElement.style.width = width + 'px';
    })

    $resizerElement.addEventListener('mousedown',   () => active = true);
    $resizerElement.addEventListener('touchstart',  () => active = true);
    $beforeAfterElement.addEventListener('mouseup',      () => active = false);
    $beforeAfterElement.addEventListener('mouseleave',   () => active = false);
    $beforeAfterElement.addEventListener('touchend',     () => active = false);
    $beforeAfterElement.addEventListener('touchcancel',  () => active = false);
    
    $beforeAfterElement.addEventListener('mousemove', function (e: MouseEvent) {
        if (!active) return;
        let x: number = e.pageX;
        x -= $beforeAfterElement.getBoundingClientRect().left;
        sliderDivider(x);
        pauseEvent(e);
    });

    // Touch support for mobile devices
    $beforeAfterElement.addEventListener('touchmove', function (e: TouchEvent) {
        if (!active) return;
        let x: number;
        for (let i = 0; i < e.changedTouches.length; i++) {
            x = e.changedTouches[i].pageX;
        }
        x -= $beforeAfterElement.getBoundingClientRect().left;
        sliderDivider(x);
        pauseEvent(e);
    });

    function sliderDivider(x: number) {
        let transform: number = Math.max(0, (Math.min(x, $beforeAfterElement.offsetWidth)));
        $beforeImageContainer.style.width = transform + "px";
        $resizerElement.style.left = transform - 0 + "px";
    }

    function pauseEvent(e: Event): boolean {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}
