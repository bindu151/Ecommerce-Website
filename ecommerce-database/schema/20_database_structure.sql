USE ecommerce_db;

SHOW TABLES;

DESCRIBE users;
DESCRIBE categories;
DESCRIBE products;
DESCRIBE carts;
DESCRIBE cart_items;
DESCRIBE orders;
DESCRIBE order_items;

SHOW FULL TABLES
WHERE TABLE_TYPE = 'VIEW';

SHOW PROCEDURE STATUS
WHERE Db = 'ecommerce_db';

SHOW FUNCTION STATUS
WHERE Db = 'ecommerce_db';

SHOW TRIGGERS
FROM ecommerce_db;