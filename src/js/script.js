let bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
//const listaKsiazek = document.getElementsByClassName('books-list');
//const booksListElement = listaKsiazek.item(0);
//
class BooksList {
  constructor() {
    const thisBookslist = this;

    thisBookslist.getElements();
    thisBookslist.initData();
    thisBookslist.render();
    thisBookslist.filterBooks();
    thisBookslist.determineRatingBgc();
    thisBookslist.initActions();
  }

  initData() {
    this.data = dataSource.books;
    this.favoriteBooks = [];
    this.filters = [];

  }

  render() {
    const thisBookslist = this;
    for (let book of dataSource.books) {
      book.ratingWidth = book.rating * 10;
      book.ratingBgc = this.determineRatingBgc(book.rating);
      const generatedHTML = bookTemplate(book);
      const DOMElement = utils.createDOMFromHTML(generatedHTML);
      thisBookslist.booksListElement.appendChild(DOMElement);
    }

  }

  getElements() {
    const thisBookslist = this;
    thisBookslist.booksList = document.querySelector('.books-list');
    thisBookslist.formular = document.querySelector('.filters');
    thisBookslist.listaKsiazek = document.getElementsByClassName('books-list');
    thisBookslist.booksListElement = thisBookslist.listaKsiazek.item(0);
    thisBookslist.trueElement = document.querySelector('.book__image[data-id="' + this.id + '"]'); //////////////

  }

  initActions() {

    //const booksList = document.querySelector('.books-list');
    const thisBookslist = this;
    thisBookslist.booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedElement = event.target;
      const clickedElementParent = clickedElement.offsetParent;

      if (clickedElementParent.classList.contains('book__image')) {
        const dataID = clickedElementParent.getAttribute('data-id');
        if (!thisBookslist.favoriteBooks.includes(dataID)) {
          thisBookslist.favoriteBooks.push(dataID);
          clickedElementParent.classList.add('favorite');
        } else {
          clickedElementParent.classList.remove('favorite');
          const index = this.favoriteBooks.indexOf(dataID);
          this.favoriteBooks.splice(index, 1);
        }
      }
    });

    //const formular = document.querySelector('.filters');
    thisBookslist.formular.addEventListener('click', function (event) {

      if (event.target.tagName === 'input' && event.target.type === 'checkbox' && event.target.name === 'filter' && event.target != null)
        return event.target.value;

      if (event.target.checked) {
        thisBookslist.filters.push(event.target.value);
      } else if (!event.target.checked) {
        const checkedBoxID = event.target.value;
        const indexToRemove = thisBookslist.filters.indexOf(checkedBoxID);
        if (indexToRemove >= 0) {
          thisBookslist.filters.splice(indexToRemove, 1);
        }
      }
      thisBookslist.filterBooks();
    });
  }

  filterBooks() {
    const thisBookslist = this;
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (let filter of thisBookslist.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true; break;
        }
      }

      const trueElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (shouldBeHidden == true) {
        trueElement.classList.add('hidden');
        console.log(this.trueElement);
      } else {
        trueElement.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {

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
}

//const favoriteBooks = [];
//const filters = [];

const app = new BooksList();
//
/*function render() {
  for (let book of dataSource.books) {
    book.ratingWidth = book.rating * 10;
    book.ratingBgc = determineRatingBgc(book.rating);
    const generatedHTML = bookTemplate(book);
    const DOMElement = utils.createDOMFromHTML(generatedHTML);
    booksListElement.appendChild(DOMElement);
  }
}

render();
*/

//const favoriteBooks = [];
//const filters = [];

/*
const initActions = function () {

  const booksList = document.querySelector('.books-list');
  booksList.addEventListener('dblclick', function (event) {
    event.preventDefault();
    const clickedElement = event.target;
    const clickedElementParent = clickedElement.offsetParent;

    if (clickedElementParent.classList.contains('book__image')) {
      const dataID = clickedElementParent.getAttribute('data-id');
      if (!favoriteBooks.includes(dataID)) {
        favoriteBooks.push(dataID);
        clickedElementParent.classList.add('favorite');
      } else {
        clickedElementParent.classList.remove('favorite');
        const index = favoriteBooks.indexOf(dataID);
        favoriteBooks.splice(index, 1);
      }
    }
  });

  const formular = document.querySelector('.filters');
  formular.addEventListener('click', function (event) {
    if (event.target.tagName === 'input' && event.target.type === 'checkbox' && event.target.name === 'filter' && event.target != null)
      return event.target.value;

    if (event.target.checked) {
      filters.push(event.target.value);
    } else if (!event.target.checked) {
      const checkedBoxID = event.target.value;
      const indexToRemove = filters.indexOf(checkedBoxID);
      if (indexToRemove >= 0) {
        filters.splice(indexToRemove, 1);
      }
    }
    filterBooks();
  });
};
const filterBooks = function () {
  for (let book of dataSource.books) {
    let shouldBeHidden = false;
    for (let filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true; break;
      }
    }

    const trueElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
    if (shouldBeHidden == true) {
      trueElement.classList.add('hidden');
    } else {
      trueElement.classList.remove('hidden');
    }
  }
};

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
}*/

//initActions();


