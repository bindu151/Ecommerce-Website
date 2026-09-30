USE ecommerce_db;

SELECT
    'Products with invalid categories' AS check_name,
    COUNT(*) AS problem_count
FROM products p
LEFT JOIN categories c
    ON p.category_id = c.category_id
WHERE c.category_id IS NULL

UNION ALL

SELECT
    'Orders with invalid users',
    COUNT(*)
FROM orders o
LEFT JOIN users u
    ON o.user_id = u.user_id
WHERE u.user_id IS NULL

UNION ALL

SELECT
    'Order items with invalid orders',
    COUNT(*)
FROM order_items oi
LEFT JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.order_id IS NULL

UNION ALL

SELECT
    'Order items with invalid products',
    COUNT(*)
FROM order_items oi
LEFT JOIN products p
    ON oi.product_id = p.product_id
WHERE p.product_id IS NULL;