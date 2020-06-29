
'use strict';
var size = 192,
    articleContent = $('.article-text'),
    fullArticles = [],
    croppedArticles = [];
    
var countOfCroppedArticles = 0;
for (let elem of articleContent) {
    let articleText  = $(elem).text();
    let croppedText;
    if (articleText.length > size) {
        fullArticles.push(articleText);
        countOfCroppedArticles++;
        croppedText = articleText.slice(0, size) + '...';
        croppedArticles.push(croppedText);
        $(elem).text(croppedText);

        elem.classList.add('collapsed');
    } else {
        let siblings = elem.parentElement.children;
        let siblingsArray = Array.prototype.slice.call(siblings);
        siblingsArray.forEach(element => {
            if ($(element).hasClass('reviews-table__see-more-button')) {
                $(element).remove();
            };
        });
    }
}

var seeMoreButton = $('.reviews-table__see-more-button_expand'),
    seeMoreButtonCollapse = $('.reviews-table__see-more-button_collapse');

for (let button of seeMoreButton) {
    $(button).bind('click', (event) => {
        let target = event.target;
        if ($(target).hasClass('reviews-table__see-more-button_expand')) {
            expandText(event);
            target.classList.remove('reviews-table__see-more-button_expand');
            target.classList.add('reviews-table__see-more-button_collapse');
        } else {
            collapseText(event); 
            target.classList.remove('reviews-table__see-more-button_collapse');
            target.classList.add('reviews-table__see-more-button_expand');
        }
    });
}

function expandText(ev) {
    let button = $('.reviews-table__see-more-button');
    let textBlock = ev.target.previousElementSibling;

    if ($(textBlock).hasClass('article-text collapsed')) {
        let index = button.index(ev.target);
        $(textBlock).text(fullArticles[index]);
        textBlock.classList.remove('collapsed');
        textBlock.classList.add('expanded');
    };
}

function collapseText(ev) {
    let button = $('.reviews-table__see-more-button');
    let textBlock = ev.target.previousElementSibling;

    if ($(textBlock).hasClass('article-text expanded')) {
        let index = button.index(ev.target);
        $(textBlock).text(croppedArticles[index]);
        textBlock.classList.add('collapsed');
        textBlock.classList.remove('expanded');
    };
}

if (document.documentElement.clientWidth <= 720) {
    let articleTitle = $('.article-text__addition-title');
    for (let elem of articleTitle) {
        let itemRow = elem.parentElement.parentElement;

        let row = document.createElement('th');
        row.classList = ['reviews-table__item-row__addition-title'];
        row.appendChild(elem);
        itemRow.append(row);
    }
}

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
let miniPhoto = $('.reviews-table__buyer-photo');

for (let elem of miniPhoto) {
    elem.onclick = (event) => {

        let modalContainer = document.createElement('div');
        modalContainer.classList.add('modal');

        let modalBackdropContainer = document.createElement('div');
        modalBackdropContainer.classList.add('modal');
        modalBackdropContainer.classList.add('modal__backdrop');
        
        modalContainer.append(modalBackdropContainer);

        let previewContainer = document.createElement('div');
        let img = document.createElement('img');
        let imgSrc = event.target.src;
        img.src = imgSrc;
        previewContainer.classList.add('photo-preview');
        previewContainer.append(img);
        modalContainer.append(previewContainer);


        let content = document.getElementsByClassName('content')[0];
        content.insertAdjacentHTML('beforebegin', modalContainer.outerHTML);

        initModalBackdropFunc();
    }
}

function initModalBackdropFunc() {
    let modalBackdrop = document.getElementsByClassName('modal modal__backdrop')[0];
    if (modalBackdrop) {
        modalBackdrop.onclick = () => {
            closeModal();
        }
    }
}

function closeModal() {
    let modalBackdropContainer = $('.modal');
    modalBackdropContainer.remove();
}

"use strict";

let seeMoreArrow = $('.reviews-table__see-more-button-arrow');

for (let elem of seeMoreArrow) {
    $(elem).bind('click', (event) => {
        event.target.parentElement.click();
    });
}
//# sourceMappingURL=script.js.map
