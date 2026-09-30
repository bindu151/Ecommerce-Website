USE ecommerce_db;

SELECT 'users' AS table_name, COUNT(*) AS row_count
FROM users

UNION ALL

SELECT 'categories', COUNT(*)
FROM categories

UNION ALL

SELECT 'products', COUNT(*)
FROM products

UNION ALL

SELECT 'carts', COUNT(*)
FROM carts

UNION ALL

SELECT 'cart_items', COUNT(*)
FROM cart_items

UNION ALL

SELECT 'orders', COUNT(*)
FROM orders

UNION ALL

SELECT 'order_items', COUNT(*)
FROM order_items;