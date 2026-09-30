USE ecommerce_db;

SELECT
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM categories c
LEFT JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name
ORDER BY product_count DESC;