let bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const listaKsiazek = document.getElementsByClassName('books-list');
//console.log(listaKsiazek);
const booksListElement = listaKsiazek.item(0);

function render() {
  for (let book of dataSource.books) {
    book.ratingWidth = book.rating * 10;
    book.ratingBgc = determineRatingBgc(book.rating);
    const generatedHTML = bookTemplate(book);
    const DOMElement = utils.createDOMFromHTML(generatedHTML);
    booksListElement.appendChild(DOMElement);

  
  }
}

render();

////////////////////////////////

const favoriteBooks = [];
const filters = [];
const initActions = function () {
  // const listaOkładek = document.getElementsByClassName('book__image');
  //const listaOkładekTablica = Array.from(listaOkładek);
  //console.log(listaOkładekTablica);

  const booksList = document.querySelector('.books-list');
  //console.log(booksList);
  //for (let okładka of listaOkładekTablica) {
  booksList.addEventListener('dblclick', function (event) {
    event.preventDefault();
    //const clickedElement = okładka;
    const clickedElement = event.target;
    const clickedElementParent = clickedElement.offsetParent;
    // console.log(clickedElementParent);

    if (clickedElementParent.classList.contains('book__image')) {
      //console.log(clickedElementParent);
      const dataID = clickedElementParent.getAttribute('data-id');
      //console.log(dataID);

      if (!favoriteBooks.includes(dataID)) {
        favoriteBooks.push(dataID);
        clickedElementParent.classList.add('favorite');
      } else {
        clickedElementParent.classList.remove('favorite');
        const index = favoriteBooks.indexOf(dataID);
        // console.log('index of removed element', index);
        favoriteBooks.splice(index, 1);
        // console.log(clickedElement);
      }
      //console.log(favoriteBooks);
    }
  });
  // }
  const formular = document.querySelector('.filters');

  //console.log(formular);
  formular.addEventListener('click', function (event) {
    if (event.target.tagName === 'input' && event.target.type === 'checkbox' && event.target.name === 'filter' && event.target != null)
      return event.target.value;
    //console.log(event.target.value);

    if (event.target.checked) {
      filters.push(event.target.value);
      console.log(filters);
    } else if (!event.target.checked) {
      // event.target.value != false;
      const checkedBoxID = event.target.value;
      // console.log(checkedBoxID);
      const indexToRemove = filters.indexOf(checkedBoxID);
      if (indexToRemove >= 0) {
        //console.log(indexToRemove);
        filters.splice(indexToRemove, 1);
        //console.log(filters);
      }
    }
    filterBooks();
  });

};


console.log(filters);

//const formular = document.querySelector('.filters');
const filterBooks = function () {
  for (let book of dataSource.books) {
    let shouldBeHidden = false;
    for (let filter of filters) {
      if (!book.details[filter]) {
        console.log(filter);
        shouldBeHidden = true; break;
      }
    }

    const trueElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
    console.log(trueElement);

    if (shouldBeHidden == true) {
      trueElement.classList.add('hidden');
    } else {
      trueElement.classList.remove('hidden');
    }
    console.log(trueElement);

  }

};
//console.log(filterBooks());

function determineRatingBgc(rating) {

  if (rating < 6) {
    return 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  } else if (rating > 6 && rating <= 8) {
    return 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating > 8 && rating <= 9) {
    return 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if (rating > 9) {
    return 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
}


initActions();


console.log('tablica z przefiltorwanymi wartosciami inputow', filters);


