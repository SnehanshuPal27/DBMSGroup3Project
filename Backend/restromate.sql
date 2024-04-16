create database restromate;
use restromate;
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(255),
    ContactNumber VARCHAR(20),
    Email VARCHAR(255),
    Address VARCHAR(255)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    OrderDate DATE,
    OrderTotal DECIMAL(10, 2),
    PaymentMethod VARCHAR(255),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Drop the existing foreign key constraint
ALTER TABLE restromate.Orders DROP FOREIGN KEY orders_ibfk_1 ;

-- Re-create the foreign key constraint with ON DELETE CASCADE
ALTER TABLE restromate.orders
ADD CONSTRAINT Orders_CustomerID_FK
FOREIGN KEY (CustomerID)
REFERENCES Customers(CustomerID)
ON DELETE CASCADE;


CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    MenuItemID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (MenuItemID) REFERENCES MenuItems(MenuItemID)
);

ALTER TABLE restromate.OrderItems
DROP FOREIGN KEY orderitems_ibfk_1;

ALTER TABLE restromate.OrderItems
DROP FOREIGN KEY orderitems_ibfk_2;

ALTER TABLE restromate.OrderItems
ADD CONSTRAINT fk_OrderItems_Orders
FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
ON DELETE CASCADE;

ALTER TABLE restromate.OrderItems
ADD CONSTRAINT fk_OrderItems_MenuItems
FOREIGN KEY (MenuItemID) REFERENCES MenuItems(MenuItemID)
ON DELETE CASCADE;


CREATE TABLE MenuItems (
    MenuItemID INT PRIMARY KEY AUTO_INCREMENT,
    MenuItemName VARCHAR(255),
    Description TEXT,
    Category VARCHAR(255),
    Price DECIMAL(10, 2)
);

ALTER TABLE restromate.MenuItems
ADD COLUMN ImageUrl VARCHAR(300);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeName VARCHAR(100) NOT NULL,
    EmployeeRole VARCHAR(50) NOT NULL,
    HireDate DATE NOT NULL,
    Salary DECIMAL(10, 2) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL
);
DROP TABLE Employees;
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierName VARCHAR(255),
    SupplierAddress VARCHAR(255),
    ContactPerson VARCHAR(255),
    ContactNumber VARCHAR(20)
);

CREATE TABLE Inventory (
    InventoryID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierID INT,
    ItemName VARCHAR(255),
    Category VARCHAR(255),
    Quantity INT,
    ExpiryDate DATE,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

CREATE TABLE Tables (
    TableID INT PRIMARY KEY AUTO_INCREMENT,
    TableNumber INT,
    Capacity INT,
    TableStatus VARCHAR(255)
);

CREATE TABLE Reservations (
    ReservationID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    TableID INT,
    ReservationDate DATE,
    ReservationTime TIME,
    NumberOfGuests INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (TableID) REFERENCES Tables(TableID)
);
ALTER TABLE restromate.Reservations
MODIFY COLUMN ReservationTime VARCHAR(10);
INSERT INTO restromate.Reservations (CustomerID, TableID, ReservationDate, ReservationTime, NumberOfGuests)
VALUES (2, 2, '2024-04-12', '12:00 PM', 4);

ALTER TABLE restromate.Reservations
DROP FOREIGN KEY reservations_ibfk_1, -- Drop the existing foreign key constraint for CustomerID
ADD CONSTRAINT Reservations_CustomerID_FK
FOREIGN KEY (CustomerID)
REFERENCES Customers(CustomerID)
ON DELETE CASCADE, -- Re-create the foreign key constraint with ON DELETE CASCADE

DROP FOREIGN KEY reservations_ibfk_2, -- Drop the existing foreign key constraint for TableID
ADD CONSTRAINT Reservations_TableID_FK
FOREIGN KEY (TableID)
REFERENCES Tables(TableID)
ON DELETE CASCADE; -- Re-create the foreign key constraint with ON DELETE CASCADE



CREATE TABLE MenuItemIngredients (
    MenuItemID INT,
    InventoryID INT,
    Quantity INT,
    PRIMARY KEY (MenuItemID, InventoryID),
    FOREIGN KEY (MenuItemID) REFERENCES MenuItems(MenuItemID),
    FOREIGN KEY (InventoryID) REFERENCES Inventory(InventoryID)
);

CREATE TABLE restromate.ReadyItems (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    MenuItemID INT,
    Quantity INT,
    
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (MenuItemID) REFERENCES MenuItems(MenuItemID)
);

ALTER TABLE restromate.ReadyItems
DROP FOREIGN KEY readyitems_ibfk_1;

ALTER TABLE restromate.ReadyItems
DROP FOREIGN KEY readyitems_ibfk_2;

ALTER TABLE restromate.ReadyItems
ADD CONSTRAINT fk_ReadyItems_Orders
FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
ON DELETE CASCADE;

ALTER TABLE restromate.ReadyItems
ADD CONSTRAINT fk_ReadyItems_MenuItems
FOREIGN KEY (MenuItemID) REFERENCES MenuItems(MenuItemID)
ON DELETE CASCADE;



INSERT INTO MenuItems (MenuItemName, Description, Category, Price) VALUES 
('Chicken Tikka Masala', 'Tender pieces of chicken cooked in a creamy tomato-based sauce with traditional Indian spices.', 'Non Veg', 250.99),
('Mutton Biryani', 'Fragrant basmati rice cooked with Mutton, herbs, and spices, served with raita.', 'Rice Dishes', 350.99),
('Paneer Tikka', 'Cubes of paneer (Indian cottage cheese) marinated in yogurt and spices, grilled to perfection.', 'Starter', 249.49),
('Butter Chicken', 'Succulent pieces of chicken simmered in a rich, buttery tomato sauce with cashew cream and fenugreek leaves.', 'Non Veg', 300.99),
('Aloo Gobi', 'A classic vegetarian dish made with potatoes and cauliflower cooked with onions, tomatoes, and spices.', 'Vegetarian', 150.49),
('Chana Masala', 'Tender chickpeas cooked in a flavorful tomato-based sauce with onions, garlic, and aromatic spices.', 'Vegetarian', 159.99),
('Samosa', 'Crispy pastry filled with spiced potatoes, peas, and herbs, served with tamarind chutney.', 'Starter', 16.99),
('Naan', 'Soft and fluffy leavened bread baked in a tandoor oven, perfect for dipping or as an accompaniment to curries.', 'Naan', 13.49),
('Vegetable Korma', 'Assorted vegetables cooked in a creamy coconut milk-based sauce with cashews, raisins, and aromatic spices.', 'Vegetarian', 151.49),
('Palak Paneer', 'Creamy spinach curry with cubes of paneer cheese, seasoned with garlic, ginger, and spices.', 'Vegetarian', 191.99);


INSERT INTO Suppliers (SupplierName, SupplierAddress, ContactPerson, ContactNumber) VALUES 
('Basmati Rice Distributors', '123 Supplier St', 'Rajesh Kumar', '1234567890'),
('Mumbai Meat Traders', '456 Supplier St', 'Kamal Hasan', '9876543210'),
('Fresh Vegetables Pvt. Ltd.', '789 Supplier St', 'Madhuri Kumari', '4567890123'),
('Amul Dairy Products', '987 Supplier St', 'Amitabh Kumar', '7890123456');

INSERT INTO Inventory (SupplierID, ItemName, Category, Quantity, ExpiryDate) VALUES 
(1, 'Basmati Rice', 'Grains', 100, '2025-12-31'),
(2, 'Chicken Breast', 'Meat', 50, '2025-04-15'),
(3, 'Tomatoes', 'Vegetables', 50, '2025-04-10'),
(4, 'Paneer', 'Dairy', 50, '2025-06-30'),
(1, 'Spices', 'Miscellaneous', 100, '2025-10-01'),
(2, 'Mutton', 'Meat', 40, '2025-05-20'),
(3, 'Mix Vegetables', 'Vegetables', 50, '2025-04-15'),
(4, 'Milk', 'Dairy', 40, '2025-06-30'),
(1, 'Flour', 'Grains', 60, '2025-12-15'),
(2, 'Fish Fillet', 'Seafood', 30, '2025-04-30'),
(1, 'Chana', 'Grains', 50, '2025-07-15'),
(3, 'Potato', 'Vegetables', 60, '2024-12-10'),
(4, 'Ghee', 'Dairy', '30', '2024-05-01');

INSERT INTO MenuItemIngredients (MenuItemID, InventoryID, Quantity) VALUES 
(1, 2, 2), -- Chicken Tikka Masala requires chicken breast
(1, 5, 1), -- Chicken Tikka Masala requires spices
(4, 8, 1), -- Butter Chicken requires milk
(4, 2, 1), -- Butter Chicken requires Chicken Breast
(2, 1, 2), -- Mutton Biryani requires Basmati Rice
(2, 6, 1), -- Mutton Biryani requires Mutton
(5, 3, 1), -- Aloo Gobi requires Tomatoes
(5, 5, 1), -- Aloo Gobi requires spices
(6, 11, 2), -- Chana Masala requires Chana
(6, 5, 1), -- Chana Masala requires Spices
(3, 4, 2), -- Paneer Tikka requires Paneer
(3, 5, 1), -- Paneer Tikka requires spices
(7, 12, 2), -- Samosa requires potato
(7, 9, 1), -- Samosa requires Flour
(8, 9, 2), -- Naan requires Flour
(8, 13, 1), -- Naan requires Ghee
(9, 5, 2), -- Veg Korma requires spices
(9, 7, 3), -- Veg Korma requires vegetables
(10, 4, 2), -- Palak paneer requires Paneer
(10, 7, 1); -- Palak paneer requires Palak


INSERT INTO Tables (TableNumber, Capacity, TableStatus) VALUES 
(1, 4, 'Available'),
(2, 6, 'Occupied'),
(3, 2, 'Available'),
(4, 8, 'Available'),
(5, 4, 'Occupied'),
(6, 6, 'Available'),
(7, 2, 'Available'),
(8, 4, 'Occupied'),
(9, 6, 'Available'),
(10, 2, 'Available');

ALTER TABLE Customers
ADD CONSTRAINT unique_email UNIQUE (Email),
MODIFY COLUMN Email VARCHAR(255) NOT NULL;

INSERT INTO Customers (CustomerName, ContactNumber, Email, Address) VALUES 
('Ravi Sharma', '1234567890', 'ravi.sharma@gmail.com', '12 Gandhi Nagar');

INSERT INTO Orders (CustomerID, OrderDate, OrderTotal, PaymentMethod) VALUES 
(1, '2024-04-01', 1456.67, 'Credit Card');