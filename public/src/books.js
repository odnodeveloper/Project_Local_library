function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => author.id === id);     // loop through the author array to find an author with matching id
    return foundAuthor;       // return an author with matching id
}



function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id);       // loop through the book array to find a book with matching id
    return foundBook;       // return a book with matching id
}



function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = [];   // first empty array
  let returnedBooks = [];   // second empty array
  const currentlyBorrowed = books.filter((book) => {    // looped through the book array to find currently borrowed books
    const borrows = book.borrows;       // retrieve the key from object and assign to new variable
    const firstBorrowed = borrows[0];     // first book in the borrows array  
      if (!firstBorrowed.returned) {      // if returned is false
        borrowedBooks.push(book);       // push to first empty array
    }else{  
        returnedBooks.push(book);       // otherwise push to second empty array
    }
  });
  return [borrowedBooks, returnedBooks];    // return an array with 2 arrays
}



function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrow) => {    // loop through the book array 
    const borrower = accounts.find((account) => account.id === borrow.id);    // loop through the account array to find an account with matching id  
    borrower.returned = borrow.returned;    // set whether they returned the book equal to book returned status
    return borrower;      // return a borrower 
  })
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
