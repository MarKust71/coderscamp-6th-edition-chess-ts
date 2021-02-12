import { Coordinates, Side } from '../../app/types';

export type SwitchPieces = {
    id: string;
    coordinates: Coordinates;
    side: Side;
    promoCover: HTMLDivElement;
    promotionWindow: HTMLDivElement;
};
