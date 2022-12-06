function findAccountById(accounts, id) { 
  const foundAccount = accounts.find((account) => account.id === id);   // loop through the account array to find an account with matching id
    return foundAccount;    // return the account with matching id
}



function sortAccountsByLastName(accounts) {
  const sortedAccountsList = accounts.sort((a, b) => {    // loop through the account array to sort accounts
    if (a.name.last < b.name.last)    // if sort 'a' before 'b' 
      return -1;
    if (a.name.last > b.name.last)    // if sort 'a' after 'b' 
      return 1;
  });
   return sortedAccountsList;   // return the list of accounts sorted by last name in alphabetic order
}



function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;     // value should be a number
  for (let i = 0; i < books.length; i++) {    // loop through the book array
    const book = books[i];      //  change code more readable
    const borrows = book.borrows;     // retrieve property from object  
    borrows.forEach((borrow) => {     
      if (account.id == borrow.id)    // loop through the borrows to find account id
        totalBorrows += 1;      // add each found id to totalBorrows 
    })
  }
  return totalBorrows;    // return total number of borrows
}



function getBooksPossessedByAccount(account, books, authors) {    // used helper function
  let borrowedBooks = getBorrowedBooks(account, books);       // create a variable and store the helper function 1 in it
  return findAuthorOfBorrowedBooks(borrowedBooks, authors);   // return a helper function 2
}

function getBorrowedBooks(account, books) {     // helper function 1
  let borrowedBooks = [];       // empty array
  books.forEach((book) =>  {      // loop through the book array
      let borrows = book.borrows;     // retrieve the required property from the object
      for (let i = 0; i < borrows.length; i++) {    // loop through the borrows 
          const borrow = borrows[i];    // DRY code 
          if (account.id === borrow.id && !borrow.returned) {   // check if book id matched with borrows id and not returned yet
            borrowedBooks.push(book);       // push to the empty array
          } 
      }      
  });
  return borrowedBooks;     // return an array of borrowed books
}

function findAuthorOfBorrowedBooks(borrowedBooks, authors) {      // helper function 2
  for (let i = 0; i < borrowedBooks.length; i++) {      // loop through the new array of borrowed books
    const borrowedBook = borrowedBooks[i];      // change code more readable
    const authorId = borrowedBook.authorId;     // retireve the author id from the array of object
    authors.forEach((author) => {       // loop through author array
      if (authorId === author.id) {        // check if the retrieved author id from borrowed books array matches with author id from author array
        borrowedBook.author = author;     // change the borrowed books author to author
      }
    });
  }
  return borrowedBooks;     // return an array of borrowed books with authors
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
