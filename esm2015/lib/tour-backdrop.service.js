import { Injectable, RendererFactory2 } from '@angular/core';
export class TourBackdropService {
    constructor(rendererFactory) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    get backdropElement() {
        return this._backdropElement;
    }
    show(targetElement) {
        const boundingRect = targetElement.nativeElement.getBoundingClientRect();
        if (!this._backdropElement) {
            this._backdropElement = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropElement, 'ngx-tour_backdrop');
            this.renderer.appendChild(document.body, this.backdropElement);
        }
        this.setStyles(boundingRect, targetElement.nativeElement);
    }
    close() {
        if (this._backdropElement) {
            this.renderer.removeChild(document.body, this._backdropElement);
            this._backdropElement = null;
        }
    }
    setStyles(boundingRect, targetElement) {
        const borderRadius = getComputedStyle(targetElement).borderRadius;
        const styles = {
            position: 'fixed',
            width: boundingRect.width + 'px',
            height: boundingRect.height + 'px',
            top: boundingRect.top + 'px',
            left: boundingRect.left + 'px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
            zIndex: '100',
            borderRadius: borderRadius
        };
        for (const name of Object.keys(styles)) {
            this.renderer.setStyle(this._backdropElement, name, styles[name]);
        }
    }
}
TourBackdropService.decorators = [
    { type: Injectable }
];
TourBackdropService.ctorParameters = () => [
    { type: RendererFactory2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1iYWNrZHJvcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L3NvdXJjZS9yZXBvcy9uZ3gtdG91ci9wcm9qZWN0cy9uZ3gtdG91ci1uZy1ib290c3RyYXAvc3JjLyIsInNvdXJjZXMiOlsibGliL3RvdXItYmFja2Ryb3Auc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpFLE1BQU0sT0FBTyxtQkFBbUI7SUFROUIsWUFBWSxlQUFpQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFORCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQU1NLElBQUksQ0FBQyxhQUF5QjtRQUNuQyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFekUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVPLFNBQVMsQ0FBQyxZQUFxQixFQUFFLGFBQTBCO1FBQ2pFLE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUVsRSxNQUFNLE1BQU0sR0FBRztZQUNiLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUk7WUFDaEMsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSTtZQUNsQyxHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsR0FBRyxJQUFJO1lBQzVCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUk7WUFDOUIsU0FBUyxFQUFFLGlDQUFpQztZQUM1QyxNQUFNLEVBQUUsS0FBSztZQUNiLFlBQVksRUFBRSxZQUFZO1NBQzNCLENBQUM7UUFFRixLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuRTtJQUNILENBQUM7OztZQWpERixVQUFVOzs7WUFIc0IsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgUmVuZGVyZXJGYWN0b3J5MiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvdXJCYWNrZHJvcFNlcnZpY2Uge1xuICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgX2JhY2tkcm9wRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgZ2V0IGJhY2tkcm9wRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2JhY2tkcm9wRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gIH1cblxuICBwdWJsaWMgc2hvdyh0YXJnZXRFbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGFyZ2V0RWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKCF0aGlzLl9iYWNrZHJvcEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2JhY2tkcm9wRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuYmFja2Ryb3BFbGVtZW50LCAnbmd4LXRvdXJfYmFja2Ryb3AnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3R5bGVzKGJvdW5kaW5nUmVjdCwgdGFyZ2V0RWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5fYmFja2Ryb3BFbGVtZW50KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuX2JhY2tkcm9wRWxlbWVudCk7XG4gICAgICB0aGlzLl9iYWNrZHJvcEVsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0U3R5bGVzKGJvdW5kaW5nUmVjdDogRE9NUmVjdCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldEVsZW1lbnQpLmJvcmRlclJhZGl1cztcblxuICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgd2lkdGg6IGJvdW5kaW5nUmVjdC53aWR0aCArICdweCcsXG4gICAgICBoZWlnaHQ6IGJvdW5kaW5nUmVjdC5oZWlnaHQgKyAncHgnLFxuICAgICAgdG9wOiBib3VuZGluZ1JlY3QudG9wICsgJ3B4JyxcbiAgICAgIGxlZnQ6IGJvdW5kaW5nUmVjdC5sZWZ0ICsgJ3B4JyxcbiAgICAgIGJveFNoYWRvdzogJzAgMCAwIDk5OTlweCByZ2JhKDAsIDAsIDAsIDAuNyknLFxuICAgICAgekluZGV4OiAnMTAwJyxcbiAgICAgIGJvcmRlclJhZGl1czogYm9yZGVyUmFkaXVzXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhzdHlsZXMpKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2JhY2tkcm9wRWxlbWVudCwgbmFtZSwgc3R5bGVzW25hbWVdKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==