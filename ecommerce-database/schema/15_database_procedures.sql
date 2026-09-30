USE ecommerce_db;

DELIMITER //

CREATE PROCEDURE GetUserOrders(IN input_user_id INT)
BEGIN
    SELECT
        o.order_id,
        o.total_amount,
        o.status,
        o.shipping_address,
        o.created_at
    FROM orders o
    WHERE o.user_id = input_user_id
    ORDER BY o.created_at DESC;
END //

DELIMITER ;