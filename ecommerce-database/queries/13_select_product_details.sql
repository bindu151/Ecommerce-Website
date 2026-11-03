USE ecommerce_db;

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
    ON p.category_id = c.category_id
ORDER BY p.product_name;