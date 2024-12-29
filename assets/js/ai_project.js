document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let activeCard = null;
    let overlay = createOverlay();

    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        return overlay;
    }

    function expandCard(card) {
        overlay.style.display = 'block';
        card.classList.add('expanded');
        activeCard = card;
        document.body.style.overflow = 'hidden';
    }

    function collapseCard(card) {
        overlay.style.display = 'none';
        card.classList.remove('expanded');
        activeCard = null;
        document.body.style.overflow = '';
    }

    cards.forEach(card => {
        // Add close button to each card
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '×';
        card.appendChild(closeButton);

        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-button')) {
                collapseCard(card);
                return;
            }

            if (activeCard === card) {
                collapseCard(card);
            } else {
                if (activeCard) {
                    collapseCard(activeCard);
                }
                expandCard(card);
            }
        });
    });

    overlay.addEventListener('click', () => {
        if (activeCard) {
            collapseCard(activeCard);
        }
    });

    // Prevent card collapse when clicking inside expanded card
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('expanded')) {
                e.stopPropagation();
            }
        });
    });
});