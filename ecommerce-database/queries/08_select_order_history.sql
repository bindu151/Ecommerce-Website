USE ecommerce_db;

SELECT
    o.order_id,
    u.name AS customer_name,
    p.product_name,
    oi.quantity,
    oi.price,
    o.total_amount,
    o.status,
    o.created_at
FROM orders o
JOIN users u
    ON o.user_id = u.user_id
JOIN order_items oi
    ON o.order_id = oi.order_id
JOIN products p
    ON oi.product_id = p.product_id
ORDER BY o.created_at DESC;