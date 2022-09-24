let myLibrary = [{
	title: 'leto',
	author: 'a',
	pages: 10,
	read: true,
},{
	title: 'lto',
	author: 'b',
	pages: 10,
	read: false,
},{
	title: 'lo',
	author: 'c',
	pages: 10,
	read: false,
}];

let infoObj = {
	created: 0,
	removed: 0,
	toRead: 0,
	haveRead: 0,
}

// DOM elements
const librarySection = document.getElementById('library-section');
const newBookBtn = document.getElementById('new-book-btn');
const toReadDisplay = document.getElementById('book-container-0');
const haveReadDisplay = document.getElementById('book-container-1');

const infoCreated = document.getElementById('created-val');
const infoRemoved = document.getElementById('removed-val');
const infoToRead = document.getElementById('toRead-val');
const infoHaveRead = document.getElementById('haveRead-val');

newBookBtn.addEventListener('click', displayModalWindow);

// constructor
function Book(title, author, pages, read){
	if(!this instanceof Book){
		return;
	} else {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

/*
*** General display
*/

function addBookToLibrary(library, bookObj){
	library.push(bookObj);
}

function displayBooks(bookObj){
	if(bookObj.length){
		for(let i = 0; i < bookObj.length; i++){
			if(bookObj[i].read){
				haveReadDisplay.appendChild( DOMCreateBook(bookObj[i]) );
			} else {
				toReadDisplay.appendChild( DOMCreateBook(bookObj[i]) );
			}
		}
	} else {
		if(bookObj.read){
			haveReadDisplay.appendChild( DOMCreateBook(bookObj) );
		} else {
			toReadDisplay.appendChild( DOMCreateBook(bookObj) );
		}
	}
}

function DOMCreateBook(obj){
	let bookItemContainer = document.createElement('div');
	bookItemContainer.setAttribute('title', obj.title);
	bookItemContainer.setAttribute('author', obj.author);
	bookItemContainer.setAttribute('bookNum', `${infoObj.created}`);
	//bookItem
	let book = document.createElement('div');
	let toggleBtn = document.createElement('button');
	let circle = document.createElement('div');
	let titleSpan = document.createElement('span');
	let removeBtn = document.createElement('button');

	book.classList.add('book');
	toggleBtn.classList.add('btn', 'toggle-btn');
	toggleBtn.setAttribute('type', 'button');
	toggleBtn.addEventListener('click', toggleClass);
	toggleBtn.addEventListener('transitionend', toggleDisplayContainer);
	circle.classList.add('circle');

	if(obj.read){
		toggleBtn.classList.add('toogle-btn-active');
		circle.classList.add('circle-active');
	}

	removeBtn.textContent = "X";
	removeBtn.classList.add('btn', 'remove-btn');
	removeBtn.setAttribute('type', 'button');
	removeBtn.addEventListener('click', removeBook);
	titleSpan.textContent = obj['title'];

	toggleBtn.appendChild(circle);
	book.appendChild(toggleBtn);
	book.appendChild(titleSpan);
	book.appendChild(removeBtn);

	//editFormContainer
	let editFormContainer = document.createElement('div');
	let form = document.createElement('form');
	let fieldset = document.createElement('fieldset');
	let legend = document.createElement('legend');
	let ul = document.createElement('ul');

	let liTitle = document.createElement('li');
	let liAuthor = document.createElement('li');
	let liPages = document.createElement('li');

	let updateBtn = document.createElement('button');

	let titleLabel = document.createElement('label');
	let titleStrong = document.createElement('strong');
	let titleInput = document.createElement('input');

	let authorLabel = document.createElement('label');
	let authorStrong = document.createElement('strong');
	let authorInput = document.createElement('input');

	let pagesLabel = document.createElement('label');
	let pagesStrong = document.createElement('strong');
	let pagesInput = document.createElement('input');

	editFormContainer.classList.add('edit-form-container');
	editFormContainer.setAttribute('id', `update-form-${infoObj.created}`);

	legend.textContent = 'Update Book';
	titleLabel.setAttribute('for', `title-input-up${infoObj.created}`);
	titleLabel.textContent = "Title: ";
	authorLabel.setAttribute('for', `author-input-up${infoObj.created}`);
	authorLabel.textContent = "Author: ";
	pagesLabel.setAttribute('for', `pages-input-up${infoObj.created}`);
	pagesLabel.textContent = "Pages: ";

	updateBtn.setAttribute('type', 'button');
	updateBtn.classList.add('btn', 'update-btn');
	updateBtn.addEventListener('click', updateBook);
	updateBtn.textContent = 'Update book';

	titleStrong.textContent = '*';
	authorStrong.textContent = '*';
	pagesStrong.textContent = '*';

	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('required', '');
	titleInput.setAttribute('id', `title-input-up${infoObj.created}`);

	authorInput.setAttribute('type', 'text');
	authorInput.setAttribute('required', '');
	authorInput.setAttribute('id', `author-input-up${infoObj.created}`);

	pagesInput.setAttribute('type', 'number');
	pagesInput.setAttribute('required', '');
	pagesInput.setAttribute('id', `pages-input-up${infoObj.created}`);

	titleLabel.appendChild(titleStrong);
	authorLabel.appendChild(authorStrong);
	pagesLabel.appendChild(pagesStrong);

	liTitle.appendChild(titleLabel);
	liTitle.appendChild(titleInput);
	liAuthor.appendChild(authorLabel);
	liAuthor.appendChild(authorInput);
	liPages.appendChild(pagesLabel);
	liPages.appendChild(pagesInput);

	ul.appendChild(liTitle);
	ul.appendChild(liAuthor);
	ul.appendChild(liPages);

	fieldset.appendChild(legend);
	fieldset.appendChild(ul);

	form.appendChild(fieldset);
	form.appendChild(updateBtn);

	editFormContainer.appendChild(form);

	//editBtnContainer
	let editBtnContainer = document.createElement('div');
	let editBtn = document.createElement('button');

	editBtn.classList.add('btn', 'edit-btn');
	editBtn.setAttribute('type', 'button');
	editBtn.setAttribute('id', `update-btn-${infoObj.created}`);
	editBtn.addEventListener('click', opencloseUpdateForm);
	editBtn.textContent = 'edit';
	editBtnContainer.appendChild(editBtn);

	//general structure
	bookItemContainer.classList.add('book-item-container');
	bookItemContainer.appendChild(book);
	bookItemContainer.appendChild(editFormContainer);
	bookItemContainer.appendChild(editBtnContainer);

	updateInfoProp('created');
	return bookItemContainer;
}

	/*
	* EVENT HANDLER
	*/
function toggleClass(event){
	if(event.target.classList.contains('btn')){
		event.target.classList.toggle('toogle-btn-active');
		event.target.children[0].classList.toggle('circle-active')
	} else {
		event.target.classList.toggle('circle-active');
		event.target.parentElement.classList.toggle('toogle-btn-active');
	}
}

	/*
	* EVENT HANDLER
	*/
function toggleDisplayContainer(event){
	let container;
	let objTitle;
	let objAuthor;
	if(event.target.parentElement.classList.contains('book')){
		container = event.target.parentElement.parentElement.parentElement;
		objTitle = event.target.parentElement.parentElement.getAttribute('title');
		objAuthor = event.target.parentElement.parentElement.getAttribute('author');
	}

	//Invert the value of haveRead property.
	for(let i = 0; i < myLibrary.length; i++){
		if(myLibrary[i].title == objTitle && myLibrary[i].author == objAuthor){
			myLibrary[i].read = (myLibrary[i].read) ? false : true;
		}
	}

	//remove book item.
	removeBookNode(container, objTitle);
	//invoke bookDisplay
	displayBooks( findObj(myLibrary, objTitle) );
}

	/*
	* FUNCTION
	*/
function findObj(arr, title){
	for(let i = 0; i < arr.length; i++){
		if(arr[i].title == title){
			return arr[i];
		}
	}
}
	/*
	* FUNCTION
	*/
function updateInfoProp(prop){
	infoObj[prop]++;
	displayInfo(infoObj);
}

	/*
	* FUNCTION
	*/
function displayInfo(obj){
	infoCreated.textContent = obj.created;
	infoRemoved.textContent = obj.removed;
	infoToRead.textContent = obj.toRead;
	infoHaveRead.textContent = obj.haveRead;
}

	/*
	* EVENT HANDLER
	*/
function removeBook(event){
	let container = event.target.parentElement.parentElement.parentElement;
	let objTitle = event.target.parentElement.parentElement.title;
	let objAuthor = event.target.parentElement.parentElement.getAttribute('author');

	myLibrary = removeFromArr(myLibrary, objTitle, objAuthor);
	removeBookNode(container, objTitle);
	updateInfoProp('removed');
}

	/*
	* AUXILIAR FUNCTIONS OF THE REMOVE BTN EVENT HANLDER.
	*/

//remove bookFrom from array
function removeFromArr(array, objTitle, objAuthor){
	let target;
	let newArr;
	for(let i = 0; i < array.length; i++){
		if(array[i].title == objTitle && array[i].author == objAuthor){
			target = i;
		}
	}

	if(target == 0){
		newArr = array.slice(1, array.length);
	}

	else if(target == (array.length - 1)){
		newArr = array.slice(0, array.length-1);
	}

	else {
		newArr = array.slice(0, target).concat( array.slice(target+1, array.length) );
	}

	return newArr;
}

// remove target book from the DOM
function removeBookNode(container, objTitle){
	for(let i = 0; i < container.children.length; i++){
		if(container.children[i].getAttribute('title') == objTitle){
			container.children[i].remove();
		}
	}
}

function displayModalWindow(event){
	let modalWindow = document.createElement('div');
	modalWindow.classList.add('modal-bg');

	let contentContainer = document.createElement('div');
	contentContainer.classList.add('modal-newBook-container');

	let closeContainer = document.createElement('div');
	closeContainer.setAttribute('id', 'close-container');

	let closeBtn = document.createElement('button');
	closeBtn.setAttribute('type', 'button');
	closeBtn.classList.add('close-btn');
	closeBtn.addEventListener('click', closeModalWindow);
	closeBtn.textContent = "X";

	let form = document.createElement('form');
	let fieldset = document.createElement('fieldset');
	let legend = document.createElement('legend');
	legend.textContent = 'New Book';
	let ul = document.createElement('ul');


	let liTitle = document.createElement('li');
	let titleLabel = document.createElement('label');
	let titleStrong = document.createElement('strong');
	titleStrong.textContent = '*';
	titleLabel.textContent = 'Title:';
	titleLabel.setAttribute('for', 'title-modal-in');

	let titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('minlength', '2');
	titleInput.setAttribute('maxlength', '25');
	titleInput.setAttribute('id', 'title-modal-in');
	titleInput.setAttribute('required', '');
	titleInput.setAttribute('placeholder', 'Title');

	let liAuthor = document.createElement('li');
	let authorLabel = document.createElement('label');
	let authorStrong = document.createElement('strong');
	authorStrong.textContent = '*';
	authorLabel.textContent = 'Author:';
	authorLabel.setAttribute('for', 'author-modal-in');

	let authorInput = document.createElement('input');
	authorInput.setAttribute('type', 'text');
	authorInput.setAttribute('minlength', '2');
	authorInput.setAttribute('maxlength', '15');
	authorInput.setAttribute('id', 'author-modal-in');
	authorInput.setAttribute('required', '');
	authorInput.setAttribute('placeholder', 'Author');

	let liPages = document.createElement('li');
	let pagesLabel = document.createElement('label');
	let pagesStrong = document.createElement('strong');
	pagesStrong.textContent = '*';
	pagesLabel.textContent = 'Pages:';
	pagesLabel.setAttribute('for', 'pages-modal-in');
	let pagesInput = document.createElement('input');
	pagesInput.setAttribute('type', 'number');
	pagesInput.setAttribute('min', '1');
	pagesInput.setAttribute('id', 'pages-modal-in');
	pagesInput.setAttribute('required', '');

	let liHaveRead = document.createElement('li');
	let haveReadSpan = document.createElement('span');
	haveReadSpan.textContent = "Have you read this book?"
	let ulHaveRead = document.createElement('ul');
	let liTrue = document.createElement('li');
	let trueLabel = document.createElement('label');
	trueLabel.textContent = 'true: ';
	trueLabel.setAttribute('for', 'true-input');
	let trueInput = document.createElement('input');
	trueInput.setAttribute('type', 'radio');
	trueInput.setAttribute('id', 'true-input');
	trueInput.setAttribute('name', 'haveRead');

	let liFalse = document.createElement('li');
	let falseLabel = document.createElement('label');
	falseLabel.textContent = 'false: ';
	falseLabel.setAttribute('for', 'false-input');
	let falseInput = document.createElement('input');
	falseInput.setAttribute('type', 'radio');
	falseInput.setAttribute('id', 'false-input');
	falseInput.setAttribute('name', 'haveRead');
	falseInput.setAttribute('checked', '');

	let createBookBtn = document.createElement('button');
	createBookBtn.setAttribute('type', 'button');
	createBookBtn.classList.add('new-book-btn');
	createBookBtn.classList.add('btn');
	createBookBtn.textContent = "Create book";
	createBookBtn.addEventListener('click', createBook);

	liTrue.appendChild(trueLabel);
	liTrue.appendChild(trueInput);

	liFalse.appendChild(falseLabel);
	liFalse.appendChild(falseInput);

	ulHaveRead.appendChild(liTrue);
	ulHaveRead.appendChild(liFalse);

	liHaveRead.appendChild(haveReadSpan);
	liHaveRead.appendChild(ulHaveRead);

	titleLabel.appendChild(titleStrong);
	authorLabel.appendChild(authorStrong);
	pagesLabel.appendChild(pagesStrong);

	liTitle.appendChild(titleLabel);
	liTitle.appendChild(titleInput);

	liAuthor.appendChild(authorLabel);
	liAuthor.appendChild(authorInput);

	liPages.appendChild(pagesLabel);
	liPages.appendChild(pagesInput);

	ul.appendChild(liTitle);
	ul.appendChild(liAuthor);
	ul.appendChild(liPages);
	ul.appendChild(liHaveRead);

	fieldset.appendChild(legend);
	fieldset.appendChild(ul);

	form.appendChild(fieldset)

	closeContainer.appendChild(closeBtn);
	contentContainer.appendChild(closeContainer);
	contentContainer.appendChild(form);
	contentContainer.appendChild(createBookBtn);
	modalWindow.appendChild(contentContainer);

	librarySection.appendChild(modalWindow);
}

/*
* EVENT HANDLER
*/
function closeModalWindow(event){
	let modalWindow = event.target.parentElement.parentElement.parentElement;
	modalWindow.classList.remove('modal-bg');

	for(let i = 0; i < modalWindow.children.length; i++){
		modalWindow.children[i].remove();
	}
}

/*
* EVENT HANDLER
*/
function createBook(){
	//Obtain values
	let title = document.getElementById('title-modal-in');
	let author = document.getElementById('author-modal-in');
	let pages = document.getElementById('pages-modal-in');
	let boolRead = (document.getElementById('true-input').checked == true) ? true : false;

	//constructor
	let book = new Book(title.value, author.value, pages.value, boolRead);

	//push to library
	addBookToLibrary(myLibrary, book);

	//display book
	displayBooks(book);

	//reset inputs
	title.value = "";
	author.value = "";
	pages.value = "";
}

/*
* EVENT HANDLER
*/
function opencloseUpdateForm(event){
	let updateForm = document.getElementById(`update-form-${event.target.id[ event.target.id.length - 1 ]}`);

	updateForm.classList.toggle('edit-form-container-active');
	if(updateForm.classList.contains('edit-form-container-active')){
		event.target.textContent = 'close';
	} else {
		event.target.textContent = 'edit';
	}
}

/*
* EVENT HANDLER
*/
function updateBook(event){
	//obtain corresponding book obj.
	let bookContainer = event.target.parentElement.parentElement.parentElement;

	//obtain data
	let bookNum;
	let title = document.getElementById('title-input-up');
	let author = document.getElementById('author-input-up');
	let pages = document.getElementById('pages-input-up');

	//update obj
	if(title.value !== "" || author.value !=="" || pages.value !== ""){
		for(let i = 0; i < myLibrary.length; i++){
			if(myLibrary[i]['title'] == bookContainer.getAttribute('title') && myLibrary[i]['author'] == bookContainer.getAttribute('author')){
				if(title.value !== ""){
					myLibrary[i]['title'] = title.value;

					//update book container attributes.
					bookContainer.setAttribute('title', title.value)
				}
				if(author.value !== ""){
					myLibrary[i]['author'] = author.value;

					//update book container attributes.
					bookContainer.setAttribute('author', author.value);
				}
				if(pages.value !== ""){
					myLibrary[i]['pages'] = pages.value;
				}

			}
		}
	}

	//update book item textContent
	bookContainer.children[0].children[1].textContent = title.value;

	//reset input value
	title.value = '';
	author.value = '';
	pages.value = '';
}

displayBooks(myLibrary);
