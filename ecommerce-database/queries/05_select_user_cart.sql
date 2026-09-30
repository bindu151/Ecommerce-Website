USE ecommerce_db;

SELECT
    c.cart_id,
    u.name AS customer_name,
    p.product_name,
    ci.quantity,
    p.price,
    (ci.quantity * p.price) AS item_total
FROM carts c
JOIN users u
    ON c.user_id = u.user_id
JOIN cart_items ci
    ON c.cart_id = ci.cart_id
JOIN products p
    ON ci.product_id = p.product_id
WHERE u.user_id = 1;