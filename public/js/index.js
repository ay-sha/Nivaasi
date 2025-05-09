document.addEventListener('DOMContentLoaded', function () {
    // Tax switch toggle
    let taxSwitch = document.getElementById('switchCheckDefault');
    if (taxSwitch) {
        taxSwitch.addEventListener('click', () => {
            let taxInfo = document.getElementsByClassName('tax-info');
            for (let info of taxInfo) {
                // Use classList.toggle to toggle visibility
                info.style.display = (info.style.display === 'inline') ? 'none' : 'inline';
            }
        });
    }

    // Filter click event
    let allFilters = document.getElementsByClassName('filter');
    console.log(allFilters);
    for (let filter of allFilters) {
        filter.addEventListener('click', (event) => {
            let category = event.currentTarget.getAttribute('data-category');
            document.getElementById('categoryInput').value = category;
            document.getElementById('filterForm').submit();
        });
    }

    // Swiper initialization
    new Swiper('.filterContainer', {
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 }
        }
    });
});