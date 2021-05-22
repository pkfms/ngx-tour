import { Component, HostListener } from '@angular/core';
import { TourService, TourState } from './tour.service';
export class TourHotkeyListenerComponent {
    constructor(tourService) {
        this.tourService = tourService;
    }
    /**
     * Configures hot keys for controlling the tour with the keyboard
     */
    onEscapeKey() {
        if (this.tourService.getStatus() === TourState.ON &&
            this.tourService.isHotkeysEnabled()) {
            this.tourService.end();
        }
    }
    onArrowRightKey() {
        if (this.tourService.getStatus() === TourState.ON &&
            this.tourService.hasNext(this.tourService.currentStep) &&
            this.tourService.isHotkeysEnabled()) {
            this.tourService.next();
        }
    }
    onArrowLeftKey() {
        if (this.tourService.getStatus() === TourState.ON &&
            this.tourService.hasPrev(this.tourService.currentStep) &&
            this.tourService.isHotkeysEnabled()) {
            this.tourService.prev();
        }
    }
}
TourHotkeyListenerComponent.decorators = [
    { type: Component, args: [{
                selector: 'tour-hotkey-listener',
                template: `<ng-content></ng-content>`
            },] }
];
TourHotkeyListenerComponent.ctorParameters = () => [
    { type: TourService }
];
TourHotkeyListenerComponent.propDecorators = {
    onEscapeKey: [{ type: HostListener, args: ['window:keydown.Escape',] }],
    onArrowRightKey: [{ type: HostListener, args: ['window:keydown.ArrowRight',] }],
    onArrowLeftKey: [{ type: HostListener, args: ['window:keydown.ArrowLeft',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1ob3RrZXktbGlzdGVuZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXRvdXItY29yZS9zcmMvbGliL3RvdXItaG90a2V5LWxpc3RlbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTXhELE1BQU0sT0FBTywyQkFBMkI7SUFDdEMsWUFBbUIsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDO0lBRS9DOztPQUVHO0lBRUksV0FBVztRQUNoQixJQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssU0FBUyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUNuQztZQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBR00sZUFBZTtRQUNwQixJQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssU0FBUyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUNuQztZQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBR00sY0FBYztRQUNuQixJQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssU0FBUyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUNuQztZQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7OztZQUxRLFdBQVc7OzswQkFZakIsWUFBWSxTQUFDLHVCQUF1Qjs4QkFVcEMsWUFBWSxTQUFDLDJCQUEyQjs2QkFXeEMsWUFBWSxTQUFDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRvdXJTZXJ2aWNlLCBUb3VyU3RhdGUgfSBmcm9tICcuL3RvdXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RvdXItaG90a2V5LWxpc3RlbmVyJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBUb3VySG90a2V5TGlzdGVuZXJDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdG91clNlcnZpY2U6IFRvdXJTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGhvdCBrZXlzIGZvciBjb250cm9sbGluZyB0aGUgdG91ciB3aXRoIHRoZSBrZXlib2FyZFxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uRXNjYXBlJylcbiAgcHVibGljIG9uRXNjYXBlS2V5KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMudG91clNlcnZpY2UuZ2V0U3RhdHVzKCkgPT09IFRvdXJTdGF0ZS5PTiAmJlxuICAgICAgdGhpcy50b3VyU2VydmljZS5pc0hvdGtleXNFbmFibGVkKClcbiAgICApIHtcbiAgICAgIHRoaXMudG91clNlcnZpY2UuZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uQXJyb3dSaWdodCcpXG4gIHB1YmxpYyBvbkFycm93UmlnaHRLZXkoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50b3VyU2VydmljZS5nZXRTdGF0dXMoKSA9PT0gVG91clN0YXRlLk9OICYmXG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLmhhc05leHQodGhpcy50b3VyU2VydmljZS5jdXJyZW50U3RlcCkgJiZcbiAgICAgIHRoaXMudG91clNlcnZpY2UuaXNIb3RrZXlzRW5hYmxlZCgpXG4gICAgKSB7XG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5BcnJvd0xlZnQnKVxuICBwdWJsaWMgb25BcnJvd0xlZnRLZXkoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50b3VyU2VydmljZS5nZXRTdGF0dXMoKSA9PT0gVG91clN0YXRlLk9OICYmXG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLmhhc1ByZXYodGhpcy50b3VyU2VydmljZS5jdXJyZW50U3RlcCkgJiZcbiAgICAgIHRoaXMudG91clNlcnZpY2UuaXNIb3RrZXlzRW5hYmxlZCgpXG4gICAgKSB7XG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLnByZXYoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==