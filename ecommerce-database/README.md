# E-Commerce Database

This project contains the MySQL database structure and sample data for our e-commerce application.

## Database

Database name:

ecommerce_db

## Tables

- users
- categories
- products
- carts
- cart_items
- orders
- order_items

## Main Relationships

- A user can have one cart.
- A cart can contain multiple cart items.
- A product belongs to a category.
- A cart item belongs to a product.
- A user can have multiple orders.
- An order can contain multiple order items.
- An order item belongs to a product.

## Project Structure

```text
ecommerce-database/
├── schema/
└── data/