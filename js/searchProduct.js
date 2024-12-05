async function searchProducts() {
    const input = document.getElementById('productSearch').value;
    const resultsContainer = document.getElementById('results');

    // Отображаем контейнер только если введено 3 или более символов
    if (input.length < 3) {
      resultsContainer.innerHTML = ''; // Очистка результатов
      resultsContainer.style.display = 'none'; // Скрыть контейнер
      return;
    }

    try {
      // Отправляем GET-запрос на сервер
      const response = await fetch(`http://localhost:3300/search?productName=${input}`);
      const products = await response.json();

      // Очистка предыдущих результатов
      resultsContainer.innerHTML = '';

      // Заполняем результаты
      if (products.length > 0) {
        products.forEach(product => {
          const div = document.createElement('div');
          div.classList.add('product-item');
          div.setAttribute("id",product.id);
          div.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="product-info">
              <span class="product-name">${product.name}</span>
              <span class="product-price">$${product.price}</span>
              <p class="product-description">${product.description}</p>
            </div>
          `;
          resultsContainer.appendChild(div);
        });
        resultsContainer.style.display = 'block'; 
      } else {
        resultsContainer.style.display = 'none'; 
      }
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    }
  }