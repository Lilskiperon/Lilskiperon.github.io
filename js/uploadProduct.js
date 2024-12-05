let recommendationCurrentPage = 1;
let noveltyCurrentPage = 1;
let previousPage = null;
let itemsPerPage = 5;
const totalPages = 4;


async function loadRecommendationProducts() {
    const response = await fetch('http://localhost:3300/product');
    if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров');
    }
    const products = await response.json();
    const prevButton = document.getElementById('prev-recommendation-page');
    const nextButton = document.getElementById('next-recommendation-page');
    prevButton.disabled = recommendationCurrentPage === 1;
    nextButton.disabled = recommendationCurrentPage === totalPages;
    renderProducts(products, 'recommendation-cards-list', recommendationCurrentPage, prevButton, nextButton);
}

async function loadNoveltyProducts() {
    const response = await fetch('http://localhost:3300/product');
    if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров');
    }
    const products = await response.json();
    const prevButton = document.getElementById('prev-novelty-page');
    const nextButton = document.getElementById('next-novelty-page');
    prevButton.disabled = noveltyCurrentPage === 1;
    nextButton.disabled = noveltyCurrentPage === totalPages;
    renderProducts(products, 'novelty-cards-list', noveltyCurrentPage, prevButton, nextButton);
}

/*async function loadProducts() {
    const response = await fetch('http://localhost:3000/products?${query}');
    if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров');
    }

    const products = await response.json();
    prevButton = document.getElementById('prev-page');
    nextButton = document.getElementById('next-page');
    renderProducts(products); 
    prevButton.disabled = currentPage === 1; 
    nextButton.disabled = currentPage === totalPages;

    document.getElementById('prev-page').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts(products);
        }
    };

    document.getElementById('next-page').onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(products);
        } 
    };
}*/

function renderProducts(products, containerId, currentPage, prevButtonId, nextButtonId) {


     // Если текущая страница 1, отключаем кнопку "предыдущая страница
     if (currentPage === 1) {
        prevButtonId.classList.add('disabled');
    } else {
        prevButtonId.classList.remove('disabled');
    }

    // Если текущая страница - последняя, отключаем кнопку "следующая страница"
    if (currentPage === totalPages) {
        nextButtonId.classList.add('disabled');
    } else {
        nextButtonId.classList.remove('disabled');
    }
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    // Определяем начальный и конечный индексы для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);

    // Проходим по каждому товару и создаём HTML для текущей страницы
    for (let i = startIndex; i < endIndex; i++) {
        const product = products[i];
        const productDiv = document.createElement('div');
        productDiv.classList.add('card', 'productItem');
        productDiv.setAttribute("id",product.id);
        

        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="text-block">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">Цена: ${product.price} грн.</p>
                <button class="add-to-cart">В корзину</button>
            </div>
            <a class="ngmassa-favorite" title="Добавить в избранное">
                <svg data-toggle="tooltip" class="svgicon svgicon-favorites-remove">
                    <use href="/assets/svg/sprite-icons.svg#icon-favorite-default"></use>
                </svg>
            </a>
        
            <a class="ngmassa-comparison" title="Сравнить">
                <svg data-toggle="tooltip" class="svgicon svgicon-comparison-remove">
                    <use href="/assets/svg/sprite-icons.svg#icon-comparison-default"></use>
                </svg>
            </a>
        `;

        // Добавляем обработчик события для кнопки "В корзину"
        const addToCartButton = productDiv.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            alert(`${product.name} добавлен в корзину!`);
        });

        const toggleFavorite = productDiv.querySelector('.ngmassa-favorite .svgicon');
        toggleFavorite.addEventListener('click',()=>{
            if (toggleFavorite.classList.contains('svgicon-favorites-add')) {
                toggleFavorite.classList.remove('svgicon-favorites-add');
                toggleFavorite.classList.add('svgicon-favorites-remove');
            } else {
                toggleFavorite.classList.remove('svgicon-favorites-remove');
                toggleFavorite.classList.add('svgicon-favorites-add');
                toggleFavorite.closest('.ngmassa-favorite').setAttribute('title', 'Удалить из избранное');
            }
        })

        const toggleComparison = productDiv.querySelector('.ngmassa-comparison .svgicon');
        toggleComparison.addEventListener('click', () => {
        if (toggleComparison.classList.contains('svgicon-comparison-add')) {
            toggleComparison.classList.remove('svgicon-comparison-add');
            toggleComparison.classList.add('svgicon-comparison-remove');
            toggleComparison.closest('.ngmassa-comparison').setAttribute('title', 'Добавить в сравнения');
        } else {
            toggleComparison.classList.remove('svgicon-comparison-remove');
            toggleComparison.classList.add('svgicon-comparison-add');
            toggleComparison.closest('.ngmassa-comparison').setAttribute('title', 'Удалить из сравнение');
            showToast();
        }
        });


        prevButtonId.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts(products, containerId, currentPage, prevButtonId, nextButtonId);
            }
        };

        nextButtonId.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts(products, containerId, currentPage, prevButtonId, nextButtonId);
            }
        };
        // Добавляем div в контейнер
        container.appendChild(productDiv);
    }

    changeColor(currentPage,containerId);
    
}
function changeColor(currentPage, container) {
    if (previousPage !== null) {
        document.getElementById(`${container}-circle${previousPage}`).setAttribute("fill-opacity", "0.0");
    }
    
    const currentCircle = document.getElementById(`${container}-circle${currentPage}`);
    
    if (currentCircle) {
        currentCircle.setAttribute("fill-opacity", "1.0");
        previousPage = currentPage; // Обновляем предыдущую страницу
    } else {
        console.log('SVG еще не загружен или элемент не найден.');
    }
}

function changePage(pageNumber, container) {
    if (container === 'recommendation-cards-list') {
        previousPage = recommendationCurrentPage;
        recommendationCurrentPage = pageNumber;
        loadRecommendationProducts(); 
    } else if (container === 'novelty-cards-list') {
        previousPage = noveltyCurrentPage;
        noveltyCurrentPage = pageNumber;
        loadNoveltyProducts(); 
    }
}



window.addEventListener('DOMContentLoaded', () => {
    loadRecommendationProducts();
    loadNoveltyProducts();
});