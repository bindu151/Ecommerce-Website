USE ecommerce_db;

SELECT
    'users' AS table_name,
    'Stores customer and administrator accounts' AS purpose

UNION ALL

SELECT
    'categories',
    'Stores product categories'

UNION ALL

SELECT
    'products',
    'Stores products, prices, stock, and category information'

UNION ALL

SELECT
    'carts',
    'Stores one shopping cart for each user'

UNION ALL

SELECT
    'cart_items',
    'Stores products and quantities inside carts'

UNION ALL

SELECT
    'orders',
    'Stores customer orders and order status'

UNION ALL

SELECT
    'order_items',
    'Stores products, quantities, and prices belonging to orders';