CREATE TABLE borrowers (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  registereddate VARCHAR(50),
  created_at DATE,
  updated_at DATE
);