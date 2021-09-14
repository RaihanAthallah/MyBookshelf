const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const BOOK_ITEMID = "book_item";

function makeBookshelf(Title, Author, Year, isCompleted){

    const textBookTitle = document.createElement("h2");
    textBookTitle.innerText = Title;

    const textBookAuthor = document.createElement("h3");
    textBookAuthor.innerText = Author;

    const textBookYear = document.createElement("h3");
    textBookYear.innerText = Year;

    const bookImage = document.createElement("img");
    bookImage.src = "assets/buku.png";

    const book_shelf = document.createElement("article");
    book_shelf.classList.add("book_item");
    book_shelf.append(textBookTitle,textBookAuthor,textBookYear,bookImage);


    if(isCompleted){
        book_shelf.append(createUndoButton());
        book_shelf.append(createTrashButton());
        
    } else {
        book_shelf.append(createCheckButton());
        book_shelf.append(createTrashButton());
    }

    return book_shelf;
}

function createCheckButton() {
    return createButton("green", function(event){
         addTaskToCompleted(event.target.parentElement);
    },"Selesai Dibaca");
}

function createTrashButton() {
    return createButton("red", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    },"Hapus Buku");
}

function createUndoButton() {
    return createButton("blue", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    },"Undo");
}

function createButton(buttonTypeClass , eventListener,teks) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = teks;
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBook(){
    alert("Pastikan data terisi dengan benar");
    const checkbox = document.getElementById("inputBookIsComplete");
    if(checkbox.checked) {
        const completedBOOKshelf = document.getElementById(COMPLETED_LIST_BOOK_ID);
        const bookTitle = document.getElementById("inputBookTitle").value;
        const bookAuthor = document.getElementById("inputBookAuthor").value;
        const bookYear = document.getElementById("inputBookYear").value;
        const condition = true;

        const book = makeBookshelf(bookTitle,bookAuthor,bookYear,condition);
        const bookShelfObject = composeBookShelfObject(bookTitle,bookAuthor,bookYear,condition);

        book[BOOK_ITEMID] = bookShelfObject.id;
        books.push(bookShelfObject);

        completedBOOKshelf.append(book);

        updateDataToStorage();
    }

    else {
        const uncompletedBOOKshelf = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
        const bookTitle = document.getElementById("inputBookTitle").value;
        const bookAuthor = document.getElementById("inputBookAuthor").value;
        const bookYear = document.getElementById("inputBookYear").value;
        const condition = false;
    
        const book = makeBookshelf(bookTitle,bookAuthor,bookYear,condition);
        const bookShelfObject = composeBookShelfObject(bookTitle,bookAuthor,bookYear,condition);

        book[BOOK_ITEMID] = bookShelfObject.id;
        books.push(bookShelfObject);

        uncompletedBOOKshelf.append(book);

        updateDataToStorage();


    }
}

function addTaskToCompleted(taskElement){
    const taskTitle = taskElement.querySelector(".book_item > h2").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > h3").innerText;
    const taskYear = taskElement.querySelector(".book_item > h3").innerText;
 
    const newBook = makeBookshelf(taskTitle, taskAuthor, taskYear, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
    const BookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(BookPosition, 1);
    
    window.confirm("Apakah anda yakin ingin menghapus buku ini ?");

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".book_item > h2").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > h3").innerText;
    const taskYear = taskElement.querySelector(".book_item > h3").innerText;
    
    const newBook = makeBookshelf(taskTitle, taskAuthor, taskYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
 
    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}
function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  
  
    for(book of books){
        const newBook = makeBookshelf(book.Title, book.Author, book.Year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }

