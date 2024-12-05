const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

const port = 3300;

// Настройка соединения с MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '11111111',
  database: 'Ngmassa'
});

// Соединение с базой данных
db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
    return;
  }
  console.log('Подключение к MySQL установлено.');
});

// Подключаем CORS к приложению
app.use(cors());

// Роут для запроса данных
app.get('/product', (req, res) => {
  db.query('SELECT * FROM product', (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    const products = result.map(row => ({
      id: row.productId,
      name: row.productName,
      price: row.nutritionalValue,
      imageUrl: row.productImageurl,
      description: row.description
    }));

    res.json(products);
  });
});

// Роут для поиска продуктов по названию
app.get('/search', (req, res) => {
  const productName = req.query.productName;

  if (!productName) {
    return res.status(400).json({ error: 'Необходимо указать параметр productName' });
  }

  // Вызов хранимой процедуры takeNameProduct
  db.query('SELECT * FROM product WHERE productName LIKE ?', [`%${productName}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Проверяем, что результаты существуют
    if (!results || results.length === 0 || !results[0]) {
      return res.status(404).json({ error: 'Продукты не найдены' });
    }

    // Преобразуем результат
    const products = results.map(row => ({
      id: row.productId,            
      name: row.productName,       
      price: row.nutritionalValue,  
      imageUrl: row.productImageurl
  }));

    // Проверяем, есть ли продукты для возврата
    if (products.length === 0) {
      return res.status(404).json({ error: 'Нет продуктов, соответствующих запросу' });
    }

    res.json(products);
  });
});
// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});