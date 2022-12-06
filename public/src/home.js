
function getTotalBooksCount(books) {
  return books.length;    // return the total number of books
}



function getTotalAccountsCount(accounts) {
  return accounts.length;   // return the total number of accounts
}



function getBooksBorrowedCount(books) {
  let borrowedBooks = books.filter((book) => {      // loop through the book array to filter borrowed books out
    const borrows = book.borrows;     // create a variable and assign it to the filtered borrowedbooks from the book array
    const firstBorrow = borrows[0];     // create a variable and assign it to the first element of the borrows array   
      return !firstBorrow.returned;     // return the book currently borrowed 
  })
  return borrowedBooks.length;    // return the total number of books in borrowed status
}


function getMostCommonGenres(books) {
  let genres = [];      // empty array of objects
  books.forEach(book => {     // loop through the books array
    let genreExists = genres.find((genre) => genre.name === book.genre)   // find existing genres in the book array by their names
    if (genreExists === undefined){       
        genres.push({name: book.genre, count: 1})     // if undefined, push it to a genre group & count as one
    } else {
      genres.forEach((genre) => {       // loop through the grouped genres
        if (genre.name === genreExists.name) {      // 
          genre.count++       // if genre name exists, add it to the group of that genre
        }
      });
    }
  })
  return genres
    .sort((a, b) => b.count - a.count)    // sorting objects in the array
    .slice(0, 5)      //  limit 5 objects
} 



function getMostPopularBooks(books) {
  let borrows = getBookTitleAndBorrowedCount(books);  // used helper function
  borrows.sort((a, b) => (a.count < b.count) ? 1 : -1);   // sort the returned array
    return borrows.slice(0, 5);   //  return the array with top 5 objects
}

function getBookTitleAndBorrowedCount(books) {  // helper function here
  let borrows = books.map((book) => {   // loop through the array of book objects
    return { name: book.title, count: book.borrows.length }   // return a new object with 2 keys: book name and borrows count
  });
  return borrows;   // return an array of book objects with borrowed status
}



function getMostPopularAuthors(books, authors) {  
  let popularBooks = getBorrowedCountAndAuthor(books, authors);   // used helper function
  popularBooks.sort((a, b) => a.count < b.count ? 1 : -1);     // sort books by borrowed count
    return popularBooks.slice(0, 5);     // return an array with top 5 objects 
}

function getBorrowedCountAndAuthor(books, authors) {    // helper function here
  let authorAndBorrows = [];    // empty array
  books.forEach((book) => {     // loop through the book array
    let authorId = book.authorId;     // set author id in the author object equal to author id in the book object
    let borrowedCount = book.borrows.length;    // count the borrows inside of book object
    let index = authorAndBorrows.findIndex(authorAndBorrow => authorAndBorrow.name === authorId);   // loop through the new array to find the author name with matching ID
    if (index > -1) {
      authorAndBorrows[index].count += borrowedCount;     // if find one add to borrows count
    } else {
      authorAndBorrows.push({ name: authorId, count: borrowedCount });    // otherwise push to the empty array
    }
  });
  authorAndBorrows.forEach((authorAndBorrow) => {   // loop through the new array named authorAndBorrows
    let authorInfo = authors.find((author) => author.id === authorAndBorrow.name);   // loop through the author object to find the name matched with the name of the new array
    authorAndBorrow.name = authorInfo.name.first + " " + authorInfo.name.last;  // joined the strings
  });
  return authorAndBorrows;    // return the author's full name and the borrow count 
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
