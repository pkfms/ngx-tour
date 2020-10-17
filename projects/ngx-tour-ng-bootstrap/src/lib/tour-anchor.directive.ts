import { OnDestroy, AfterViewInit, Directive, ElementRef, Host, HostBinding, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
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
export class TourAnchorNgBootstrapDirective implements OnDestroy, AfterViewInit, TourAnchorDirective {
  private tourWindowClass = 'ngx-tour-window';
  private document: Document;
  private step: INgbStepOption;

  @Input() public tourAnchor: string;
  @Input() public focusedElement: ElementRef<HTMLElement>;

  @HostBinding('class.touranchor--is-active')
  public isActive: boolean;

  /* private get tourWindow(): HTMLElement {
    return this.document.getElementsByClassName(this.tourWindowClass).item(0) as HTMLElement;
  } */

  constructor(
    private element: ElementRef,
    private scrollService: ScrollDispatcher,
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

  public ngAfterViewInit(): void {
    this.tourService.register(this.tourAnchor, this);
  }

  public ngOnDestroy(): void {
    this.tourService.unregister(this.tourAnchor);
  }

  public showTourStep(step: INgbStepOption): void {
    this.step = step;
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

    this.openTourWindow();
    this.setBackdrop();
  }

  public hideTourStep(): void {
    this.step = null;
    this.isActive = false;
    this.popoverDirective.close();
    if (this.tourService.getStatus() === TourState.OFF) {
      this.tourBackdrop.close();
    }
  }

  /** Open the tour window with ngb-popover */
  private openTourWindow(): void {
    // Scroll the tour window into view after ngbPopover is opened
    this.popoverDirective.shown.subscribe(() => {
      if (!this.step.preventScrolling) {
        (<HTMLElement>this.element.nativeElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
      }
    });

    this.popoverDirective.open({ step: this.step });
  }

  /** Set a backdrop that highlights the tour anchor element or a custom input element */
  private setBackdrop(): void {
    const targetElement = this.focusedElement || this.element;

    if (this.step.enableBackdrop) {
      this.tourBackdrop.show(targetElement);
      // Adjust the backdrop position on scroll
      this.scrollService.ancestorScrolled(this.element, 0).pipe(
        takeUntil(this.tourService.stepHide$),
        tap(() => this.tourBackdrop.show(targetElement))
      ).subscribe();
    } else {
      this.tourBackdrop.close();
    }
  }
}
