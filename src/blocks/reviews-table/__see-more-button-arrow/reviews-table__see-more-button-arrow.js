"use strict";

let seeMoreArrow = $('.reviews-table__see-more-button-arrow');

for (let elem of seeMoreArrow) {
    $(elem).bind('click', (event) => {
        event.target.parentElement.click();
    });
}