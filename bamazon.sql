-- Drops Database if it already exists --
DROP DATABASE bamazon;

-- Create a database called 'Bamazon' and switch into it for this activity --
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Settlers of Catan', 'Toys and Games', 42.95, 400),
		('Battleship', 'Toys and Games', 14.99, 274),
		('Nintendo Switch', 'Toys and Games', 299.00, 999),
		('Coleman Roadtrip 225', 'Sports and Outdoors', 189.99, 300),
		('Discraft 175 gram Sport Disc', 'Sports and Outdoors',9.05, 666),
		('Front Pocket Minimalist Slim Wallet', 'Amazon Fasion', 0.20, 10000),
		('Pangea Fruit Mix With Insects Crested Gecko Complete Diet 1/2 lb', 'Pet Supplies', 18.99, 265),
		('VIOTEK H250 25 Inch', 'Computer', 149.99, 690),
		('AMD Ryzen 7 2700X', 'Computer', 294.99, 742),
        ('Yoga Mat', 'Sports and Fitness', 16.99, 420);