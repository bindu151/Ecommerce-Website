USE ecommerce_db;

SELECT
    p.product_id,
    p.product_name,
    p.price,
    p.stock_quantity,
    c.category_name
FROM products p
JOIN categories c
    ON p.category_id = c.category_id
WHERE c.category_name = 'Electronics';