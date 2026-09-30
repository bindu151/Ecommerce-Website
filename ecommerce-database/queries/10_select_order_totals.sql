USE ecommerce_db;

SELECT
    o.order_id,
    u.name AS customer_name,
    SUM(oi.quantity * oi.price) AS calculated_total,
    o.total_amount AS stored_total
FROM orders o
JOIN users u
    ON o.user_id = u.user_id
JOIN order_items oi
    ON o.order_id = oi.order_id
GROUP BY
    o.order_id,
    u.name,
    o.total_amount;