import { TourHotkeyListenerComponent } from 'ngx-tour-core';
import { TourStepTemplateService } from './tour-step-template.service';
import { Component, TemplateRef, ViewChild, ViewEncapsulation, Input, ContentChild } from '@angular/core';
import { NgbTourService } from './ng-bootstrap-tour.service';
export class TourStepTemplateComponent extends TourHotkeyListenerComponent {
    constructor(tourStepTemplateService, tourService) {
        super(tourService);
        this.tourStepTemplateService = tourStepTemplateService;
        this.tourService = tourService;
    }
    ngAfterContentInit() {
        this.tourStepTemplateService.template =
            this.stepTemplate ||
                this.stepTemplateContent ||
                this.defaultTourStepTemplate;
    }
}
TourStepTemplateComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'tour-step-template',
                template: `
    <ng-template #tourStep let-step="step">
      <p class="tour-step-content">{{ step?.content }}</p>
      <div class="tour-step-navigation">
        <button
          *ngIf="tourService.hasPrev(step)"
          class="btn btn-sm btn-default"
          (click)="tourService.prev()"
        >
          « {{ step?.prevBtnTitle }}
        </button>
        <button
          *ngIf="tourService.hasNext(step)"
          class="btn btn-sm btn-default"
          (click)="tourService.next()"
        >
          {{ step?.nextBtnTitle }} »
        </button>
        <button class="btn btn-sm btn-default" (click)="tourService.end()">
          {{ step?.endBtnTitle }}
        </button>
      </div>
    </ng-template>
  `
            },] }
];
TourStepTemplateComponent.ctorParameters = () => [
    { type: TourStepTemplateService },
    { type: NgbTourService }
];
TourStepTemplateComponent.propDecorators = {
    defaultTourStepTemplate: [{ type: ViewChild, args: ['tourStep', { read: TemplateRef, static: true },] }],
    stepTemplate: [{ type: Input }],
    stepTemplateContent: [{ type: ContentChild, args: [TemplateRef,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1zdGVwLXRlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9zb3VyY2UvcmVwb3Mvbmd4LXRvdXIvcHJvamVjdHMvbmd4LXRvdXItbmctYm9vdHN0cmFwL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90b3VyLXN0ZXAtdGVtcGxhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwyQkFBMkIsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBOEI3RCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsMkJBQTJCO0lBV3hFLFlBQ1UsdUJBQWdELEVBQ2pELFdBQTJCO1FBRWxDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUhYLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDakQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBR3BDLENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVE7WUFDbkMsSUFBSSxDQUFDLFlBQVk7Z0JBQ2pCLElBQUksQ0FBQyxtQkFBbUI7Z0JBQ3hCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUNqQyxDQUFDOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO2FBQ0Y7OztZQXZDUSx1QkFBdUI7WUFVdkIsY0FBYzs7O3NDQWdDcEIsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTsyQkFHekQsS0FBSztrQ0FHTCxZQUFZLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvdXJIb3RrZXlMaXN0ZW5lckNvbXBvbmVudCwgSVN0ZXBPcHRpb24gfSBmcm9tICduZ3gtdG91ci1jb3JlJztcbmltcG9ydCB7IFRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi90b3VyLXN0ZXAtdGVtcGxhdGUuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiVG91clNlcnZpY2UgfSBmcm9tICcuL25nLWJvb3RzdHJhcC10b3VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICd0b3VyLXN0ZXAtdGVtcGxhdGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdG91clN0ZXAgbGV0LXN0ZXA9XCJzdGVwXCI+XG4gICAgICA8cCBjbGFzcz1cInRvdXItc3RlcC1jb250ZW50XCI+e3sgc3RlcD8uY29udGVudCB9fTwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0b3VyLXN0ZXAtbmF2aWdhdGlvblwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgKm5nSWY9XCJ0b3VyU2VydmljZS5oYXNQcmV2KHN0ZXApXCJcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgIChjbGljayk9XCJ0b3VyU2VydmljZS5wcmV2KClcIlxuICAgICAgICA+XG4gICAgICAgICAgwqsge3sgc3RlcD8ucHJldkJ0blRpdGxlIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgKm5nSWY9XCJ0b3VyU2VydmljZS5oYXNOZXh0KHN0ZXApXCJcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgIChjbGljayk9XCJ0b3VyU2VydmljZS5uZXh0KClcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgc3RlcD8ubmV4dEJ0blRpdGxlIH19IMK7XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiIChjbGljayk9XCJ0b3VyU2VydmljZS5lbmQoKVwiPlxuICAgICAgICAgIHt7IHN0ZXA/LmVuZEJ0blRpdGxlIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUb3VyU3RlcFRlbXBsYXRlQ29tcG9uZW50IGV4dGVuZHMgVG91ckhvdGtleUxpc3RlbmVyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3RvdXJTdGVwJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBkZWZhdWx0VG91clN0ZXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc3RlcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7IHN0ZXA6IElTdGVwT3B0aW9uIH0+O1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpXG4gIHB1YmxpYyBzdGVwVGVtcGxhdGVDb250ZW50OiBUZW1wbGF0ZVJlZjx7IHN0ZXA6IElTdGVwT3B0aW9uIH0+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG91clN0ZXBUZW1wbGF0ZVNlcnZpY2U6IFRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlLFxuICAgIHB1YmxpYyB0b3VyU2VydmljZTogTmdiVG91clNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodG91clNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlLnRlbXBsYXRlID1cbiAgICAgIHRoaXMuc3RlcFRlbXBsYXRlIHx8XG4gICAgICB0aGlzLnN0ZXBUZW1wbGF0ZUNvbnRlbnQgfHxcbiAgICAgIHRoaXMuZGVmYXVsdFRvdXJTdGVwVGVtcGxhdGU7XG4gIH1cbn1cbiJdfQ==