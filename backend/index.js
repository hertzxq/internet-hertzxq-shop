import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sex',
  password: 'admin',
  port: 5432,
});

app.use(cors());

app.get('/api/products', async (req, res) => {
  console.log('Запрос к /api/products с параметрами:', req.query);
  const { category = 'Все', search = '', sort = 'default' } = req.query;
  const query = `
    SELECT * FROM products
    WHERE ($1 = 'Все' OR category = $1)
    AND ($2 = '' OR LOWER(name) LIKE LOWER($2))
    ORDER BY
        CASE WHEN $3 = 'price-asc' THEN price END ASC,
        CASE WHEN $3 = 'price-desc' THEN price END DESC,
        CASE WHEN $3 = 'default' THEN id END;
  `;
  try {
    const values = [category, `%${search}%`, sort];
    const result = await pool.query(query, values);
    console.log('Результат запроса:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM products');
    res.json(result.rows.map(row => row.category));
  } catch (error) {
    console.error('Error fetching categories:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/orders', (req, res) => {
  const { items, totalPrice } = req.body;
  // Simulate order processing (e.g., check stock, save to database)
  if (Math.random() > 0.3) { // 70% chance of success for demo
    res.json({ success: true, orderId: Date.now() });
  } else {
    res.status(400).json({ success: false, error: 'Недостаточно товаров на складе' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));