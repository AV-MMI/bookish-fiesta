const myLibrary = [];

// DOM elements
const toReadDisplay = document.getElementById('book-container-0')
const haveReadDisplay = document.getElementById('book-container-1');

// constructor
function Book(title, author, pages, haveRead){
	if(!this instanceof Book){
		return;
	} else {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.haveRead = haveRead;
	}
}

/*
*** General display
*/

function addBookToLibrary(library, bookObj){
	library.push(bookObj);
}

let leto = new Book("a", "b", 10, true);
let lto = new Book("ab", "cb", 10, true);
let lo = new Book("aas", "cb", 10, true);

addBookToLibrary(myLibrary, leto);
addBookToLibrary(myLibrary, lto);
addBookToLibrary(myLibrary, lo);

function displayBooks(bookObj){
	if(bookObj.length){
		for(let i = 0; i < bookObj.length; i++){
			if(bookObj[i].haveRead){
				haveReadDisplay.appendChild( DOMCreateBook(bookObj[i]) );
			} else {
				toReadDisplay.appendChild( DOMCreateBook(bookObj[i]) );
			}
		}
	} else {
		if(bookObj.haveRead){
			haveReadDisplay.appendChild( DOMCreateBook(bookObj) );
		} else {
			toReadDisplay.appendChild( DOMCreateBook(bookObj) );
		}
	}
}

function DOMCreateBook(obj){
	let bookItemContainer = document.createElement('div');

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
	toggleBtn.addEventListener('transitionend', toggleTransition);
	circle.classList.add('circle');

	if(obj.haveRead){
		toggleBtn.classList.add('toogle-btn-active');
		circle.classList.add('circle-active');
	}

	removeBtn.classList.add('btn', 'remove-btn');
	removeBtn.setAttribute('type', 'button');
	removeBtn.textContent = "X";
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
	legend.textContent = 'Update Book';
	titleLabel.setAttribute('for', 'title-input-up');
	titleLabel.textContent = "Title: ";
	authorLabel.setAttribute('for', 'author-input-up');
	authorLabel.textContent = "Author: ";
	pagesLabel.setAttribute('for', 'pages-input-up');
	pagesLabel.textContent = "Pages: ";

	updateBtn.setAttribute('type', 'button');
	updateBtn.classList.add('btn', 'update-btn');

	titleStrong.textContent = '*';
	authorStrong.textContent = '*';
	pagesStrong.textContent = '*';

	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('required', '');
	titleInput.setAttribute('id', 'title-input-up');

	authorInput.setAttribute('type', 'text');
	authorInput.setAttribute('required', '');
	authorInput.setAttribute('id', 'author-input-up');

	pagesInput.setAttribute('type', 'number');
	pagesInput.setAttribute('required', '');
	pagesInput.setAttribute('id', 'pages-input-up');

	titleLabel.appendChild(titleStrong);
	authorLabel.appendChild(authorStrong);
	pagesLabel.appendChild(pagesStrong);

	//TODO: append input and label elements to the corresponding li element
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

	//editBtnContainer
	let editBtnContainer = document.createElement('div');
	let editBtn = document.createElement('button');

	editBtn.classList.add('btn', 'edit-btn');
	editBtn.setAttribute('type', 'button');
	editBtn.textContent = 'edit';
	editBtnContainer.appendChild(editBtn);

	//general structure
	bookItemContainer.classList.add('book-item-container');
	bookItemContainer.appendChild(book);
	bookItemContainer.appendChild(editFormContainer);
	bookItemContainer.appendChild(editBtnContainer);

	return bookItemContainer;
}

displayBooks(leto)

	/*
	* EVENT LISTENER
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
	* EVENT LISTENER
	*/

	//TODO: finish function. Must change the display container of the item every time
	// 		that its haveRead state changes.
function toggleTransition(event){
	if(event.target.parentElement.classList.contains('book')){
		console.log(event.target.parentElement.children[1].textContent);
	}
}