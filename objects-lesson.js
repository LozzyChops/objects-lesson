const myLibrary = new Array();
let containerReady;

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    stringTitleByAuthor = function() {
        return `${this.title}, by ${this.author}`
    }
    stringNumberOfPages = function() {
        return `${this.pages} pages`
    }
}

function displayEmptyLibrary() {
    const container = document.querySelector('#container');

    const temporaryMessage = document.createElement('div')
    temporaryMessage.setAttribute('id', 'temporary-message');
    temporaryMessage.style.display = 'flex';
    temporaryMessage.textContent = "Click 'NEW BOOK' to add to library";

    container.appendChild(temporaryMessage);
};

function prepareDisplay() {
    const messageToRemove = document.querySelector('#temporary-message');
    messageToRemove.remove();

    const container = document.querySelector('#container');
    container.style.display = "flex";

    containerReady = true;
}

function addToLibrary(book) {
    myLibrary.unshift(book);
};

function addToDisplay(book) {
    const container = document.querySelector('#container');

    //make a container for a card's contents, top and bottom
    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card-container');

    //make the top part, which contains the book image, author and title string, and pages string
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    //make the bottom part, which holds the toggle and the delete button
    const interactiveParts = document.createElement('div');
    interactiveParts.setAttribute('class', 'interactive-parts');

    //make the book image
    const image = document.createElement('img');
    image.setAttribute('src', 'assets/book.svg', 'alt', 'simple book icon');

    //make the text content container which holds the title and author
    const titleContainer = document.createElement('div');
    titleContainer.setAttribute('class', 'title-container');
    titleContainer.textContent = book.stringTitleByAuthor();

    //make the text content container which holds the number of pages
    const pagesContainer = document.createElement('div');
    pagesContainer.setAttribute('class', 'pages-container');
    pagesContainer.textContent = book.stringNumberOfPages();

    //make a container for toggle and its label
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
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'delete-button');
    deleteButton.setAttribute('type', 'button');

    //make the delete button work
    deleteButton.addEventListener("click", function() {
        cardContainer.remove();
    });

    card.appendChild(image);
    card.appendChild(titleContainer);
    card.appendChild(pagesContainer);
    toggleContainer.appendChild(toggle);
    toggleContainer.appendChild(toggleLabel);
    interactiveParts.appendChild(toggleContainer);
    interactiveParts.appendChild(deleteButton);
    cardContainer.appendChild(card);
    cardContainer.appendChild(interactiveParts);
    container.insertBefore(cardContainer, container.firstChild);
}

function openForm() {
    document.getElementById("add-book").style.display = "flex";
};

function closeForm() {
    //reset the form, so it doesn't remember the old values
    document.getElementById("add-book").reset();
    document.getElementById("add-book").style.display = "none";
};

function addBookViaForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const checkbox = document.getElementById("checkbox").checked;
    const read = checkbox ? "have read" : "have not read";

    newBook = new Book(title, author, pages, read);

    if (!containerReady) {
        prepareDisplay();
    }

    addToLibrary(newBook);

    addToDisplay(newBook);
};

//listen for the submit button, then add a book using the form and close the form
document.getElementById("add-book").addEventListener("submit", function(event){
    event.preventDefault();  //stops the form submission from trying to reach a server
    addBookViaForm();
    closeForm();
});

displayEmptyLibrary();