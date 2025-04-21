const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Добавляем обслуживание статических файлов
app.use('/images', express.static(path.join(__dirname, '../src/images')));

let db;

async function setupDatabase() {
  db = await open({
    filename: process.env.DB_PATH || path.join(__dirname, '../database.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image TEXT,
      category TEXT,
      brand TEXT,
      rating REAL,
      isNew BOOLEAN,
      inStock BOOLEAN,
      discount INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Импорт данных из файла products.js, если таблица пуста
  const productsCount = await db.get('SELECT COUNT(*) as count FROM products');
  if (productsCount.count === 0) {
    const products = [
      {
        id: 1,
        name: "LapTop",
        price: 999,
        category: "Smartphones",
        brand: "Apple",
        rating: 4.8,
        isNew: true,
        inStock: true,
        discount: null,
        description: "Latest smartphone with advanced features and powerful performance",
        image: "http://localhost:5002/images/mainproducts/prd1.svg"
      },
      {
        id: 2,
        name: "Msi monitor",
        price: 1499,
        category: "Laptops",
        brand: "Dell",
        rating: 4.6,
        isNew: true,
        inStock: true,
        discount: 10,
        description: "Powerful laptop for professionals with high performance and sleek design",
        image: "http://localhost:5002/images/mainproducts/prd2.svg"
      },
      {
        id: 3,
        name: "Msi monitor Pro",
        price: 1990,
        category: "Audio",
        brand: "Sony",
        rating: 4.5,
        isNew: false,
        inStock: true,
        discount: null,
        description: "Premium sound quality with noise cancellation and long battery life",
        image: "http://localhost:5002/images/mainproducts/prd3.svg"
      },
      {
        id: 4,
        name: "gaming computer",
        price: 1200,
        category: "Wearables",
        brand: "Samsung",
        rating: 4.3,
        isNew: true,
        inStock: true,
        discount: 15,
        description: "Track your fitness and stay connected with this advanced smartwatch",
        image: "http://localhost:5002/images/mainproducts/prd10.svg"
      },
      {
        id: 5,
        name: "Tablet Ultra",
        price: 699,
        category: "Tablets",
        brand: "Apple",
        rating: 4.7,
        isNew: false,
        inStock: true,
        discount: null,
        description: "Portable tablet with high-resolution display and powerful performance",
        image: "http://localhost:5002/images/mainproducts/prd11.svg"
      },
      {
        id: 6,
        name: "Gaming Console",
        price: 499,
        category: "Gaming",
        brand: "Sony",
        rating: 4.9,
        isNew: true,
        inStock: false,
        discount: null,
        description: "Next-generation gaming console with stunning graphics and fast performance",
        image: "http://localhost:5002/images/mainproducts/prd12.svg"
      },
      {
        id: 7,
        name: "Wireless Earbuds",
        price: 149,
        category: "Audio",
        brand: "Apple",
        rating: 4.6,
        isNew: false,
        inStock: true,
        discount: 5,
        description: "True wireless earbuds with immersive sound and comfortable fit",
        image: "http://localhost:5002/images/mainproducts/prd13.svg"
      },
      {
        id: 8,
        name: "4K Smart TV",
        price: 899,
        category: "TVs",
        brand: "LG",
        rating: 4.5,
        isNew: true,
        inStock: true,
        discount: null,
        description: "Ultra HD smart TV with vibrant colors and smart features",
        image: "http://localhost:5002/images/mainproducts/prd14.svg"
      },
      {
        id: 9,
        name: "4K Smart TV",
        price: 899,
        category: "TVs",
        brand: "LG",
        rating: 4.5,
        isNew: true,
        inStock: true,
        discount: null,
        description: "Ultra HD smart TV with vibrant colors and smart features",
        image: "http://localhost:5002/images/mainproducts/prd9.svg"
      },
      {
        id: 10,
        name: "4K Smart TV",
        price: 899,
        category: "TVs",
        brand: "LG",
        rating: 4.5,
        isNew: true,
        inStock: true,
        discount: null,
        description: "Ultra HD smart TV with vibrant colors and smart features",
        image: "http://localhost:5002/images/mainproducts/prd15.svg"
      },
      {
        id: 11,
        name: "4K Smart TV",
        price: 899,
        category: "TVs",
        brand: "LG",
        rating: 4.5,
        isNew: true,
        inStock: true,
        discount: null,
        description: "Ultra HD smart TV with vibrant colors and smart features",
        image: "http://localhost:5002/images/mainproducts/prd16.svg"
      },
      {
        id: 12,
        name: "4K Smart TV",
        price: 899,
        category: "TVs",
        brand: "LG",
        rating: 4.5,
        isNew: true,
        inStock: true,
        discount: null,
        description: "Ultra HD smart TV with vibrant colors and smart features",
        image: "http://localhost:5002/images/mainproducts/prd17.svg"
      }
    ];

    for (const product of products) {
      await db.run(
        `INSERT INTO products (
          id, name, description, price, image, category, 
          brand, rating, isNew, inStock, discount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.id,
          product.name,
          product.description,
          product.price,
          product.image,
          product.category,
          product.brand,
          product.rating,
          product.isNew ? 1 : 0,
          product.inStock ? 1 : 0,
          product.discount
        ]
      );
    }
    console.log('Products imported successfully');
  }

  console.log('SQLite database connected');
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({
      token,
      user: userData,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Проверяем, является ли это админ-токеном
    if (token.startsWith('admin-token-')) {
      req.isAdmin = true;
      next();
      return;
    }

    // Если это не админ-токен, проверяем JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await db.get('SELECT id, name, email, role FROM users WHERE id = ?', [req.userId]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Products API endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.all('SELECT * FROM products ORDER BY created_at DESC');
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/products', auth, async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    
    const result = await db.run(
      'INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image, category]
    );

    const newProduct = await db.get('SELECT * FROM products WHERE id = ?', [result.lastID]);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/products/:id', auth, async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    
    await db.run(
      'UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ? WHERE id = ?',
      [name, description, price, image, category, req.params.id]
    );

    const updatedProduct = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/products/:id', auth, async (req, res) => {
  try {
    await db.run('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

async function startServer() {
  try {
    await setupDatabase();
    const PORT = 5002; 
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use, trying another...`);
        app.listen(PORT + 1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();