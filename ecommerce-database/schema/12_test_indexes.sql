USE ecommerce_db;

EXPLAIN
SELECT
    product_id,
    product_name,
    price,
    stock_quantity
FROM products
ORDER BY product_name;

EXPLAIN
SELECT
    order_id,
    total_amount,
    status,
    created_at
FROM orders
WHERE user_id = 1
ORDER BY created_at DESC;

EXPLAIN
SELECT
    order_id,
    total_amount,
    status,
    created_at
FROM orders
WHERE status = 'PENDING'
ORDER BY created_at ASC;