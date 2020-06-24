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