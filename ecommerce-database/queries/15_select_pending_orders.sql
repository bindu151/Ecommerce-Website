USE ecommerce_db;

SELECT
    o.order_id,
    u.name AS customer_name,
    o.total_amount,
    o.status,
    o.created_at
FROM orders o
JOIN users u
    ON o.user_id = u.user_id
WHERE o.status = 'PENDING'
ORDER BY o.created_at ASC;