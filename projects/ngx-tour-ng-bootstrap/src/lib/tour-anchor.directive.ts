import { Directive, ElementRef, Host, HostBinding, Inject, Input } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { NgbPopover, Placement } from '@ng-bootstrap/ng-bootstrap';
import { TourAnchorDirective, TourState } from 'ngx-tour-core';
import { NgbTourService } from './ng-bootstrap-tour.service';
import { INgbStepOption } from './step-option.interface';
import { TourStepTemplateService } from './tour-step-template.service';
import { TourBackdropService } from './tour-backdrop.service';

@Directive({ selector: '[tourAnchor]' })
export class TourAnchorNgBootstrapPopoverDirective extends NgbPopover { }

@Directive({
  selector: '[tourAnchor]',
})
export class TourAnchorNgBootstrapDirective implements OnInit, OnDestroy, TourAnchorDirective {
  private tourWindowClass = 'ngx-tour-window';
  private document: Document;

  @Input() public tourAnchor: string;

  @HostBinding('class.touranchor--is-active')
  public isActive: boolean;

  private get tourWindow(): HTMLElement {
    return this.document.getElementsByClassName(this.tourWindowClass).item(0) as HTMLElement;
  }

  constructor(
    private element: ElementRef,
    private tourService: NgbTourService,
    private tourStepTemplate: TourStepTemplateService,
    private tourBackdrop: TourBackdropService,
    @Host() private popoverDirective: TourAnchorNgBootstrapPopoverDirective,
    @Inject(DOCUMENT) private doc?: any
  ) {
    this.document = doc;

    this.popoverDirective.autoClose = false;
    this.popoverDirective.triggers = '';
    this.popoverDirective.popoverClass = this.tourWindowClass;
    this.popoverDirective.toggle = () => { };
  }

  public ngOnInit(): void {
    this.tourService.register(this.tourAnchor, this);
  }

  public ngOnDestroy(): void {
    this.tourService.unregister(this.tourAnchor);
  }

  public showTourStep(step: INgbStepOption): void {
    this.isActive = true;
    this.popoverDirective.ngbPopover = this.tourStepTemplate.template;
    this.popoverDirective.popoverTitle = step.title;
    this.popoverDirective.container =  'body';
    this.popoverDirective.placement = <Placement>(step.placement || 'top')
      .replace('before', 'left').replace('after', 'right')
      .replace('below', 'bottom').replace('above', 'top');
    step.prevBtnTitle = step.prevBtnTitle || 'Prev';
    step.nextBtnTitle = step.nextBtnTitle || 'Next';
    step.endBtnTitle = step.endBtnTitle || 'End';

    // Scroll the tour window into view after ngbPopover is opened
    this.popoverDirective.shown.subscribe(() => {
      if (!step.preventScrolling) {
        (<HTMLElement>this.element.nativeElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Open the tour window
    this.popoverDirective.open({ step });

    // Set a backdrop that highlights the tour anchor element or a custom input element
    if (step.enableBackdrop) {
      this.tourBackdrop.show(this.element);
      // Adjust the backdrop position on scroll
      fromEvent(window, 'scroll').pipe(
        takeUntil(this.tourService.stepHide$),
        tap(() => {
          this.tourBackdrop.close();
          this.tourBackdrop.show(this.element);
        })
      ).subscribe();
    } else {
      this.tourBackdrop.close();
    }
  }

  public hideTourStep(): void {
    this.isActive = false;
    this.popoverDirective.close();
    if (this.tourService.getStatus() === TourState.OFF) {
      this.tourBackdrop.close();
    }
  }
}
