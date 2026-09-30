USE ecommerce_db;

CREATE INDEX idx_products_name
ON products(product_name);

CREATE INDEX idx_orders_user_created
ON orders(user_id, created_at);

CREATE INDEX idx_orders_status_created
ON orders(status, created_at);