
window.addEventListener('DOMContentLoaded', () => {

    function bindModal(triggerSel, modalSel) {

        const trigger = document.querySelectorAll(triggerSel),
            modal = document.querySelector(modalSel);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                };

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });


        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        })
    };

    bindModal('.btn', '.modal');
});