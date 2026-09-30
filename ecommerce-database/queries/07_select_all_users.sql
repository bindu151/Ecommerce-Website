USE ecommerce_db;

SELECT
    user_id,
    name,
    email,
    role,
    created_at
FROM users
ORDER BY created_at DESC;