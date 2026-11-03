USE ecommerce_db;

CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,

    FOREIGN KEY (cart_id)
        REFERENCES carts(cart_id),

    FOREIGN KEY (product_id)
        REFERENCES products(product_id),

    UNIQUE (cart_id, product_id)
);