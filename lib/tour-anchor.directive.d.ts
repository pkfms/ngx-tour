import { ElementRef } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TourAnchorDirective } from 'ngx-tour-core';
import { NgbTourService } from './ng-bootstrap-tour.service';
import { INgbStepOption } from './step-option.interface';
import { TourStepTemplateService } from './tour-step-template.service';
import { TourBackdropService } from './tour-backdrop.service';
export declare class TourAnchorNgBootstrapPopoverDirective extends NgbPopover {
}
export declare class TourAnchorNgBootstrapDirective implements OnInit, OnDestroy, TourAnchorDirective {
    private element;
    private tourService;
    private tourStepTemplate;
    private tourBackdrop;
    private popoverDirective;
    private doc?;
    private tourWindowClass;
    private document;
    tourAnchor: string;
    isActive: boolean;
    get tourWindow(): HTMLElement;
    constructor(element: ElementRef, tourService: NgbTourService, tourStepTemplate: TourStepTemplateService, tourBackdrop: TourBackdropService, popoverDirective: TourAnchorNgBootstrapPopoverDirective, doc?: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    showTourStep(step: INgbStepOption): void;
    hideTourStep(): void;
}
