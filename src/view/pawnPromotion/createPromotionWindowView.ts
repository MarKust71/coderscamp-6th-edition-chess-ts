import { Coordinates, Name, Side } from '../../app/types';

import { createPromoCover } from './createPromoCover';
import { appendPromoCover } from './appendPromoCover';
import { SwitchPieces } from './types';

export const createPromotionWindowView = (
    switchPieces: (params: SwitchPieces) => void,
    coordinates: Coordinates,
    side: Side,
) => {
    const promoCover = createPromoCover();
    appendPromoCover(promoCover);

    const promotionWindow = document.createElement('div');

    const typePiece = [Name.QUEEN, Name.ROOK, Name.KNIGHT, Name.BISHOP];
    const promotionWindowList = document.createElement('ul');
    promotionWindowList.className = 'promotionWindowList';
    for (const piece of typePiece) {
        const promotionWindowListIcon = document.createElement('li');
        promotionWindowListIcon.className = 'promotionWindowListIcon';
        promotionWindowList.appendChild(promotionWindowListIcon);

        const promoteToNewPiece = document.createElement('i');
        promoteToNewPiece.className = `fas fa-chess-${piece} ${side}`;
        promoteToNewPiece.id = `${piece}`;
        promotionWindowListIcon.appendChild(promoteToNewPiece);
        promoteToNewPiece.addEventListener('click', ({ currentTarget }: MouseEvent) => {
            const { id } = currentTarget as HTMLAreaElement;
            switchPieces({ id, coordinates, side, promoCover, promotionWindow });
        });
    }
    const text = document.createTextNode('Pick promoted figure:');
    const promoTitle = document.createElement('div');
    promoTitle.className = 'promoTitle';
    promoTitle.appendChild(text);
    promotionWindow.appendChild(promoTitle);
    promotionWindow.className = 'promotionWindow';
    promotionWindow.appendChild(promotionWindowList);

    return promotionWindow;
};
