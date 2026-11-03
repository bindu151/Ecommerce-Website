USE ecommerce_db;

SELECT
    SUM(oi.quantity * oi.price) AS total_revenue
FROM order_items oi
JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.status <> 'CANCELLED';