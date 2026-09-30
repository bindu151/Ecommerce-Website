USE ecommerce_db;

DELIMITER //

CREATE FUNCTION GetOrderItemTotal(
    input_quantity INT,
    input_price DECIMAL(10,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN input_quantity * input_price;
END //

DELIMITER ;