USE ecommerce_db;

SELECT
    product_id,
    product_name,
    price,
    stock_quantity
FROM products
WHERE stock_quantity > 0
ORDER BY product_name;