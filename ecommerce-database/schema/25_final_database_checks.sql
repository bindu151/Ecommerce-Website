USE ecommerce_db;

SELECT
    u.user_id,
    u.name,
    COUNT(o.order_id) AS order_count
FROM users u
LEFT JOIN orders o
    ON u.user_id = o.user_id
GROUP BY u.user_id, u.name
ORDER BY u.user_id;

SELECT
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM categories c
LEFT JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name
ORDER BY c.category_id;

SELECT
    p.product_name,
    p.price,
    p.stock_quantity
FROM products p
WHERE p.stock_quantity > 0
ORDER BY p.product_name;