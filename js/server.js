const express = require('express');
const mysql = require('mysql');
const app = express();

// Настройки подключения к базе данных MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Имя пользователя для MySQL
  password: '11111111',   // Пароль для MySQL
  database: 'ngmassa'           // Имя базы данных
});

// Подключение к базе данных
db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключение к базе данных MySQL установлено.');
});

// Маршрут для получения всех товаров
app.get('/api/products', (req, res) => {
  const sqlQuery = 'SELECT * FROM Products';
  
  db.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send('Ошибка при получении данных');
      console.error('Ошибка выполнения запроса:', err);
      return;
    }
    res.json(results);
  });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));