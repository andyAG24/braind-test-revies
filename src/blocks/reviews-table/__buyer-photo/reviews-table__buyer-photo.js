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