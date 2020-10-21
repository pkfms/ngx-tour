import { ElementRef, RendererFactory2 } from '@angular/core';
export declare class TourBackdropService {
    private renderer;
    private _backdropElement;
    get backdropElement(): HTMLElement;
    constructor(rendererFactory: RendererFactory2);
    show(targetElement: ElementRef): void;
    close(): void;
    private setStyles;
}
