// //////////// UNIVERSAL CONSTANTS & VARIABLES DECLARATION //////////

const myColors= ["#10264F", "#006E91", "#028C99", "#407F74", "#70AEA3",
  "#C6EAE6", "#F3DFC6", "#F3DFC6", "#FAA86E", "#EC6C3B", "#5F1806", 
  "#A3250C", "#C92B28", "#EE3D29", "#CF533B", "#F3775F", "#CB645F",
  "#DBB17F", "#FDD888", "#F8E3AC", "#FBC85B", "#B8912A", "#EEBA33", 
  "#CED6CB", "#729BAF", "#377C8B", "#244B46", "#11546F", "#1D438A",
  "#3A4765"];
const myLibrary = [];

var bookId = 0;

const checkboxnumber = 8;


// //////////// BOOKS CREATION ///////////////

function Book(title, author, year, type, read) {
  // the constructor for book, include book title, book author, year its written, and whether its read or not
  this.title = title
  this.author = author
  this.year = year
  this.type = type
  this.read = read
  this.id = bookId // maybe ToString???
  bookId += 1;
}

function addBookToLibrary(Book) {
  // add book to library (an array)
  myLibrary.push(Book)
}


// //////////// BOOK DISPLAY /////////////////

// 2. Write a function that loops through the array and displays each book on the page. 
// You can display them in some sort of table, or each on their own “card”. 
// It might help for now to manually add a few books to your array so you can see the display.

function setColor(newCard) {
  // Set a random color from color list on a given card, helper function for displayBookCard
  let pickedColor = myColors[(Math.floor(Math.random() * myColors.length))];
  newCard.style.backgroundColor = pickedColor;
}


// BOOK-DELETING BUTTON /////////////
function addDeleteButton(newCard, bookid) {
  // Helper function for displayBookCard, creates a delete button for a newCard
  let deleteButton = document.createElement('button');
  // deleteButton.classList.add(bookid); // this is unnecessary, it's just for clarity
  
  deleteButton.innerText = 'X';
  deleteButton.style.fontWeight = 'bold';
  newCard.appendChild(deleteButton);

  // Now we handle the deleteButton's eventhandler that will call deleteBook();
  deleteButton.addEventListener("click", () => {
        deleteBook(bookid); } )

}

function deleteBook(bookid) { // or a card
  // Delete a certain book from library
  // Check if deleting one book from library shift every other book after 
  // that book to one slot before
  let card = document.getElementById(bookid);
  card.remove();
}

// BOOKS-READ STATUS BUTTON //////////
function addStatusToggle(newCard, read) {
  // Helper function for displayBookCard, creates a read status toggle for a newCard
  
  // Create a checkbox element
  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.name = "read";
  checkbox.id = "read";

  if (read == true) {
    checkbox.checked = "true";
  }

  console.log("We created a checkbox!");

  // Create label for the checkbox
  let label = document.createElement('label');
  label.htmlFor = "read";
  label.appendChild(document.createTextNode('Read?'))

  // Append the checkbox & label to the div, along with a container
  let statusToggle = document.createElement("div");
  statusToggle.classList.add("statusToggle");
  statusToggle.appendChild(checkbox);
  statusToggle.appendChild(label);
  newCard.appendChild(statusToggle);
}


function displayBookInfo(newCard, bookInfo) {
  // Create new p objects for each detail for a given card, helper function for displayBookCard
  for (let i=0; i<bookInfo.length; i++) {
    let newLine = document.createElement("p");
    currInfo = bookInfo[i];
    newLine.innerText = currInfo;
    console.log(currInfo)
    newCard.appendChild(newLine);
  }
}

function createBookCard(Book) {
  // This function creates card for a book

  // Create a newCard DOM object on the document
  let newCard = document.createElement("div");
  newCard.classList.add("book");  // Give newCard a class of "book"
  newCard.setAttribute("id", Book.id); // Give newCard its id for delete()
  
  // Set the card's color using helper function
  setColor(newCard);

  // Grab book information
  let bookInfo = [Book.title, Book.author, Book.year, Book.type];

  addDeleteButton(newCard, Book.id); // we use the book.id for deletebutton's eventlistener
  // so we can delete the correct book with id

  // Display each detail on the card as independent lines
  displayBookInfo(newCard, bookInfo);

  // Add the new card to grid container
  document.getElementById("grid-container").appendChild(newCard);

  // Get Book's info whether read or not for separate use
  let bookRead = Book.read;

  // Add status button to the card
  addStatusToggle(newCard, bookRead);
}

function clearScreen() {
  // This function clears the cards previously showed

}



// 1. displayBookCard should be changed to createBookCard
// 2. we should create BookCard for all books added to library, so create one each time a book is added
// 3. we don't need displayShelf()?

// function displayShelf() {
//   // This function create card visual DOM objects for each book object in the library
//   // Since we already made a grid container, we don't need to worry about formatting
//   // the cards, it's handled in css file.
//   for (let i=0; i<myLibrary.length; i++) {
//     currBook = myLibrary[i];
//     displayBookCard(currBook);
//   }

// }

// //////////// BOOK-ADDING FORM ////////////////

// I can use a form to display my form, or a side bar nav that shows up

function formPop() {
  // This function get form to show
  const form = document.getElementById("form");
  form.style.visibility = "visible"; 
}

function formHide() {
  // This function hide form
  const form = document.getElementById("form");
  form.style.visibility = "hidden"; 
}

function validateForm() {

}

function getBookInfo() {
  //!! This part only works if validate form works!!
  // This function get bookinfo by getting the value of inputs for each input
  // Should be used when submit button is pressed.
  var booktitle = document.getElementById('titlebox').value // get title

  var bookauthor = document.getElementById('authorbox').value // get author

  var bookyear = document.getElementById('yearbox').value // get year

  var booktype = null; // where we will store booktype value

  // This method relies on the naming of ids of the checkboxes
  for (i = 0; i < checkboxnumber; i++) {
    var currBox = document.getElementById("checkbox"+i);
    if (currBox.checked == true) {
      booktype = currBox.value;
    }
  }

  var bookread = null; // where we will store whether book is read info
  var yesButton = document.getElementById("yes"); // our yes button

  // this logic only works if something is checked
  if (yesButton.checked == true) {
    bookread = true;
  } else {
    bookread = false;
  }

  const bookInfo = [booktitle, bookauthor, bookyear, booktype, bookread]; // store info into array
  // console.log(bookInfo); // test

  return bookInfo;
}

function resetButton() {
  let resetButton = document.getElementById("resetbutton");
  newBookButton.addEventListener("click", (event) => 
    {event.preventDefault();
    // clear form
    clearform();} 
    )
}

// Form Set Up:
function activateNewBookbutton() {
  let newBookButton = document.getElementById("newBook");
  newBookButton.addEventListener("click", () => {
    formPop();
  })
}

function activateHideFormbutton() {
  let closeButton = document.getElementById("close");
  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Note that we have to add event.preventDefault() here
    // so we can avoid the form from being submitted when pressing 
    // the hide button
    formHide();
  })
}

function activateSubmitbutton() {
 submitbutton = document.getElementById("submitbutton");
 submitbutton.addEventListener("click", (event) => {
  // We will pretend it works
  event.preventDefault(); // prevent submitting
  
  // var bookInfo = getBookInfo(); // we get the book's info to make new card
  let bookInfo = getBookInfo();
  clearform()  // clear the form
  formHide(); // and hide the form
  
  // create book with bookInfo

  // Make new book, and add new book to library
  let newBook = new Book(bookInfo[0], bookInfo[1], bookInfo[2], bookInfo[3], bookInfo[4]);
  console.log(newBook);
  addBookToLibrary(newBook);

  createBookCard(newBook); // create book card

 })
}

function clearform() {
  // This button will clean our form when submitted
  const form = document.getElementById("actualform");
  form.reset();

  // REMEMBER WE CHANGED THE FORM'S ID IT MIGHT HAVE CHANGED SOMETHING !!
}
  
// //////////// MAIN PROGRAM & Listeners //////////


window.onload = function() {
  // set up form:
  activateNewBookbutton(); // tell new book button to work
  activateHideFormbutton(); // tell form hide button to work
  activateSubmitbutton(); // tell submit button to work
  formHide(); // hide the form as default

  const sample = new Book("Sample", "Sample", 1945, "Sample", false);
  addBookToLibrary(sample);
  createBookCard(sample);
  // we don't worry about displaying shelf because it displays book on its own
  }






////// EXTRA NOTES (like not in use functions) ///////
// function pickSize() {
//   // Pick a random width and a random height within a range for the card
//   let pickedWidth = Math.random()*(40)+125;
//   let pickedHeight = Math.random()*(40)+125;
//   let a = pickedWidth+"px";
//   let b = pickedHeight+"px";
//   return [a, b];
// }

  
  // const harryPotter1 = new Book("Harry Potter Vol. 1", "J. K. Rowling", 1997, "Fantasy", true);
  // console.log(harryPotter1);
  // const harryPotter2 = new Book("Charlotte's Web", "E. B. White", 1952, "Fantasy", true);
  // const C = new Book("A Study in Scarlet", "Arthur Conan Doyle", 1887, "Mystery", false);
  // const D = new Book("Animal Farm", "George Orwell", 1945, "Others", true);
  // const E = new Book("Brave New World", "Aldous Huxley", 1932, "Others", true);
  // addBookToLibrary(harryPotter1);
  // addBookToLibrary(harryPotter2);
  // addBookToLibrary(C);
  // addBookToLibrary(D);
  // addBookToLibrary(E);

  // displayShelf();
  // getBookInfo();
// When running (always) (we will put this paragraph at the top later on):
// var title = 
// var author =
// var year =
// ... set up all the universal variables for later use
// We are ALWAYS displaying the library table
// By default, form should be hidden
// if NEW BOOK button is pressed:
//    formPop()
// if x button is pressed:
//    formHide()
// if submit button is pressed:
//     getBookInfo()