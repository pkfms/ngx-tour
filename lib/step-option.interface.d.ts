import { IStepOption } from 'ngx-tour-core';
import { TourPlacementArray } from './placement.interface';
export interface INgbStepOption extends IStepOption {
    placement?: TourPlacementArray;
    /** Display a backdrop, highlighting the tour anchor element */
    enableBackdrop?: boolean;
    /** This step requires a user action (like clicking the tour anchor element), and does not display a next button */
    actionRequired?: boolean;
}
