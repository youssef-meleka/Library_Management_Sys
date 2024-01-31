CREATE TABLE books (
  id serial PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(255) NOT NULL,
  available_quantity SMALLINT DEFAULT 1,
  shelf_location VARCHAR(255) NOT NULL,
  created_at DATE,
  updated_at DATE
);