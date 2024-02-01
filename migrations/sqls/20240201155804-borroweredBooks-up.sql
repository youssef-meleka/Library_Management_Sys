CREATE TABLE borrowedBooks(
  id serial PRIMARY KEY,
  book_id SMALLINT NOT NULL,
  borrower_id SMALLINT NOT NULL,
  return_date DATE,
  is_return BOOLEAN DEFAULT FALSE,
  due_date DATE NOT NULL,
  created_at DATE,
  updated_at DATE,
  CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_borrower_id FOREIGN KEY (borrower_id) REFERENCES borrowers(id) ON DELETE CASCADE ON UPDATE CASCADE
);
