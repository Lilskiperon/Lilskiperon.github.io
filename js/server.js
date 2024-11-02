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
app.get('/products', (req, res) => {
  db.query('SELECT * FROM Product', (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    const products = result.map(row => ({
      id: row.ProductID,
      name: row.Name,
      price: row.Price,
      imageUrl: row.ImageURL,
      description: row.Description
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
  db.query('CALL takeNameProduct(?)', [productName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Преобразуем результат
    const products = results[0].map(row => ({
      id: row.FlatID,
      name: row.Name,
      price: row.Price,
      imageUrl: row.ImageURL,
      description: row.Description
    }));

    res.json(products);
  });
});
// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});