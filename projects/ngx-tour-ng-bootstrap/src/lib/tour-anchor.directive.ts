import { OnDestroy, AfterViewInit, Directive, ElementRef, Host, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { fromEvent } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
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
  private step: INgbStepOption;

  @Input() public tourAnchor: string;
  @Input() public focusedElement: ElementRef<HTMLElement>;
  @Output('tourAnchorClick') public click: EventEmitter<void> = new EventEmitter();

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
    @Host() private popover: TourAnchorNgBootstrapPopoverDirective
  ) {
    this.popover.autoClose = false;
    this.popover.triggers = '';
    this.popover.popoverClass = this.tourWindowClass;
    this.popover.toggle = () => { };
  }

  public ngAfterViewInit(): void {
    this.tourService.register(this.tourAnchor, this);
  }

  public ngOnDestroy(): void {
    this.tourService.unregister(this.tourAnchor);
    this.click.complete();
  }

  public showTourStep(step: INgbStepOption): void {
    this.step = step;
    this.isActive = true;
    this.popover.ngbPopover = this.tourStepTemplate.template;
    this.popover.popoverTitle = step.title;
    this.popover.container = 'body';
    this.popover.placement = step.placement || 'auto';
    step.prevBtnTitle = step.prevBtnTitle || 'Prev';
    step.nextBtnTitle = step.nextBtnTitle || 'Next';
    step.endBtnTitle = step.endBtnTitle || 'End';

    this.openTourWindow();
    this.setBackdrop();
  }

  public hideTourStep(): void {
    this.step = null;
    this.isActive = false;
    this.popover.close();
    if (this.tourService.getStatus() === TourState.OFF) {
      this.tourBackdrop.close();
    }
  }

  /** Open the tour window with ngb-popover */
  private openTourWindow(): void {
    // Scroll the tour window into view after ngbPopover is opened
    this.popover.shown.pipe(
      takeUntil(this.tourService.stepHide$)
    ).subscribe(() => {
      if (!this.step.preventScrolling) {
        (<HTMLElement>this.element.nativeElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
      }
    });

    if (this.popover.isOpen()) {
      this.popover.hidden.pipe(
        take(1),
        tap(() => this.popover.open({ step: this.step }))
      ).subscribe();
    } else {
      this.popover.open({ step: this.step });
    }
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

      if (this.click.observers.length) {
        this.tourBackdrop.backdropElement.classList.add('clickable');
      }

      fromEvent(this.tourBackdrop.backdropElement, 'click').pipe(
        tap(() => this.click.next())
      ).subscribe();
    } else {
      this.tourBackdrop.close();
    }
  }
}
