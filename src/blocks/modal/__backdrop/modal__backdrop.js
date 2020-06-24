let modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
if (modalBackdrop) {
    modalBackdrop.onclick = () => {
        closeModal();
    }
}

function closeModal() {
    alert();
}
