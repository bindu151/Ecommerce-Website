USE ecommerce_db;

SELECT
    o.order_id,
    u.name AS customer_name,
    o.total_amount,
    o.status,
    o.shipping_address,
    o.created_at
FROM orders o
JOIN users u
    ON o.user_id = u.user_id
WHERE u.user_id = 1;