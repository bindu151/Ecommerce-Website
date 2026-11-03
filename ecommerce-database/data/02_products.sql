USE ecommerce_db;

INSERT INTO products
(category_id, product_name, description, price, stock_quantity, image_url)
VALUES
(1, 'Wireless Headphones', 'Bluetooth wireless headphones', 1999.00, 25, 'headphones.jpg'),
(1, 'Wireless Mouse', 'Ergonomic wireless mouse', 799.00, 50, 'mouse.jpg'),
(2, 'Cotton T-Shirt', 'Comfortable cotton T-shirt', 599.00, 40, 'tshirt.jpg'),
(2, 'Denim Jeans', 'Classic blue denim jeans', 1499.00, 30, 'jeans.jpg'),
(3, 'SQL for Beginners', 'A beginner-friendly SQL book', 499.00, 20, 'sql-book.jpg');