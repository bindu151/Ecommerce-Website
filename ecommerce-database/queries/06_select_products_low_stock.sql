USE ecommerce_db;

SELECT
    product_id,
    product_name,
    price,
    stock_quantity
FROM products
WHERE stock_quantity < 30
ORDER BY stock_quantity ASC;