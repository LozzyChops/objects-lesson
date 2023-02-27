// an array to hold the books
const myLibrary = [];

//a constructor function for books
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

//creates a book and puts it in the library array
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.unshift(book);
}

//displays the library on a series of cards in the site container
function displayLibrary() {
    for (const book of myLibrary) {
       const container = document.querySelector('#container');

       const card = document.createElement('div');
       card.setAttribute('class', 'card');

       container.appendChild(card);

       const image = document.createElement('img');
       image.setAttribute('src', 'assets/book.svg', 'alt', 'book icon');

       const div = document.createElement('div');
       div.setAttribute('class', 'book-info');
       div.textContent = book.info();

       card.appendChild(image);
       card.appendChild(div);
    }
}

//makes the form visible
function openForm() {
    document.getElementById("addBook").style.display = "flex";
}

//makes the form invisible
function closeForm() {
    document.getElementById("addBook").reset(); //resets the form, so it doesn't remember the old values
    document.getElementById("addBook").style.display = "none";
}

//makes a book from the user input in the form
function addBookViaForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const checkbox = document.getElementById("checkbox").checked;
    const haveRead = checkbox ? "have read" : "have not read";

    addBookToLibrary(title, author, pages, haveRead);

    const container = document.getElementById("container");

    const cards = document.getElementsByClassName("card");

    const firstDisplayedCard = cards[0];

    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const image = document.createElement('img');

    const div = document.createElement('div');

    image.setAttribute('src', 'assets/book.svg', 'alt', 'book icon');

    div.setAttribute('class', 'book-info');
    div.textContent = myLibrary[0].info();

    card.appendChild(image);
    card.appendChild(div);

    container.insertBefore(card, firstDisplayedCard);
}

//listen for the submit button, then add a book using the form and close the form
document.getElementById("addBook").addEventListener("submit", function(event){
    event.preventDefault();  //stops the form submission from trying to reach a server
    addBookViaForm();
    closeForm();
});

//a temporary collection of books for testing purposes
addBookToLibrary('The Lord of the Rings', 'J. R. R. Tolkien', 1178, 'have read');
addBookToLibrary('The Da Vinci Code', 'Dan Brown', 689, 'have read');
addBookToLibrary('War and Peace', 'Leo Tolstoy', 1225, 'have not read');
addBookToLibrary('The Catcher in the Rye', 'J. D. Salinger', 234, 'have not read');

//initially display the library on the site
displayLibrary();