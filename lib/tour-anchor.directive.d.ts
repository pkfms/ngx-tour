import { OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TourAnchorDirective } from 'ngx-tour-core';
import { NgbTourService } from './ng-bootstrap-tour.service';
import { INgbStepOption } from './step-option.interface';
import { TourStepTemplateService } from './tour-step-template.service';
import { TourBackdropService } from './tour-backdrop.service';
export declare class TourAnchorNgBootstrapPopoverDirective extends NgbPopover {
}
export declare class TourAnchorNgBootstrapDirective implements OnDestroy, AfterViewInit, TourAnchorDirective {
    private element;
    private scrollService;
    private tourService;
    private tourStepTemplate;
    private tourBackdrop;
    private popoverDirective;
    private doc?;
    private tourWindowClass;
    private document;
    private step;
    tourAnchor: string;
    focusedElement: ElementRef<HTMLElement>;
    isActive: boolean;
    constructor(element: ElementRef, scrollService: ScrollDispatcher, tourService: NgbTourService, tourStepTemplate: TourStepTemplateService, tourBackdrop: TourBackdropService, popoverDirective: TourAnchorNgBootstrapPopoverDirective, doc?: any);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    showTourStep(step: INgbStepOption): void;
    hideTourStep(): void;
    /** Open the tour window with ngb-popover */
    private openTourWindow;
    /** Set a backdrop that highlights the tour anchor element or a custom input element */
    private setBackdrop;
}
