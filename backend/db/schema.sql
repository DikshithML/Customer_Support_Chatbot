CREATE TABLE distribution_centers (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    cost FLOAT,
    category VARCHAR(255),
    name VARCHAR(255),
    brand VARCHAR(255),
    retail_price FLOAT,
    department VARCHAR(255),
    sku VARCHAR(255),
    distribution_center_id INT,
    FOREIGN KEY (distribution_center_id) REFERENCES distribution_centers(id)
);

CREATE TABLE inventory_items (
    id INT PRIMARY KEY,
    product_id INT,
    created_at DATETIME,
    sold_at DATETIME,
    cost FLOAT,
    product_category VARCHAR(255),
    product_name VARCHAR(255),
    product_brand VARCHAR(255),
    product_retail_price FLOAT,
    product_department VARCHAR(255),
    product_sku VARCHAR(255),
    product_distribution_center_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    age INT,
    gender VARCHAR(50),
    state VARCHAR(100),
    street_address TEXT,
    postal_code VARCHAR(20),
    city VARCHAR(100),
    country VARCHAR(100),
    latitude DOUBLE,
    longitude DOUBLE,
    traffic_source VARCHAR(255),
    created_at DATETIME
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    status VARCHAR(100),
    gender VARCHAR(50),
    created_at DATETIME,
    returned_at DATETIME,
    shipped_at DATETIME,
    delivered_at DATETIME,
    num_of_item INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT,
    user_id INT,
    product_id INT,
    inventory_item_id INT,
    status VARCHAR(100),
    created_at DATETIME,
    shipped_at DATETIME,
    delivered_at DATETIME,
    returned_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id)
);
