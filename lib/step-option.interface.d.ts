import { IStepOption } from 'ngx-tour-core';
import { Placement } from '@ng-bootstrap/ng-bootstrap';
declare type StepPlacement = Placement | 'after' | 'after-top' | 'after-bottom' | 'top-after' | 'top-before' | 'bottom-after' | 'bottom-before' | 'before' | 'before-top' | 'before-bottom' | 'below' | 'above';
export interface INgbStepOption extends IStepOption {
    placement?: StepPlacement;
    /** Display a backdrop, highlighting the tour anchor element */
    enableBackdrop?: boolean;
    /** This step requires a user action (like clicking the tour anchor element), and does not display a next button */
    actionRequired?: boolean;
}
export {};
