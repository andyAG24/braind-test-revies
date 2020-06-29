"use strict";

let numericalRating = $('.rating__numerical-rating');

for (let elem of numericalRating) {
    let rating = Number.parseFloat($(elem).text());
    
    let integerStars = Math.floor(rating),
        roundingToBig = Math.ceil(rating),
        fraction = rating - integerStars;
    
    let parentElement = elem.parentElement;
    let starWrapper = $(parentElement).children('.rating__stars').children('.rating__star-wrapper');
    
    let index = 0,
        width;
    while (index < roundingToBig) {
        if ((index >= integerStars) && (fraction != 0)) {
            width = Math.asin( 2 * fraction - 1 ) / Math.PI + 0.5;
            fillStar(starWrapper[index], width * 100);
        } else {
            width = 100;
            fillStar(starWrapper[index], width);
        }
        index++;
  }
}

function fillStar(starWrapper, width) {
    let star = $(starWrapper).children('.rating__star_active');
    $(star).css('width', `${width}%`);
}