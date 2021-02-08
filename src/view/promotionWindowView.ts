// import { Name, Side } from '../types';
//
// export type PromotionWindowView = {
//     side: Side;
//     switchFigures(event): void;
// };
//
// export const promotionWindowView = () => {
//     const typePiece = [Name.QUEEN, Name.ROOK, Name.KNIGHT, Name.BISHOP];
//     const promotionWindowList = document.createElement('ul');
//     promotionWindowList.className = 'promotionWindowList';
//     for (const piece of typePiece) {
//         const promotionWindowListIcon = document.createElement('li');
//         promotionWindowListIcon.className = 'promotionWindowListIcon';
//         promotionWindowList.appendChild(promotionWindowListIcon);
//
//         const promoteToNewPiece = document.createElement('i');
//         promoteToNewPiece.className = `fas fa-chess-${piece} ${side}`;
//         promoteToNewPiece.id = `${piece}`;
//         promotionWindowListIcon.appendChild(promoteToNewPiece);
//         promoteToNewPiece.addEventListener('click', (event) => {
//             switchFigures(event);
//         });
//     }
//     const promotionWindow = document.createElement('div');
//     const text = document.createTextNode('Pick promoted figure:');
//     const promoTitle = document.createElement('div');
//     promoTitle.className = 'promoTitle';
//     promoTitle.appendChild(text);
//     promotionWindow.appendChild(promoTitle);
//     promotionWindow.className = 'promotionWindow';
//     promotionWindow.appendChild(promotionWindowList);
//     return promotionWindow;
// };
