// an array to hold the books
const myLibrary = [];

//a constructor function for books
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
    this.titleByAuthor = function () {
        return `${title}, by ${author}`
    }
    this.numberOfPages = function () {
        return `${pages} pages`
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

       //make a container for a card's contents, top and bottom
       const cardContainer = document.createElement('div');
       cardContainer.setAttribute('class', 'card-container');

       //make a card, which contains the book image, author and title string, and pages string
       const card = document.createElement('div');
       card.setAttribute('class', 'card');

       //make a container for the UI below the card, which holds the toggle and the delete button
       const interactiveParts = document.createElement('div');
       interactiveParts.setAttribute('class', 'interactive-parts');

       //make the book image
       const image = document.createElement('img');
       image.setAttribute('src', 'assets/book.svg', 'alt', 'simple book icon');

       //make the text content container which holds the title and author
       const textContainer = document.createElement('div');
       textContainer.setAttribute('class', 'text-container');
       textContainer.textContent = book.titleByAuthor();

       //make the text content container which holds the number of pages
       const pagesContainer = document.createElement('div');
       pagesContainer.setAttribute('class', 'pages-container');
       pagesContainer.textContent = book.numberOfPages();

       //make a container for toggle and it's label
       const toggleContainer = document.createElement('div');
       toggleContainer.setAttribute('class', 'toggle-container');
       
       //make the toggle
       const toggle = document.createElement('input');
       const toggleLabel = document.createElement('label');
       toggle.setAttribute('id', 'toggle');
       toggle.setAttribute('type', 'checkbox');
       toggle.setAttribute('name', 'toggleBox');
       toggleLabel.setAttribute('for', 'toggleBox');
       toggleLabel.textContent = book.read;

       toggleLabel.textContent === "have read" ? toggle.checked = true : toggle.check = false;
       toggleLabel.textContent === "have read" ? toggleLabel.style.color = 'green' : toggleLabel.style.color = 'red';

       toggle.addEventListener('click', function() {
        if (toggle.checked === true) {
            book.read = 'have read';
            toggleLabel.style.color = 'green';
        } else {
            book.read = 'have not read';
            toggleLabel.style.color = 'red';
        };

        toggleLabel.textContent = book.read;    
        });

       //make the delete button image
       const deleteButton = document.createElement('img');
       deleteButton.setAttribute('src', 'assets/trash-2.svg', 'alt', 'trash icon');

       card.appendChild(image);
       card.appendChild(textContainer);
       card.appendChild(pagesContainer);
       toggleContainer.appendChild(toggle);
       toggleContainer.appendChild(toggleLabel);
       interactiveParts.appendChild(toggleContainer);
       interactiveParts.appendChild(deleteButton);
       cardContainer.appendChild(card);
       cardContainer.appendChild(interactiveParts);
       container.appendChild(cardContainer);
    }
}

//makes the form visible
function openForm() {
    document.getElementById("add-book").style.display = "flex";
}

//makes the form invisible
function closeForm() {
    document.getElementById("add-book").reset(); //resets the form, so it doesn't remember the old values
    document.getElementById("add-book").style.display = "none";
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
document.getElementById("add-book").addEventListener("submit", function(event){
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