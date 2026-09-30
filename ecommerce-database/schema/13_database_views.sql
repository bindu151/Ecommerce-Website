USE ecommerce_db;

CREATE VIEW product_details_view AS
SELECT
    p.product_id,
    p.product_name,
    c.category_name,
    p.description,
    p.price,
    p.stock_quantity,
    p.image_url,
    p.created_at
FROM products p
JOIN categories c
    ON p.category_id = c.category_id;

CREATE VIEW order_summary_view AS
SELECT
    o.order_id,
    u.name AS customer_name,
    o.total_amount,
    o.status,
    o.shipping_address,
    o.created_at
FROM orders o
JOIN users u
    ON o.user_id = u.user_id;