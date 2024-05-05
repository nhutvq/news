document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '2292f6eeae424f7db0059b78fd1945f9';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.articles && data.articles.length > 0) {
            setupCarousel(data.articles.slice(0, 5)); // Use first 5 articles for the carousel
            displayNewsCards(data.articles.slice(5)); // Use remaining articles for news cards
        } else {
            console.error('No articles found');
        }
    })
    .catch(error => console.error('Error fetching data:', error));

    function setupCarousel(articles) {
        const carouselInner = document.querySelector('.carousel-inner');
        articles.forEach((article, index) => {
            const isActive = index === 0 ? 'active' : '';
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${isActive}`;
            carouselItem.innerHTML = `
                <img src="${article.urlToImage}" class="d-block w-100" alt="Slide ${index + 1}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${article.title}</h5>
                    <p>${article.description || 'No description available'}</p>
                </div>
            `;
            carouselInner.appendChild(carouselItem);
        });
    }

    function displayNewsCards(articles) {
        const cardsContainer = document.getElementById('news-cards-container');
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card">
                    <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || 'No description available'}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    }
});
